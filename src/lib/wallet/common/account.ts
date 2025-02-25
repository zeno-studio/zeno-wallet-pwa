import { addElement, getElement, editElement, removeElement } from '$lib/wallet/common';
import { type Account, type LegacyVault,type keyringType } from '$lib/wallet/common';
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
	const vaults: LegacyVault[] = [];
	const vaultIds = [1, 2];
	for (const id of vaultIds) {
		const vault = await getElement('legacyVault', id);
		if (vault !== null) {
			vaults.push(vault as LegacyVault);
		}
	}
	return JSON.stringify(vaults);
};

export const packMn = (password: string, mn: string, vaultId: number) => {
	const salt = randomBytes(32);
	const ent = bip39.mnemonicToEntropy(mn, wordlist);
	const phrase = scrypt(password, salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	const ciphertext = chacha.encrypt(ent);
	const store: LegacyVault = {
		vaultId: vaultId,
		salt: bytesToHex(salt),
		ciphertext: bytesToHex(ciphertext),
		cryptoVersion: 1
	};
	addElement('legacyVault', store);
};

export const restoreMn = async (password: string, vaultId: number): Promise<string> => {
	const vault = (await getElement('legacyVault', vaultId)) as LegacyVault;
	const phrase = scrypt(password, hexToBytes(vault.salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 }); // vault.salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
	const mn = bip39.entropyToMnemonic(ent, wordlist);
	return mn;
};

export const isValidPassword = async (password: string): Promise<boolean> => {
	try {
		const mn = await restoreMn(password, 1);
		if (!bip39.validateMnemonic(mn, wordlist)) return false;
		return true;
	} catch (error) {
		return false;
		console.log(error);
	}
};

export const createEvmAccount = (
	index: number,
	addressIndex: number,
	password: string,
	mn?: string
) => {
	mn = mn ?? bip39.generateMnemonic(wordlist, 128);
	packMn(password, mn, 1);
	deriveEvm(index, addressIndex, mn);
};

export const deriveEvmAccount = async (index: number, addressIndex: number, password: string) => {
	const mn = await restoreMn(password, 1);
	deriveEvm(index, addressIndex, mn);
};

export const deriveEvm = (index: number, addressIndex: number, mn: string) => {
	const hdKey_ = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mn));
	const hdKey = hdKey_.derive(`m/44'/60'/0'/0/${addressIndex}`);
	if (hdKey.publicKey) {
		const newAccount: Account = {
			accountIndex: index,
			accountName: `Account${index}`,
			accountType: 'legacy',
			address: addr.fromPublicKey(hdKey.publicKey),
			addressType: 'evm',
			derivePath: `m/44'/60'/0'/0/${addressIndex}`,
			isHidden: false,
			keyringType: 'secp256k1'
		};
		addElement('accountList', newAccount);
	}
};

export const createPolkadotAccount = (
	index: number,
	addressIndex: number,
	password: string,
	type: keyringType,
	mn?: string
) => {
	mn = mn ?? bip39.generateMnemonic(wordlist, 128);
	packMn(password, mn, 2);
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
		addressType: 'polkadot',
		derivePath: path,
		isHidden: false,
		keyringType: type
	};
	addElement('accountList', newAccount);
};

export const derivePolkadotAccount = async (
	index: number,
	addressIndex: number,
	password: string,
	type: keyringType
) => {
	const mn = await restoreMn(password, 2);
	derivePolkadot(index, addressIndex, type, mn);
};

export const getAccount = async (index: number): Promise<Account | null> => {
	const account = (await getElement('accountList', index)) as Account | null;
	if (account === null) {
		throw new Error(`Account at index ${index} does not exist`);
	}
	return account;
};

export const getAccounts = async (): Promise<Account[]> => {
	const accounts = (await getElement('accountList', 'all')) as Account[] | null;
	if (accounts === null) {
		throw new Error('Failed to get accounts');
	}
	return accounts;
};

export const hideAccount = async (index: number): Promise<void> => {
	const account = (await getElement('accountList', index)) as Account | null;
	if (account === null) {
		throw new Error(`Account at index ${index} does not exist`);
	}
	account.isHidden = true;
	editElement('accountList', account);
};

export const showAccount = async (index: number): Promise<void> => {
	const account = (await getElement('accountList', index)) as Account | null;
	if (account === null) {
		throw new Error(`Account at index ${index} does not exist`);
	}
	account.isHidden = false;
	editElement('accountList', account);
};

export const deleteAccount = async (index: number): Promise<void> => {
	const account = (await getElement('accountList', index)) as Account | null;
	if (account === null) {
		throw new Error(`Account at index ${index} does not exist`);
	}
	removeElement('accountList', index);
};

export const renameAccount = async (index: number, newName: string): Promise<void> => {
	const account = (await getElement('accountList', index)) as Account | null;
	if (account === null) {
		throw new Error(`Account at index ${index} does not exist`);
	}
	account.accountName = newName;
	editElement('accountList', account);
};



export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
	const vaultIds = [1, 2];
	const validVaultIds: number[] = [];

	for (const id of vaultIds) {
		const vault = await getElement('legacyVault', id) as LegacyVault | null;
		if (vault !== null) {
			validVaultIds.push(id);
		}
	}

	for (const vaultId of validVaultIds) {
		try {
			const mnemonic = await restoreMn(oldPassword, vaultId);
			removeElement('legacyVault', vaultId);
			packMn(newPassword, mnemonic, vaultId);
		} catch (error) {
			throw new Error(`Failed to change password for vault ${vaultId}: ${error}`);
		}
	}
};

export const resetWallet = async (): Promise<void> => {
	removeElement('accountList', 'all');
	removeElement('legacyVault', 'all');
};

export const backupWallet = async (): Promise<void> => {	
	const vaults = await getElement('legacyVault', 'all') as LegacyVault[];
	const accounts = await getElement('accountList', 'all') as Account[];
	const backup = JSON.stringify({ vaults, accounts }); 
	console.log(backup);
}

export const restoreWallet = async (backup: string): Promise<void> => {
	const data = JSON.parse(backup);
	const vaults = data.vaults as LegacyVault[];
	const accounts = data.accounts as Account[];
	for (const vault of vaults) {
		addElement('legacyVault', vault);
	}
	for (const account of accounts) {
		addElement('accountList', account);
	}
}


// need  to be implemented
export const backupVault = async (password: string): Promise<void> => {
	const isValid = await isValidPassword(password);
	if (!isValid) {
		throw new Error('Invalid password');
	}
	const vaults = await getElement('legacyVault', 'all') as LegacyVault[];
	console.log(vaults);
}

// need  to be implemented
export const restoreVault = async (password: string): Promise<void> => {
	const isValid = await isValidPassword(password);
	if (!isValid) {
		throw new Error('Invalid password');
	}
	const vaults = await getElement('legacyVault', 'all');
	console.log(vaults);
}

