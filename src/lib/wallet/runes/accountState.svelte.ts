import { dbStore, getElement,type Settings,type Account} from '$lib/wallet/common';
import { SvelteMap } from 'svelte/reactivity';

class AccountState {
    currentAccountIndex = $state(0);
    nextAccountIndex = $state(1);
    nextPolkadotIndex = $state(13);
    nextEvmAddressIndex = $state(0);
    nextPolkadotAddressIndex = $state(0);
    nextWatchAccountIndex = $state(16);
    accountList = $state(new SvelteMap<number, Account>());
    
    setCurrentAccountIndex(accountIndex: number) {
        this.currentAccountIndex = accountIndex;
        const data = localStorage.getItem('settings');
        if (data) {
            const settings = JSON.parse(data) as Settings;
            const newSettings = { ...settings, currentAccountIndex: accountIndex };
            localStorage.setItem('settings', JSON.stringify(newSettings));
        } 
    }

    async getAccountList() {
		const accountList = (await getElement(dbStore.Account.name, "all")) as Account[];
		this.accountList = new SvelteMap(accountList.map((account) => [account.accountIndex, account]));
	}

}

export const accountState = new AccountState();
