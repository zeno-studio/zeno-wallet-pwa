import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import {type KeyringType,} from '$lib/wallet/common';

export const signer = new Signer();

export const resetSigner = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'resetSigner' });
	});
};


export const checkIsLocked = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'isLocked' });
	});
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



export const addEvmAccount = (password?: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'addEvmAccount',
			argus: {
				index: accountState.nextAccountIndex,
				password: password ? password : '',
			}
		});
	});
};

export const addPolkadotAccount = (type: KeyringType, password?: string) => {
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
		signer.postMessage({ method: 'saveMidPass', argus: { password: password,needRes:needRes } });
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


// test function need delete
export const queryMid = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'queryMid',
		});
	});
};
export const getVault = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'getVault',
		});
	});
};

export const reBuildMnPost = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'reBuildMnPost',
		});
	});
};