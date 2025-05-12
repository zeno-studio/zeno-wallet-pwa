import { getElement, removeElement, DB, deriveEvm, derivePolkadot,isValidPassword, type Vault, type Account } from '$lib/wallet/common';
import { scrypt } from '@noble/hashes/scrypt';
import { hexToBytes } from '@noble/ciphers/utils';
import { managedNonce } from '@noble/ciphers/webcrypto';
import { xchacha20poly1305 as xchacha } from '@noble/ciphers/chacha';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { Transaction, addr } from 'micro-eth-signer';
import { packMn, restoreMn, type KeyringType } from '$lib/wallet/common';
import type { error } from '@sveltejs/kit';


let isLocked = true;
let isAutoLock = true;
let timeout = 1000 * 60 * 15;
let midpass:Uint8Array = new Uint8Array(32);
onmessage = ({ data }) => {
	switch (data.method) {
		case 'isLocked':
			postMessage({ success: true, data: isLocked });
			break;
		case 'lockSigner':
			lockSigner();
			break;
		case 'unLockSigner':
			unLockSigner(data.argus.password);
			break;
		case 'isAutoLock':
			postMessage({ success: true, data: isAutoLock });
			break;
		case 'setAutoLock':
			setAutoLock(data.argus.autoLock);
			break;
		case 'setAutoLockWithpass':
			setAutoLockWithpass(data.argus.autoLock, data.argus.password);
		case 'setTimer':
			setTimer(data.argus.time);
			break;
		case 'queryTimer':
			postMessage({ success: true, data: timeout / (60 * 1000) });
			break;
		case 'addEvmAccount':
			addEvmAccount(data.argus.index);
			break;
		case 'addEvmAccountWithPassword':
			addEvmAccountWithPassword(data.argus.index, data.argus.password);
			break;
		case 'addPolkadotAccount':
			addPolkadotAccount(data.argus.index, data.argus.type);
			break;
		case 'addPolkadotAccountWithPassword':
			addPolkadotAccountWithPassword(data.argus.index, data.argus.password, data.argus.type);
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

const lockSigner=()=> {
	if (!isLocked){
		isLocked = true;
		midpass.fill(0);
	}
	postMessage({ success: true, data: isLocked });
}

const unLockSigner=async(password:string)=> {
	const isValid = await isValidPassword(password);
	if (!isValid) {
		postMessage({ success: false, error: 'Invalid password' });
		return;
	}
	if (isLocked){
		const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		saveMidPassNotPost(password, vault.salt);
	}
	postMessage({ success: true, data: isLocked });
}


// unlock状态
const setAutoLock=(autoLock:boolean)=>{
	if(autoLock){
		isAutoLock = autoLock;
		setTimeout(() => {
			isLocked = true;
		}, timeout);
		setTimeout(() => {
			midpass.fill(0);
		}, timeout + 60000);
	} else {
		isAutoLock = autoLock;
	}
	postMessage({ success: true});
}

// lock状态
const setAutoLockWithpass=async(autoLock:boolean,password:string)=>{
	const isValid = await isValidPassword(password);
	if (!isValid) {
		postMessage({ success: false, error: 'Invalid password' });
		return;
	}
	isAutoLock = autoLock;
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	saveMidPassNotPost(password, vault.salt);
	postMessage({ success: true});
}


const setTimer=(time: number)=> {
	timeout = time * 60 * 1000;
	if (isAutoLock) {
		setTimeout(() => {
			isLocked = true;
		}, timeout);
		setTimeout(() => {
			midpass.fill(0);
		}, timeout + 60000);
		postMessage({
			success: true
		});
	}
	if (!isAutoLock){
		postMessage({
			success: true
		});
	}

}



const saveMidPass=(password: string, salt: string)=> {
	midpass = scrypt(password, hexToBytes(salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 })
	isLocked = false;
	if (isAutoLock) {
		setTimeout(() => {
			isLocked = true;
		}, timeout);
		setTimeout(() => {
			midpass.fill(0);
		}, timeout + 60000);
		postMessage({
			success: true
		});
	} else {
		postMessage({
			success: true
		});
	}
}

const saveMidPassNotPost=(password: string, salt: string)=> {
	midpass = scrypt(password, hexToBytes(salt), { N: 2 ** 16, r: 8, p: 1, dkLen: 32 })
	isLocked = false;
	if (isAutoLock) {
		setTimeout(() => {
			isLocked = true;
		}, timeout);
		setTimeout(() => {
			midpass.fill(0);
		}, timeout + 60000);;
	}
}




const reBuildMn=async(): Promise<string> => {
	const phrase = midpass;
	const chacha = managedNonce(xchacha)(phrase);
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
	const mn = bip39.entropyToMnemonic(ent, wordlist);
	return mn;
}



const addEvmAccount=async(index: number) =>{
	const mn = await reBuildMn();
	const newAccount = deriveEvm(index, mn)
	if (newAccount) postMessage({ success: true, data: newAccount });
	else postMessage({ success: false });
}

const addEvmAccountWithPassword=async(index: number, password: string) =>{
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	saveMidPassNotPost(password, vault.salt);
	const mn = await reBuildMn();
	const newAccount = deriveEvm(index, mn)
	if (newAccount) postMessage({ success: true, data: newAccount });
	else postMessage({ success: false });
}

const addPolkadotAccount=async(index: number, type: KeyringType) =>{
	const mn = await reBuildMn();
	const newAccount = derivePolkadot(index, type, mn)
	if (newAccount) postMessage({ success: true, data: newAccount });
	else postMessage({ success: false });
}

const addPolkadotAccountWithPassword=async(index: number, password: string, type: KeyringType) => {
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	saveMidPassNotPost(password, vault.salt);
	const mn = await reBuildMn();
	const newAccount = derivePolkadot(index, type, mn)
	if (newAccount) postMessage({ success: true, data: newAccount });
	else postMessage({ success: false });
}	

const checkPassword=async(password: string) =>{
	const isValid = await isValidPassword(password);
	postMessage({ success: true, data: isValid });
}

const changePassword=async(oldPassword: string, newPassword: string)=> {
	const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
	const mnemonic = await restoreMn(oldPassword, vault.name);
	if (!mnemonic) return postMessage({ success: false,error: 'Invalid old password' });
	removeElement(DB.Vault.name, 'zeno');
	const ischanged = packMn(newPassword, mnemonic);
	if (ischanged) {
		const newVault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		saveMidPassNotPost(newPassword, newVault.salt);
		postMessage({ success: true });
	} else {
		postMessage({ success: false,error: 'Failed to change password' });
	}
}


const signEvmTransaction=(tx: any, account: Account, mn: string)=> {
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
}


const signEvmTx=async(tx: any, account: Account, password?: string, salt?: string)=> {
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
		saveMidPass(ps, s);
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}

	// if wallet is not locked
	if ((!isAutoLock || !isLocked) && !midpass.every(byte => byte === 0)) {
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}
	if ((!isAutoLock || !isLocked) && midpass.every(byte => byte === 0) && ps !== undefined && s !== undefined) {
		saveMidPass(ps, s);
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}
	if (
		(!isAutoLock || !isLocked) &&
		midpass.every(byte => byte === 0) &&
		(ps === undefined || s === undefined)
	) {
		postMessage({
			success: false,
			error: 'midpass is empty and password or salt is empty'
		});
	}
}