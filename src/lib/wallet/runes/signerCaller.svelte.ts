import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import { getElement, dbStore, type LegacyVault,type Account} from '$lib/wallet/common';

export const signer = new Signer();

export type signerResponseType = {
	success: boolean;
	data?: any;
	error?: string;
};

export type signerRequestType = {
	method: string;
	argus?: any;
};

export function isLocked() {
	signer.postMessage({ method: 'isLocked' });
}

export function lockSigner() {
	signer.postMessage({ method: 'lockSigner' });
}

export function setTime(time: number, type?: string) {
	signer.postMessage({ method: 'setTime', argus: { time: time } });
	if (type === 'save') {
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			settings.timeLock = time;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	}
}
export function queryTime() {
	signer.postMessage({ method: 'queryTime' });
}

export function setAutoLock(autoLock: boolean, type?: string) {
	signer.postMessage({ method: 'setAutoLock', argus: { autoLock: autoLock } });
	if (type === 'save') {
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			settings.autoLock = autoLock;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	}
}

export function isAutoLock() {
	signer.postMessage({ method: 'isAutoLock' });
}

export function signTransaction(argus: any) {
	signer.postMessage({ method: 'signEvmTx', argus });
}

export async function saveMidPass(password: string) {
	const vault = (await getElement(dbStore.Vault.name, 'default')) as LegacyVault;
	signer.postMessage({ method: 'saveMidPass', argus: { password: password, salt: vault.salt } });
}

export function queryMid() {
	signer.postMessage({ method: 'queryMid' });
}

export async function addEvmAccount() {
	const result = (await addEvmAccountWorker()) as signerResponseType | null;
	if (result?.success === true) {
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			const newAccount = result.data
			if (newAccount) accountState.accountList = [...accountState.accountList, newAccount as Account];
			accountState.currentAccountIndex = settings.nextAccountIndex;
			accountState.nextAccountIndex ++;
			accountState.nextEvmAddressIndex ++;
			settings.currentAccountIndex = settings.nextAccountIndex;
			settings.nextEvmAddressIndex++;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	}
}

function addEvmAccountWorker() {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data); 
		};
		
		signer.postMessage({
				method: 'addEvmAccount',
				argus: { index: accountState.nextAccountIndex, addressIndex: accountState.nextEvmAddressIndex }
			});
	});
}

export async function AddEvmAccountWithPassword(password: string) {
    const result = (await addEvmAccountPasswordWorker(password)) as signerResponseType | null;
    if (result?.success === true) {
        const data = localStorage.getItem('settings');
        if (data) {
			const settings = JSON.parse(data);
			const newAccount = result.data
			if (newAccount) accountState.accountList = [...accountState.accountList, newAccount as Account];
			accountState.currentAccountIndex = settings.nextAccountIndex;
			accountState.nextAccountIndex ++;
			accountState.nextEvmAddressIndex ++;
			settings.currentAccountIndex = settings.nextAccountIndex;
			settings.nextEvmAddressIndex++;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	}
}


function addEvmAccountPasswordWorker(password: string) {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data); // 接收 Worker 返回的结果
		};

		signer.postMessage({
			method: 'addEvmAccountWithPassword',
			argus: {
				index: accountState.nextAccountIndex,
				addressIndex: accountState.nextEvmAddressIndex,
				password: password
			}
		});
	});
}

export function checkPassword(password: string) {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'checkPassword', argus: { password: password } });
	});
}

export function checkIsLocked() {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		isLocked();
	});
}
