import { type KeyringType, type Vault, type Account } from '../common/type';
import { initDB, getElement, removeElement, DB } from '../common/indexedDB';
import { deriveEvm, isValidPassword, packMn, restoreMn } from '../common/account';
import { scrypt } from '@noble/hashes/scrypt';
import { hexToBytes } from '@noble/ciphers/utils';
import { managedNonce } from '@noble/ciphers/webcrypto';
import { xchacha20poly1305 as xchacha } from '@noble/ciphers/chacha';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { Transaction, addr } from 'micro-eth-signer';

initDB();
let isLocked = true;
let isAutoLock = true;
let timeout = 1000 * 60 * 15;
let midpass: Uint8Array = new Uint8Array(32);
onmessage = ({ data }) => {
	switch (data.method) {
		case 'resetSigner':
			resetSigner();
			break;
		case 'saveMidPass':
			saveMidPass(data.argus.password, data.argus.needRes);
			break;
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
			setTimer(data.argus.time, data.argus.password);
			break;
		case 'disableAutoLock':
			disableAutoLock(data.argus.password);
			break;
		case 'queryTimer':
			postMessage({ success: true, data: timeout / (60 * 1000) });
			break;
		case 'addEvmAccount':
			addEvmAccount(data.argus.index, data.argus.password);
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
		case 'checkPassword':
			checkPassword(data.argus.password);
			break;
		// testing function need delete
		case 'queryMid':
			postMessage({ success: true, data: midpass });
			break;
		case 'getVault':
			getVault();
			break;
		case 'reBuildMnPost':
			reBuildMnPost();
			break;
		case 'queryAutoLock':
			postMessage({ success: true, data: isAutoLock });
			break;
		default:
			throw new Error(`Unknown method: ${data.method}`);
	}
};

const resetSigner = () => {
	isLocked = true;
	isAutoLock = true;
	timeout = 1000 * 60 * 15;
	midpass.fill(0);
	postMessage({ success: true });
}

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
		saveMidPass(password, false);
	}
	postMessage({ success: true });
};

const setTimer = (time: number, password: string) => {
	if (time === 0) {
		timeout = 0;
		isAutoLock = true;
		isLocked = true;
		midpass.fill(0);
		postMessage({ success: true });
	} else {
		timeout = time * 60 * 1000;
		if (password) {
			saveMidPass(password, false);
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

const disableAutoLock = (password: string) => {
	isAutoLock = false;
	if (password) {
		saveMidPass(password, false);
	}
	if (midpass.every((byte) => byte === 0)) {
		isLocked = true;
	} else {
		isLocked = false;
	}
	postMessage({ success: true });
};

const saveMidPass = async (password: string, needRes: boolean) => {
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const phrase = scrypt(password, hexToBytes(vault.salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	const chacha = managedNonce(xchacha)(phrase);
	try {
		chacha.decrypt(hexToBytes(vault.ciphertext));
		midpass = phrase;
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
	} catch (e) {
		if (needRes) {
			postMessage({
				success: false,
				error: 'Invalid password'
			});
		}
		return;
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

const addEvmAccount = async (index: number, password: string) => {
	if (password) {
		const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		const phrase = scrypt(password, hexToBytes(vault.salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
		const chacha = managedNonce(xchacha)(phrase);
		try {
			const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
			const mn = bip39.entropyToMnemonic(ent, wordlist);
			midpass = phrase;
			isLocked = false;
			if (isAutoLock) {
				setTimeout(() => {
					isLocked = true;
				}, timeout);
				setTimeout(() => {
					midpass.fill(0);
				}, timeout + 60000);
			}
			const newAccount = deriveEvm(index, mn);
			if (newAccount) postMessage({ success: true, data: newAccount });
			else postMessage({ success: false });
		} catch (e) {
			postMessage({
				success: false,
				error: 'Invalid password'
			});
			return;
		}
	}
	if (!password && !isLocked) {
		const mn = await reBuildMn();
		const newAccount = deriveEvm(index, mn);
		if (newAccount) postMessage({ success: true, data: newAccount });
		else postMessage({ success: false });
	}
	if (!password && isLocked) {
		postMessage({
			success: false,
			error: 'Wallet is locked'
		});
	}
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
		saveMidPass(newPassword, false);
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
		saveMidPass(ps, false);
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
		saveMidPass(ps, false);
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

// test function need delete
const getVault = async () => {
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	postMessage({ success: true, data: vault });
};

const reBuildMnPost = async () => {
	const phrase = midpass;
	const chacha = managedNonce(xchacha)(phrase);
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
	const mn = bip39.entropyToMnemonic(ent, wordlist);
	postMessage({ success: true, data: mn });
};
