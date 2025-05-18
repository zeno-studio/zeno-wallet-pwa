import {
	getElement,
	removeElement,
	DB,
	deriveEvm,
	derivePolkadot,
	isValidPassword,
	type Vault,
	type Account
} from '$lib/wallet/common';
import { scrypt } from '@noble/hashes/scrypt';
import { hexToBytes } from '@noble/ciphers/utils';
import { managedNonce } from '@noble/ciphers/webcrypto';
import { xchacha20poly1305 as xchacha } from '@noble/ciphers/chacha';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { Transaction, addr } from 'micro-eth-signer';
import { packMn, restoreMn, type KeyringType } from '$lib/wallet/common';

let isLocked = true;
let isAutoLock = true;
let timeout = 1000 * 60 * 15;
let midpass: Uint8Array = new Uint8Array(32);
onmessage = ({ data }) => {
	switch (data.method) {
		case 'saveMidPass':
			saveMidPass(data.argus.password, data.argus.salt, data.argus.needRes);
		case 'isLocked':
			postMessage({ success: true, data: isLocked });
			break;
		case 'lockSigner':
			lockSigner();
			break;
		case 'unLockSigner':
			unLockSigner(data.argus.password);
			break;
		case 'setTimer':
			setTimer(data.argus.time, data.argus.password, data.argus.salt);
			break;
		case 'disableAutoLock':
			disableAutoLock(data.argus.password, data.argus.salt);
			break;
		case 'queryTimer':
			postMessage({ success: true, data: timeout / (60 * 1000) });
			break;
		case 'addEvmAccount':
			addEvmAccount(data.argus.index, data.argus.password, data.argus.salt);
			break;
		case 'addPolkadotAccount':
			addPolkadotAccount(data.argus.index, data.argus.type, data.argus.password, data.argus.salt);
			break;
		case 'checkPassword':
			checkPassword(data.argus.password);
			break;
		// testing function need delete
		case 'queryMid':
			postMessage({ success: true, data: midpass });
			break;
		case 'reBuildMn':
			reBuildMn();
			break;
		case 'signEvmTx':
			signEvmTx(data.argus.tx, data.argus.account, data.argus.password);
			break;
		case 'changePassword':
			changePassword(data.argus.oldPassword, data.argus.newPassword);
			break;
		default:
			throw new Error(`Unknown method: ${data.method}`);
	}
};

const lockSigner = () => {
	isLocked = true;
	midpass.fill(0);
	postMessage({ success: true });
};

const unLockSigner = async (password: string) => {
	const isValid = await isValidPassword(password);
	if (!isValid) {
		postMessage({ success: false, error: 'Invalid password' });
		return;
	}
	if (isLocked) {
		const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		saveMidPass(password, vault.salt, false);
	}
	postMessage({ success: true });
};

const setTimer = (time: number, password: string, salt: string) => {
	if (time === 0) {
		timeout = 0;
		isAutoLock = true;
		isLocked = true;
		midpass.fill(0);
		postMessage({ success: true });
	} else {
		timeout = time * 60 * 1000;
		if (password && salt) {
			saveMidPass(password, salt, false);
		}
		isAutoLock = true;
		setTimeout(() => {
			isLocked = true;
		}, timeout);
		setTimeout(() => {
			midpass.fill(0);
		}, timeout + 60000);
		postMessage({ success: true });
	}
};

const disableAutoLock = (password: string, salt: string) => {
	isAutoLock = false;
	if (password && salt) {
		saveMidPass(password, salt, false);
	}
	if (midpass.every((byte) => byte === 0)) {
		isLocked = true;
	} else {
		isLocked = false;
	}
	postMessage({ success: true });
};

const saveMidPass = (password: string, salt: string, needRes: boolean) => {
	if (timeout === 0) {
		if (needRes) {
			postMessage({
				success: true
			});
		}
		return;
	}
	midpass = scrypt(password, hexToBytes(salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	isLocked = false;
	if (isAutoLock) {
		setTimeout(() => {
			isLocked = true;
		}, timeout);
		setTimeout(() => {
			midpass.fill(0);
		}, timeout + 60000);
		if (needRes) {
			postMessage({
				success: true
			});
		}
	} else {
		if (needRes) {
			postMessage({
				success: true
			});
		}
	}
};

const reBuildMn = async (): Promise<string> => {
	const phrase = midpass;
	const chacha = managedNonce(xchacha)(phrase);
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
	const mn = bip39.entropyToMnemonic(ent, wordlist);
	return mn;
};

const addEvmAccount = async (index: number, password: string, salt: string) => {
	if (password && salt) {
		saveMidPass(password, salt, false);
	}
	const mn = await reBuildMn();
	const newAccount = deriveEvm(index, mn);
	if (newAccount) postMessage({ success: true, data: newAccount });
	else postMessage({ success: false });
};

const addPolkadotAccount = async (
	index: number,
	type: KeyringType,
	password: string,
	salt: string
) => {
	if (password && salt) {
		saveMidPass(password, salt, false);
	}
	const mn = await reBuildMn();
	const newAccount = derivePolkadot(index, type, mn);
	if (newAccount) postMessage({ success: true, data: newAccount });
	else postMessage({ success: false });
};

const checkPassword = async (password: string) => {
	const isValid = await isValidPassword(password);
	postMessage({ success: true, data: isValid });
};

const changePassword = async (oldPassword: string, newPassword: string) => {
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const mnemonic = await restoreMn(oldPassword, vault.name);
	if (!mnemonic) return postMessage({ success: false, error: 'Invalid old password' });
	removeElement(DB.Vault.name, 'zeno');
	const ischanged = packMn(newPassword, mnemonic);
	if (ischanged) {
		const newVault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		saveMidPass(newPassword, newVault.salt, false);
		postMessage({ success: true });
	} else {
		postMessage({ success: false, error: 'Failed to change password' });
	}
};

const signEvmTransaction = (tx: any, account: Account, mn: string) => {
	const hdKey_ = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mn));
	const hdKey = hdKey_.derive(account.derivePath as string);
	const privateKey = hdKey.privateKey;
	const publicKey = hdKey.publicKey;
	if (privateKey && publicKey && account.address === addr.fromPublicKey(publicKey)) {
		const Tx = Transaction.prepare({
			to: tx.to,
			value: tx.value,
			nonce: tx.nonce,
			gasPrice: tx.gasPrice,
			gasLimit: tx.gasLimit,
			data: tx.data
		});
		const signedTx = Tx.signBy(privateKey).toHex();
		const success = true;
		postMessage({ success, data: signedTx });
	}
};

const signEvmTx = async (tx: any, account: Account, password?: string, salt?: string) => {
	const ps = password ?? password;
	const s = salt ?? salt;
	// if wallet is locked
	if (isLocked && (ps === undefined || s === undefined)) {
		postMessage({
			success: false,
			error: 'Wallet is locked and password or salt is empty'
		});
	}
	if (isLocked && ps !== undefined && s !== undefined) {
		saveMidPass(ps, s, false);
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}

	// if wallet is not locked
	if ((!isAutoLock || !isLocked) && !midpass.every((byte) => byte === 0)) {
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}
	if (
		(!isAutoLock || !isLocked) &&
		midpass.every((byte) => byte === 0) &&
		ps !== undefined &&
		s !== undefined
	) {
		saveMidPass(ps, s, false);
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}
	if (
		(!isAutoLock || !isLocked) &&
		midpass.every((byte) => byte === 0) &&
		(ps === undefined || s === undefined)
	) {
		postMessage({
			success: false,
			error: 'midpass is empty and password or salt is empty'
		});
	}
};
