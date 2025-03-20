import {
	addElement,
	getElement,
	editElement,
	removeElement,
	type AddressBook
} from '$lib/wallet/common';
import {
	dbStore,
	type Account,
	type LegacyVault,
	type keyringType,
	type Settings,
	type Chain,
	type WalletBackupData
} from '$lib/wallet/common';
import { HDKey } from '@scure/bip32';
import * as bip39 from '@scure/bip39';
import { bytesToHex, hexToBytes } from '@noble/ciphers/utils';
import { wordlist } from '@scure/bip39/wordlists/english';
import { randomBytes, managedNonce } from '@noble/ciphers/webcrypto';
import { addr } from 'micro-eth-signer';
import { xchacha20poly1305 as xchacha } from '@noble/ciphers/chacha';
import { scrypt } from '@noble/hashes/scrypt';
import { sr25519CreateDerive, ed25519CreateDerive, ecdsaCreateDerive } from '@polkadot-labs/hdkd';
import {
	entropyToMiniSecret,
	mnemonicToEntropy,
	ss58Address,
	type DeriveFn
} from '@polkadot-labs/hdkd-helpers';

export const packLegacyVaultToJson = async (): Promise<string> => {
	const vault = (await getElement(dbStore.Vault.name, 'all')) as LegacyVault[];
	return JSON.stringify(vault);
};

export const packMn = (password: string, mn: string, Keypath: string) => {
	const salt = randomBytes(32);
	const ent = bip39.mnemonicToEntropy(mn, wordlist);
	const phrase = scrypt(password, salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	const ciphertext = chacha.encrypt(ent);
	const store: LegacyVault = {
		vaultName: Keypath,
		salt: bytesToHex(salt),
		ciphertext: bytesToHex(ciphertext),
		cryptoVersion: 1
	};
	addElement(dbStore.Vault.name, store);
};

export const restoreMn = async (password: string, keypath: string): Promise<string> => {
	const vault = (await getElement(dbStore.Vault.name, keypath)) as LegacyVault;
	const phrase = scrypt(password, hexToBytes(vault.salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 }); // vault.salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
	const mn = bip39.entropyToMnemonic(ent, wordlist);
	return mn;
};

export const isValidPassword = async (password: string, keypath: string): Promise<boolean> => {
	const mn = await restoreMn(password, keypath);
	if (!bip39.validateMnemonic(mn, wordlist)) return false;
	return true;
};

export const createEvmAccount = (
	index: number,
	addressIndex: number,
	password: string,
	mn?: string
) => {
	mn = mn ?? bip39.generateMnemonic(wordlist, 128);
	packMn(password, mn, 'default');
	deriveEvm(index, addressIndex, mn);
};

export const deriveEvmAccount = async (index: number, addressIndex: number, password: string) => {
	const mn = await restoreMn(password, `m/44'/60'/0'/0/${addressIndex}`);
	deriveEvm(index, addressIndex, mn);
};

export const deriveEvm = (index: number, addressIndex: number, mn: string): boolean => {
	if (!bip39.validateMnemonic(mn, wordlist) || !mn) return false;
	else {
		const hdKey_ = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mn));
		const hdKey = hdKey_.derive(`m/44'/60'/0'/0/${addressIndex}`);
		if (hdKey.publicKey) {
			const newAccount: Account = {
				accountIndex: index,
				accountName: `Account${index}`,
				accountType: 'legacy',
				isHidden: false,
				address: addr.fromPublicKey(hdKey.publicKey),
				addressType: 'evm',
				derivePath: `m/44'/60'/0'/0/${addressIndex}`,
				keyringType: 'secp256k1',
				publicKey: bytesToHex(hdKey.publicKey)
			};
			addElement(dbStore.Account.name, newAccount);
		}
	}
	return true;
};

export const createPolkadotAccount = (
	index: number,
	addressIndex: number,
	password: string,
	type: keyringType,
	keypath: string,
	mn?: string
) => {
	mn = mn ?? bip39.generateMnemonic(wordlist, 128);
	packMn(password, mn, keypath);
	derivePolkadot(index, addressIndex, type, mn);
};

export const derivePolkadot = async (
	index: number,
	addressIndex: number,
	type: keyringType,
	mn: string
) => {
	const miniSecret = entropyToMiniSecret(mnemonicToEntropy(mn));
	let derive: DeriveFn;
	if (type === 'secp256k1') {
		derive = ecdsaCreateDerive(miniSecret);
	} else if (type === 'ed25519') {
		derive = ed25519CreateDerive(miniSecret);
	} else if (type === 'sr25519') {
		derive = sr25519CreateDerive(miniSecret);
	} else {
		throw new Error('Unsupported type');
	}
	const path = addressIndex > 0 ? `//${addressIndex - 1}` : '';
	const pair = derive(path);
	const pub = bytesToHex(pair.publicKey);
	const newAccount: Account = {
		accountIndex: index,
		accountName: `Account${index}`,
		accountType: 'legacy',
		address: ss58Address(pub, 0),
		isHidden: false,
		addressType: 'polkadot',
		derivePath: path,
		keyringType: type,
		publicKey: pub
	};
	addElement(dbStore.Account.name, newAccount);
};

