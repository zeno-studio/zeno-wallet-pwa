import { type Settings, getElement, dbStore ,type Account} from '$lib/wallet/common';



class AccountState {
	currentAccountIndex = $state(0);
	nextAccountIndex = $state(1);
	nextPolkadotIndex = $state(21);
	nextWatchAccountIndex = $state(31);
	accountList = $state<number[]>([]);
	accountListDetail = $derived.by(async () => {
		const detail:Account[] = []
		await Promise.all(this.accountList.map(async (element) => {
			const account = await getElement(dbStore.Account.name, element) as Account | null;
			if (account) detail.push(account);
		}));
		return detail;
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
