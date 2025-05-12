import Signer from '$lib/wallet/worker/signer.ts?worker';
import { accountState } from '$lib/wallet/runes';
import { getElement, DB, type Vault, type Account, type Settings ,type KeyringType} from '$lib/wallet/common';

export const signer = new Signer();

export const closeSigner = ()=> signer.terminate();


export type signerResponseType = {
	success: boolean;
	data?: any;
	error?: string;
};

export type signerRequestType = {
	method: string;
	argus?: any;
};

export const isLocked=() =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'isLocked' });
	});
	
}

export const lockSigner=() => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'lockSigner' });
	});
}

export const unLockSigner=(password: string) => {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'unLockSigner', argus: { password: password } });
	});
}

export const setAutoLockWithpass=(autoLock: boolean, password: string) => {
	signer.postMessage({ method: 'setAutoLockWithpass', argus: { autoLock, password } });
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data);
		settings.autoLock = autoLock;
		localStorage.setItem('settings', JSON.stringify(settings));
	}
};

export const handleSetAutoLockWithpass=(autoLock: boolean,password:string) =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		setAutoLockWithpass(autoLock,password);
	});
}

export const setAutoLock = (autoLock: boolean) => {
	signer.postMessage({ method: 'setAutoLock', argus: { autoLock } });
	const data = localStorage.getItem('settings');
	if (data) {
		const settings = JSON.parse(data);
		settings.autoLock = autoLock;
		localStorage.setItem('settings', JSON.stringify(settings));
	}
};


export const handleSetAutoLock=(autoLock: boolean) =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		setAutoLock(autoLock);
	});
}



export const setTimer=(time: number)=> {
	signer.postMessage({ method: 'setTime', argus: { time: time } });
	const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			settings.timeLock = time;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	
}

export const handleSetTimer=(time: number) =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		setTimer(time);
	});
}

export const queryTimer=() =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'queryTimer' });
	});
}



export const signTransaction=(argus: any)=> {
	signer.postMessage({ method: 'signEvmTx', argus });
}

// test function need delete
export const queryMid=()=> {
	signer.postMessage({ method: 'queryMid' });
}

export const handleAddEvmAccount=async()=> {
	const result = (await addEvmAccount()) as signerResponseType | null;
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

const addEvmAccount=()=>{
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

export const handleAddEvmAccountWithPassword=async(password: string)=> {
	const result = (await addEvmAccountPassword(password)) as signerResponseType | null;
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

const addEvmAccountPassword=(password: string)=> {
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


const addPolkadotAccount=(type: KeyringType) =>{
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

export const handleAddPolkadotAccount=async(type: KeyringType) =>{
	const result = (await addPolkadotAccount(type)) as signerResponseType | null;
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

const addPolkadotAccountPassword=(password: string, type: KeyringType) =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data); // 接收 Worker 返回的结果
		};		signer.postMessage({
			method: 'addPolkadotAccountWithPassword',
			argus: {
				index: accountState.nextPolkadotIndex,
				type: type,
				password: password,
				
			}
		});
	});
}

export const handleAddPolkadotAccountWithPassword=async(password: string, type: KeyringType) =>{
	const result = (await addPolkadotAccountPassword(password, type)) as signerResponseType | null;
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

export const checkPassword=(password: string)=> {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'checkPassword', argus: { password: password } });
	});
}

export const checkIsLocked=()=> {
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'isAutoLock' });
	});
}

export const changePassword=(oldPassword: string, newPassword: string) =>{
	return new Promise((resolve) => {
		signer.onmessage = (event) => {
			resolve(event.data);
		};
		signer.postMessage({ method: 'changePassword', argus: { oldPassword: oldPassword, newPassword: newPassword } });
	});
}

