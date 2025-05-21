import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import {type KeyringType,} from '$lib/wallet/common';

export const signer = new Signer();


export const checkIsLocked = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'isLocked' });
	});
};

export const isLocked = () => {
		signer.postMessage({ method: 'isLocked' });

};

export const lockSigner = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'lockSigner' });
	});
};

export const unLockSigner = (password: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'unLockSigner', argus: { password: password } });
	});
};

export const disableAutoLock = (password?: string, salt?: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'disableAutoLock',
			argus: { password: password ? password : '', salt: salt ? salt : '' }
		});
	});
};

export const setTimer = (time: number, password?: string, salt?: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'setTimer',
			argus: { time: time, password: password ? password : '', salt: salt ? salt : '' }
		});
	});
};

export const queryTimer = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'queryTimer' });
	});
};

export const query = () => {

		signer.postMessage({ method: 'queryTimer' });
	
};

// test function need delete
export const queryMid = () => {
	signer.postMessage({ method: 'queryMid' });
};

export const addEvmAccount = (password?: string, salt?: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'addEvmAccount',
			argus: {
				index: accountState.nextAccountIndex,
				password: password ? password : '',
				salt: salt ? salt : ''
			}
		});
	});
};

export const addPolkadotAccount = (type: KeyringType, password?: string, salt?: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};

		signer.postMessage({
			method: 'addPolkadotAccount',
			argus: {
				index: accountState.nextPolkadotIndex,
				type: type,
				password: password ? password : '',
				salt: salt ? salt : ''
			}
		});
	});
};

export const checkPassword = (password: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'checkPassword', argus: { password: password } });
	});
};

export const saveMidPass = (password: string,needRes:boolean) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'isLocked', argus: { password: password,needRes:needRes } });
	});
};

export const changePassword = (oldPassword: string, newPassword: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'changePassword',
			argus: { oldPassword: oldPassword, newPassword: newPassword }
		});
	});
};

export const signTransaction = (argus: any) => {
	signer.postMessage({ method: 'signEvmTx', argus });
};