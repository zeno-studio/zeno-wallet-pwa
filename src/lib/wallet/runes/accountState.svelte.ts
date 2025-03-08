import { type Settings, getElement, dbStore } from '$lib/wallet/common';

class AccountState {
	timeLock = $state(1000 * 60 * 5);
	currentAccountIndex = $state(0);
	currentWatchAccountIndex = $state(0);
	currentAccount = $derived.by(async () => {
		if (this.currentAccountIndex === 0) return null;
		else return await getElement(dbStore.Account.name, this.currentAccountIndex);
	});

	currentWatchAccount = $derived.by(async () => {
		if (this.currentWatchAccountIndex === 0) return null;
		else return await getElement(dbStore.Account.name, this.currentWatchAccountIndex);
	});

	setTimeLock(lock: number) {
		this.timeLock = lock;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, timeLock: lock };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} else {
			throw new Error('No settings found');
		}
	}
	setCurrentAccountIndex(accountIndex: number) {
		this.currentAccountIndex = accountIndex;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, currentAccountIndex: accountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} else {
			throw new Error('No settings found');
		}
	}
	setCurrentWatchAccountIndex(accountIndex: number) {
		this.currentWatchAccountIndex = accountIndex;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, currentWatchAccountIndex: accountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} else {
			throw new Error('No settings found');
		}
	}
}

export const accountState = new AccountState();
