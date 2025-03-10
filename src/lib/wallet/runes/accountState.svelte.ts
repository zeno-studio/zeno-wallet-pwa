import { type Settings, getElement, dbStore } from '$lib/wallet/common';

class AccountState {
	autoLock = $state(true);
	timeLock = $state(1000 * 60 * 5);
	currentAccountIndex = $state(0);
	currentWatchAccountIndex = $state(0);
	nextAccountIndex = $state(0);
	nextWatchAccountIndex = $state(0);
	currentAccount = $derived.by(async () => {
		if (this.currentAccountIndex === 0) return null;
		else return await getElement(dbStore.Account.name, this.currentAccountIndex);
	});

	currentWatchAccount = $derived.by(async () => {
		if (this.currentWatchAccountIndex === 0) return null;
		else return await getElement(dbStore.Account.name, this.currentWatchAccountIndex);
	});

	setAutoLock(lock: boolean) {
		this.autoLock = lock;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {			
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, autoLock: lock };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} 
	}

	setTimeLock(lock: number) {
		this.timeLock = lock;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, timeLock: lock };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} 
	}
	setCurrentAccountIndex(accountIndex: number) {
		this.currentAccountIndex = accountIndex;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, currentAccountIndex: accountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} 
	}
	setCurrentWatchAccountIndex(accountIndex: number) {
		this.currentWatchAccountIndex = accountIndex;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, currentWatchAccountIndex: accountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		}
	}
	setNextAccountIndex() {
		this.nextAccountIndex +=1;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, nextAccountIndex: this.nextAccountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		}
	}
	setNextWatchAccountIndex() {
		this.nextWatchAccountIndex +=1;
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings) as Settings;
			const newSettings = { ...settings, nextWatchAccountIndex: this.nextWatchAccountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		}
	}

}

export const accountState = new AccountState();
