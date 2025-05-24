import {
	addElement,
	getElement,
	removeElement,
	DB,
	type Account,
	type Vault,
	type WalletBackupData,
	type AddressEntry
} from '../common';
import { accountState } from '../runes';
import { bytesToHex, hexToBytes } from '@noble/ciphers/utils';

export const backupWallet = async (): Promise<string> => {
	const vaults = (await getElement(DB.Vault.name, 'all')) as Vault[];
	const accounts = (await getElement(DB.Account.name, 'all')) as Account[];
	const addressBook = (await getElement(DB.AddressBook.name, 'all')) as AddressEntry[];
	const History = (await getElement(DB.History.name, 'all')) as History[];
	const settings = localStorage.getItem('settings');
	const backup = JSON.stringify({
		vaults,
		accounts,
		addressBook,
		History,
		settings
	});
	return backup;
};

export const restoreWallet = async (backup: string) => {
	const data = JSON.parse(backup) as WalletBackupData;
	for (const vault of data.vaults) {
		addElement(DB.Vault.name, vault);
	}
	for (const account of data.accounts) {
		addElement(DB.Account.name, account);
	}
	for (const addressBook of data.addressBook) {
		addElement(DB.AddressBook.name, addressBook);
	}
	for (const history of data.History) {
		addElement(DB.History.name, history);
	}
	localStorage.setItem('settings', JSON.stringify(data.settings));
};

export const exportKeystore = async (
	vaultName: string,
	version: number
): Promise<string | null> => {
	const vault = (await getElement(DB.Vault.name, vaultName)) as Vault;
	if (!vault) return null;
	const key = 'ZenoKeystore' + `v${version}` + vault.salt + vault.ciphertext;
	return key;
};

const decodeKeystore = (
	input: string
): { prefix: string; version: string; salt: string; ciphertext: string } => {
	const prefix = input.slice(0, 12); // 'ZenoKeystore'
	const version = input.slice(12, 14); // 'v1'
	const salt = input.slice(14, 78); // 32位hex
	const ciphertext = input.slice(78);
	return { prefix, version, salt, ciphertext };
};

export const parseJsonFile = async (file: File): Promise<{version:string, salt: string; ciphertext: string }> => {
	if (!file.type.includes('json')) {
		throw new Error('File must be a JSON file');
	}
	const text = (await file.text()).trim();
	const { prefix, version, salt, ciphertext } = decodeKeystore(text);
	const hexRegex = /^[0-9a-fA-F]+$/;
	if (prefix !== 'ZenoKeystore' || version !== 'v1') {
		throw new Error('Invalid keystore format or version');
	}
	if (!hexRegex.test(salt) || !hexRegex.test(ciphertext)) {
		throw new Error('Salt or ciphertext contains invalid hex characters');
	}
	if (salt.length % 2 !== 0 || ciphertext.length % 2 !== 0) {
		throw new Error('Salt or ciphertext hex string length must be even');
	}
	return {version, salt, ciphertext };
};
