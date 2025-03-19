import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import { getElement, dbStore, deriveEvm,isValidPassword, type LegacyVault, type Account } from '$lib/wallet/common';

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

export function addEvmAccount() {
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data);
		signer.postMessage({
			method: 'addEvmAccount',
			argus: { index: settings.nextAccountIndex, addressIndex: settings.nextEvmAddressIndex }
		});
		settings.nextEvmAddressIndex++;
		settings.nextAccountIndex++;
		localStorage.setItem('settings', JSON.stringify(settings));
		accountState.nextAccountIndex += 1;
	}
}

export function AddEvmAccountWithPassword(password: string) {
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data);
		signer.postMessage({
			method: 'addEvmAccountWithPassword',
			argus: {
				index: settings.nextAccountIndex,
				accountIndex: settings.nextEvmAddressIndex,
				password: password
			}
		});
		settings.nextEvmAddressIndex++;
		settings.nextAccountIndex++;
		localStorage.setItem('settings', JSON.stringify(settings));
		accountState.nextAccountIndex += 1;
	}
}

export function checkPassword(password: string) {
	signer.postMessage({ method: 'checkPassword', argus: { password: password } });
}

// testing function
export function reBuildMn() {
	signer.postMessage({ method: 'reBuildMn' });
}

