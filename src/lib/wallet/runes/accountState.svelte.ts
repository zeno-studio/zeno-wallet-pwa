import { dbStore, editElement, getElement,type Settings,type Account} from '$lib/wallet/common';

class AccountState {
    isBackup = $state(false);
    currentAccountIndex = $state(0);
    nextAccountIndex = $state(1);
    nextPolkadotIndex = $state(13);
    nextEvmAddressIndex = $state(0);
    nextPolkadotAddressIndex = $state(0);
    nextWatchAccountIndex = $state(16);
    accountList = $state<Account[]>([]);
    currentAccount = $derived.by(() => {
        return this.accountList.find(a => a.accountIndex === this.currentAccountIndex);
    });

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

    hiddenAccounts(index: number) {
        this.accountList[index].isHidden = !this.accountList[index].isHidden;
        editElement(dbStore.Account.name, this.accountList[index]);
    }

}

export const accountState = new AccountState();
