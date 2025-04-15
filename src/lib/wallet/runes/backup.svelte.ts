import {
	addElement,
	getElement,
	removeElement,
	DB,
	type Account,
	type Vault,
	type WalletBackupData,
	type AddressEntry,
} from '$lib/wallet/common';
import { accountState } from '$lib/wallet/runes';

export const resetWallet = async (): Promise<void> => {
	removeElement(DB.Vault.name, 'all');
};

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


export const exportKeystoreV1 = async (vaultName: "EVM" | "POLKADOT"): Promise<string | null> => {
	const vault = (await getElement(DB.Vault.name, vaultName)) as Vault;
    if (!vault) return null;
    const  key = vault.salt.concat(vault.ciphertext);
    return key;
};

function downloadKeystore(keystore: string) {
    const jsonString = JSON.stringify(keystore, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `custom-keystore-${Date.now()}.json`; 
}

function decodeVault(input: string): { salt: string; ciphertext: string } {
    const salt = input.slice(0, 32);
    const ciphertext = input.slice(32);
    return { salt, ciphertext };
  }