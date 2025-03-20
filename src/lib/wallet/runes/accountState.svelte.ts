import { type Settings, getElement, dbStore ,type Account} from '$lib/wallet/common';

class AccountState {
	currentAccountIndex = $state(0);
	nextAccountIndex = $state(1);
	nextPolkadotIndex = $state(11);
	nextWatchAccountIndex = $state(21);
	currentAccount = $derived.by(async () => {
		if (this.currentAccountIndex === 0 ) return null;
		else return await getElement(dbStore.Account.name, this.currentAccountIndex) as Account | null;
	});


	setCurrentAccountIndex(accountIndex: number) {
		if (accountIndex>33) throw new Error('Exceeds the maximum number of accounts');
		this.currentAccountIndex = accountIndex;
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data) as Settings;
			const newSettings = { ...settings, currentAccountIndex: accountIndex };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} 
	}

}

export const accountState = new AccountState();
