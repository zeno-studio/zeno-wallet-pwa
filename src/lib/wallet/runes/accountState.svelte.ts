import { type Account, type WatchAccount, type Settings, getElement } from '$lib/wallet/common';

export const accountState = () => {
	let timeLock = $state(1000 * 60 * 5);
	let currentAccountIndex = $state(0);
	const currentAccount = $derived.by(async () => {
		if (currentAccountIndex === 0) return null;
		else
			return await getElement('accountList', currentAccountIndex).then(
				(account) => account as Account
			);
	});
	let currentWatchAccountIndex = $state(0);
	const currentWatchAccount = $derived.by(async () => {
		if (currentWatchAccountIndex === 0) return null;
		else
			return await getElement('accountList', currentWatchAccountIndex).then(
				(account) => account as WatchAccount
			);
	});

	return {
		timeLock,
		currentAccountIndex,
		currentAccount,
		currentWatchAccountIndex,
		currentWatchAccount,
		setTimeLock: (lock: number) => {
			timeLock = lock;
			const savedSettings = localStorage.getItem('settings');
			if (savedSettings) {
				const settings = JSON.parse(savedSettings) as Settings;
				const newSettings = { ...settings, timeLock: lock };
				localStorage.setItem('settings', JSON.stringify(newSettings));
			} else {
				throw new Error('No settings found');
			}
		},
		setCurrentAccountIndex: (accountIndex: number) => {
			currentAccountIndex = accountIndex;
			const savedSettings = localStorage.getItem('settings');
			if (savedSettings) {
				const settings = JSON.parse(savedSettings) as Settings;
				const newSettings = { ...settings, currentAccountIndex: accountIndex };
				localStorage.setItem('settings', JSON.stringify(newSettings));
			} else {
				throw new Error('No settings found');
			}
		},
		setCurrentWatchAccountIndex: (accountIndex: number) => {
			currentWatchAccountIndex = accountIndex;
			const savedSettings = localStorage.getItem('settings');
			if (savedSettings) {
				const settings = JSON.parse(savedSettings) as Settings;
				const newSettings = { ...settings, currentWatchAccountIndex: accountIndex };
				localStorage.setItem('settings', JSON.stringify(newSettings));
			} else {
				throw new Error('No settings found');
			}
		}
	};
};
