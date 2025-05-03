import {
	addElement,
	getElement,
	removeElement,
	DB,
	type Account,
	type Vault,
	type KeyringType,
	type WalletBackupData,
	type AddressType,
	type AddressEntry,
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
	ss58Decode,
	type DeriveFn
} from '@polkadot-labs/hdkd-helpers';

export const packVaultToJson = async (): Promise<string> => {
	const vault = (await getElement(DB.Vault.name, 'all')) as Vault[];
	return JSON.stringify(vault);
};

export const packMn = (password: string, mn: string): boolean => {
	const salt = randomBytes(32);
	const ent = bip39.mnemonicToEntropy(mn, wordlist);
	const phrase = scrypt(password, salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	const ciphertext = chacha.encrypt(ent);
	const store: Vault = {
		name: 'zeno',
		salt: bytesToHex(salt),
		ciphertext: bytesToHex(ciphertext),
		Version: 'v1',
	};	
	try {
		addElement(DB.Vault.name, store);
		return true;
	}
	catch (e) {
		return false;
	}
};
	

export const restoreMn = async (password: string, vaultName: string): Promise<string | null> => {
	const vault = (await getElement(DB.Vault.name, vaultName)) as Vault;
	const phrase = scrypt(password, hexToBytes(vault.salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 }); // vault.salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	try {
		const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
		const mn = bip39.entropyToMnemonic(ent, wordlist);
		return mn;
	}
	catch (e) {
		return null;
	}
};

export const isValidPassword = async (password: string): Promise<boolean> => {
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const phrase = scrypt(password, hexToBytes(vault.salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 }); // vault.salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	try {
		if (chacha.decrypt(hexToBytes(vault.ciphertext))) return true;
		return false;
	}
	catch (e) {
		return false;
	}
};

export const isValidMn = (mn: string): boolean => {
	if (!bip39.validateMnemonic(mn, wordlist)) return false;
	return true;
};

export const createEvmAccount = (
	index: number,
	password: string,
	mn?: string
): boolean => {
	mn = mn ?? bip39.generateMnemonic(wordlist, 128);
	try {
		packMn(password, mn);
		deriveEvm(index, mn);
		return true;
	}
	catch (e) {
		return false;
	}
};

export const deriveEvmAccount = async (index: number, password: string): Promise<Account | null> => {
	const mn = await restoreMn(password, `m/44'/60'/0'/0/${index - 1}`);
	if (!mn) return null;
	return deriveEvm(index, mn);
};
export const deriveEvm = (index: number, mn: string): Account | null => {
	if (!bip39.validateMnemonic(mn, wordlist) || !mn) return null;
	else {
		let newAccount: Account | null = null
		const hdKey_ = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mn));
		const hdKey = hdKey_.derive(`m/44'/60'/0'/0/${index - 1}`);
		if (hdKey.publicKey) {
			newAccount = {
				accountIndex: index,
				name: `Account${index}`,
				accountType: 'local',
				isHidden: false,
				address: addr.fromPublicKey(hdKey.publicKey),
				addressType: 'EVM',
				derivePath: `m/44'/60'/0'/0/${index - 1}`,
				keyringType: 'secp256k1',
			};
			addElement(DB.Account.name, newAccount);
			return newAccount;
		}
		return null
	}
};

export const createPolkadotAccount = (
	index: number,
	password: string,
	type: KeyringType,
	mn?: string
): boolean => {
	mn = mn ?? bip39.generateMnemonic(wordlist, 128);
	try {
		packMn(password, mn);
		derivePolkadot(index, type, mn);
		return true;
	}
	catch (e) {
		return false;
	}
};

export const derivePolkadot = (
	index: number,
	type: KeyringType,
	mn: string
): Account | null => {
	const miniSecret = entropyToMiniSecret(mnemonicToEntropy(mn));
	let derive: DeriveFn;
	if (type === 'secp256k1') {
		derive = ecdsaCreateDerive(miniSecret);
	} else if (type === 'ed25519') {
		derive = ed25519CreateDerive(miniSecret);
	} else if (type === 'sr25519') {
		derive = sr25519CreateDerive(miniSecret);
	} else {
		return null;
	}
	const path = (index - 101) > 0 ? `//${index - 102}` : '';
	const pair = derive(path);
	const pub = bytesToHex(pair.publicKey);
	const newAccount: Account = {
		accountIndex: index,
		name: `Account${index}`,
		accountType: 'local',
		address: ss58Address(pub, 0),
		isHidden: false,
		addressType: 'POLKADOT',
		derivePath: path,
		keyringType: type,
	};
	try {
		addElement(DB.Account.name, newAccount);
		return newAccount;
	}
	catch (e) {
		return null;
	}
};

export const derivePolkadotAccount = async (
	index: number,
	password: string,
	type: KeyringType,
	vaultName: string
): Promise<Account | null> => {
	const mn = await restoreMn(password, vaultName);
	if (!mn) return null;
	return derivePolkadot(index, type, mn);
};






export const detectAddressType=(address: string | null | undefined): AddressType =>{
	if (address == null || address.trim() === '') {
		return '';
	}
	const trimmedAddress = address.trim();

	if (trimmedAddress.startsWith('0x')) {
		return addr.isValid(trimmedAddress) ? 'EVM' : '';
	}
	try {
		ss58Decode(trimmedAddress);
		return 'POLKADOT';
	} catch {
		return '';
	}
}