export const derivePolkadotAccount = async (
	index: number,
	addressIndex: number,
	password: string,
	type: keyringType,
	keypath: string
) => {
	const mn = await restoreMn(password, keypath);
	derivePolkadot(index, addressIndex, type, mn);
};

export const getAccount = async (index: number): Promise<Account | null> => {
	const account = (await getElement(dbStore.Account.name, index)) as Account | null;
	if (account === null) {
		throw new Error(`Account at index ${index} does not exist`);
	}
	return account;
};

export const getAccounts = async (): Promise<Account[]> => {
	const accounts = (await getElement(dbStore.Account.name, 'all')) as Account[] | null;
	if (accounts === null) {
		throw new Error('Failed to get accounts');
	}
	return accounts;
};

export const hideAccount = async (index: number): Promise<void> => {
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data) as Settings;
		settings.hiddenAccounts.push(index);
		localStorage.setItem('settings', JSON.stringify(settings));
	}
};

export const showAccount = async (index: number): Promise<void> => {
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data) as Settings;
		settings.hiddenAccounts = settings.hiddenAccounts.filter((i) => i !== index);
		localStorage.setItem('settings', JSON.stringify(settings));
	}
};

export const deleteAccount = async (index: number): Promise<void> => {
	const account = (await getElement(dbStore.Account.name, index)) as Account | null;
	if (account) {
		removeElement(dbStore.Account.name, index);
	} else {
		throw new Error(`Account at index ${index} does not exist`);
	}
};

export const renameAccount = async (index: number, newName: string): Promise<void> => {
	const account = (await getElement('accountList', index)) as Account | null;
	if (account) {
		account.accountName = newName;
		editElement(dbStore.Account.name, account);
	} else {
		throw new Error(`Account at index ${index} does not exist`);
	}
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
	const settings = localStorage.getItem('settings');
	let vaultList: string[];
	if (settings) {
		const parsedSettings = JSON.parse(settings) as Settings;
		vaultList = parsedSettings.vaultList;
		for (const id of vaultList) {
			const vault = (await getElement(dbStore.Vault.name, id)) as LegacyVault | null;
			if (vault) {
				const mnemonic = await restoreMn(oldPassword, vault.vaultName);
				removeElement(dbStore.Vault.name, vault.vaultName);
				packMn(newPassword, mnemonic, vault.vaultName);
			}
		}
	}
};

export const resetWallet = async (): Promise<void> => {
	removeElement(dbStore.Account.name, 'all');
	removeElement(dbStore.Vault.name, 'all');
};

export const backupWallet = async (): Promise<void> => {
	const vaults = (await getElement(dbStore.Vault.name, 'all')) as LegacyVault[];
	const accounts = (await getElement(dbStore.Account.name, 'all')) as Account[];
	const additionalChains = (await getElement(dbStore.AdditionalChain.name, 'all')) as Chain[];
	const addressBook = (await getElement(dbStore.AddressBook.name, 'all')) as AddressBook[];
	const History = (await getElement(dbStore.History.name, 'all')) as History[];
	const settings = localStorage.getItem('settings');
	const backup = JSON.stringify({
		vaults,
		accounts,
		additionalChains,
		addressBook,
		History,
		settings
	});
	console.log(backup);
};

export const restoreWallet = async (backup: string) => {
	const data = JSON.parse(backup) as WalletBackupData;
	for (const vault of data.vaults) {
		addElement(dbStore.Vault.name, vault);
	}
	for (const account of data.accounts) {
		addElement(dbStore.Account.name, account);
	}
	for (const additionalChain of data.additionalChains) {
		addElement(dbStore.AdditionalChain.name, additionalChain);
	}
	for (const addressBook of data.addressBook) {
		addElement(dbStore.AddressBook.name, addressBook);
	}
	for (const history of data.History) {
		addElement(dbStore.History.name, history);
	}
	localStorage.setItem('settings', JSON.stringify(data.settings));
};

// need  to be implemented
export const backupVault = async () => {
	const vaults = (await getElement(dbStore.Vault.name, 'all')) as LegacyVault[];
	return JSON.stringify(vaults);
};

// need  to be implemented
export const restoreVault = async (vault: string) => {
	const data = JSON.parse(vault) as LegacyVault[];
	for (const vault of data) {
		addElement(dbStore.Vault.name, vault);
	}
};
