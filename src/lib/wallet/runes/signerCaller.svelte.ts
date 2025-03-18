import Signer from '$lib/wallet/common/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';

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

export function setTime(time: number) {
	signer.postMessage({ method: 'setTime', argus: { time: time } });
}

export function queryTime() {
	signer.postMessage({ method: 'queryTime' });
}

export function setAutoLock(autoLock: boolean) {
	signer.postMessage({ method: 'setAutoLock', argus: { autoLock: autoLock } });
}

export function isAutoLock() {
	signer.postMessage({ method: 'isAutoLock' });
}

export function signTransaction(argus: any) {
	signer.postMessage({ method: 'signEvmTx', argus });
}

export function saveMidPass(password: string, salt: string) {
	signer.postMessage({ method: 'saveMidPass', argus: { password: password, salt: salt } });
}

export function queryMid() {
	signer.postMessage({ method: 'queryMid' });
}

export function addAccount() {
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data);
		signer.postMessage({
			method: 'addAccount',
			argus: { index: settings.nextEvmAddressIndex, addressIndex: settings.nextAccountIndex }
		});
		settings.nextEvmAddressIndex++;
		settings.nextAccountIndex++;
		localStorage.setItem('settings', JSON.stringify(settings));
    accountState.nextAccountIndex += 1;
	}
}


