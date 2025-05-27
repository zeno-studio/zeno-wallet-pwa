import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import {
		type signerResponseType,
		type Settings,
		type Account,
	} from '$lib/wallet/common';

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

export const disableAutoLock = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'disableAutoLock',
		});
	});
};

export const setTimer = (time: number) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'setTimer',
			argus: { time: time}
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



export const addEvmAccount = () => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({
			method: 'addEvmAccount',
			argus: {
				index: accountState.nextAccountIndex,
			}
		});
	});
};

export const handleAddEvmAccount = async () => {
		let res: signerResponseType | null = null;
		res = (await addEvmAccount()) as signerResponseType | null;
		if (res?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			const newAccount = res.data as Account;
			accountState.accountList = [...accountState.accountList, newAccount];
			accountState.currentAccountIndex = settings.nextAccountIndex;
			accountState.nextAccountIndex++;
			settings.currentAccountIndex = settings.nextAccountIndex;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
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