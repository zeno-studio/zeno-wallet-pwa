import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import { getElement, dbStore, type Vault, type Account, type Settings ,type KeyringType} from '$lib/wallet/common';

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
	const vault = (await getElement(dbStore.Vault.name, 'zeno')) as Vault;
	signer.postMessage({ method: 'saveMidPass', argus: { password: password, salt: vault.salt } });
}

export function queryMid() {
	signer.postMessage({ method: 'queryMid' });
}

export async function addEvmAccount() {
	const result = (await addEvmAccountWorker()) as signerResponseType | null;
	try {
		if (result?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			const newAccount = result.data as Account;
			accountState.accountList = [...accountState.accountList, newAccount];
			accountState.currentAccountIndex = settings.nextAccountIndex;
			accountState.nextAccountIndex++;
			settings.currentAccountIndex = settings.nextAccountIndex;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	} catch (e) {
		console.error('Error when adding new account', e);
	}
}

function addEvmAccountWorker() {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};

		signer.postMessage({
			method: 'addEvmAccount',
			argus: { index: accountState.nextAccountIndex }
		});
	});
}

export async function addEvmAccountWithPassword(password: string) {
	const result = (await addEvmAccountPasswordWorker(password)) as signerResponseType | null;
	try {
		if (result?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			const newAccount = result.data as Account;
			if (newAccount) accountState.accountList = [...accountState.accountList, newAccount];
			accountState.currentAccountIndex = settings.nextAccountIndex;
			accountState.nextAccountIndex++;
			settings.currentAccountIndex = settings.nextAccountIndex;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));

		}
	} catch (e) {
		console.error('Error when adding new account', e);
	}
}

function addEvmAccountPasswordWorker(password: string) {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data); 
		};

		signer.postMessage({
			method: 'addEvmAccountWithPassword',
			argus: {
				index: accountState.nextAccountIndex,
				password: password
			}
		});
	});
}


function addPolkadotAccountWorker(type: KeyringType) {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};

		signer.postMessage({
			method: 'addPolkadotAccount',
			argus: { index: accountState.nextPolkadotIndex, type: type }
		});
	});
}

export async function addPolkadotAccount(type: KeyringType) {
	const result = (await addPolkadotAccountWorker(type)) as signerResponseType | null;
	try {
		if (result?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			const newAccount = result.data as Account;
			accountState.accountList = [...accountState.accountList, newAccount];
			accountState.currentAccountIndex = settings.nextPolkadotIndex;
			accountState.nextPolkadotIndex++;
			settings.currentAccountIndex = settings.nextPolkadotIndex;
			settings.nextPolkadotIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	} catch (e) {
		console.error('Error when adding new account', e);
	}
}

function addPolkadotAccountPasswordWorker(password: string, type: KeyringType) {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data); // 接收 Worker 返回的结果
		};

		signer.postMessage({
			method: 'addPolkadotAccountWithPassword',
			argus: {
				index: accountState.nextPolkadotIndex,
				type: type,
				password: password,
				
			}
		});
	});
}

export async function addPolkadotAccountWithPassword(password: string, type: KeyringType) {
	const result = (await addPolkadotAccountPasswordWorker(password, type)) as signerResponseType | null;
	try {
		if (result?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			const newAccount = result.data as Account;
			if (newAccount) accountState.accountList = [...accountState.accountList, newAccount];
			accountState.currentAccountIndex = settings.nextPolkadotIndex;
			accountState.nextPolkadotIndex++;
			settings.currentAccountIndex = settings.nextPolkadotIndex;
			settings.nextPolkadotIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));

		}
	} catch (e) {
		console.error('Error when adding new account', e);
	}
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

export function changePassword(oldPassword: string, newPassword: string) {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'changePassword', argus: { oldPassword: oldPassword, newPassword: newPassword } });
	});
}



