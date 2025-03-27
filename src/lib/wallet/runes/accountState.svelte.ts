import { dbStore, getElement,type Settings,type Account} from '$lib/wallet/common';

class AccountState {
    currentAccountIndex = $state(0);
    nextAccountIndex = $state(1);
    nextPolkadotIndex = $state(13);
    nextEvmAddressIndex = $state(0);
    nextPolkadotAddressIndex = $state(0);
    nextWatchAccountIndex = $state(16);
    accountList = $state<Account[]>([]);
    
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
        try {
            const accounts = await getElement(dbStore.Account.name, "all");
            if (accounts) {
                this.accountList = accounts as Account[];
            }
        } catch (error) {
            console.error('Failed to get account list:', error);
        }
    }

}

export const accountState = new AccountState();
