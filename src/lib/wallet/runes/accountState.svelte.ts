import Account from '$lib/svg/account.svelte';
import { dbStore, getElement, type Settings} from '$lib/wallet/common';



class AccountState {
	currentAccountIndex = $state(0);
	nextAccountIndex = $state(1);
	nextPolkadotIndex = $state(21);
	nextEvmAddressIndex = $state(0);
	nextPolkadotAddressIndex = $state(0);
	nextWatchAccountIndex = $state(31);
	accountList = $state<number[]>([]);
	
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
