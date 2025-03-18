import { getElement, dbStore, deriveEvm, type LegacyVault, type Account } from '$lib/wallet/common';
import { scrypt } from '@noble/hashes/scrypt';
import { bytesToHex, hexToBytes } from '@noble/ciphers/utils';
import { managedNonce } from '@noble/ciphers/webcrypto';
import { xchacha20poly1305 as xchacha } from '@noble/ciphers/chacha';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { Transaction, addr } from 'micro-eth-signer';
import { accountState} from '$lib/wallet/runes';

let isLocked = true;
let isAutoLock = true;
let timeout = 1000 * 60 * 15;
const psReplacer = hexToBytes('0000000000000000000000000000000000000000000000000000000000000000');
let midpass = psReplacer;
onmessage = ({ data }) => {
	switch (data.method) {
		case 'isLocked':
			postMessage({ success: true, data: isLocked });
			break;
		case 'isAutoLock':
			postMessage({ success: true, data: isAutoLock });
			break;
		case 'setAutoLock':
			isAutoLock = data.argus.autoLock;
			postMessage({ success: true, data: isAutoLock });
			break;
		case 'setTime':
			timeout = data.argus.time * 60 * 1000;
			postMessage({ success: true, data: timeout / (60 * 1000) });
			break;
		case 'queryTime':
			postMessage({ success: true, data: timeout / (60 * 1000) });
			break;
		case 'saveMidPass':
			saveMidPass(data.argus.password, data.argus.salt);
			break;
		case 'addAccount':
			addAccount(data.argus.index, data.argus.addressIndex);
			break;
		// testing function need delete
		case 'queryMid':
			postMessage({ success: true, data: midpass });
			break;
		case 'signEvmTx':
			signEvmTx(data.argus.tx, data.argus.account, data.argus.password);
			break;
		default:
			throw new Error(`Unknown method: ${data.method}`);
	}
};

function saveMidPass(password: string, salt: string) {
	midpass = scrypt(password, salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
	isLocked = false;
	if (isAutoLock) {
		setTimeout(() => {
			isLocked = true;
			midpass = psReplacer;
		}, timeout);
		postMessage({
			success: true,
			data: { isLocked: isLocked, time: timeout / (60 * 1000), ps: bytesToHex(midpass) }
		});
	} else {
		postMessage({
			success: true,
			data: { isLocked: isLocked, time: timeout / (60 * 1000), ps: bytesToHex(midpass) }
		});
	}
}

async function signEvmTx(tx: any, account: Account, password?: string, salt?: string) {
	const ps = password ?? password;
	const s = salt ?? salt;
	// if wallet is locked
	if ( isLocked && (ps === undefined || s === undefined)) {
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
	if ((!isAutoLock || !isLocked) && midpass !== psReplacer) {
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}
	if ((!isAutoLock || !isLocked) && midpass === psReplacer && ps !== undefined && s !== undefined) {
		saveMidPass(ps, s);
		const mn = await reBuildMn();
		signEvmTransaction(tx, account, mn);
	}
	if (
		(!isAutoLock || !isLocked) &&
		midpass === psReplacer &&
		(ps === undefined || s === undefined)
	) {
		postMessage({
			success: false,
			error: 'midpass is empty and password or salt is empty'
		});
	}
}

async function reBuildMn(): Promise<string> {
	const phrase = midpass;
	const chacha = managedNonce(xchacha)(phrase);
	const vault = (await getElement(dbStore.Vault.name, 'default')) as LegacyVault;
	const ent = chacha.decrypt(hexToBytes(vault.ciphertext));
	const mn = bip39.entropyToMnemonic(ent, wordlist);
	return mn;
}

function signEvmTransaction(tx: any, account: Account, mn: string) {
	const hdKey_ = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mn));
	const hdKey = hdKey_.derive(account.derivePath);
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
		postMessage({ success, signedTx });
	}
}

async function addAccount(index: number, addressIndex: number) {
	const mn = await reBuildMn();
	deriveEvm(index, addressIndex, mn);

}
