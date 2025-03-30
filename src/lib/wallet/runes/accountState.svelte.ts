import { dbStore, editElement, removeElement,getElement,type Settings,type Account} from '$lib/wallet/common';
import { goto } from '$app/navigation';

class AccountState {
    isBackup = $state(false);
    currentAccountIndex = $state(0);
    nextAccountIndex = $state(1);
    nextPolkadotIndex = $state(101);
    nextEvmAddressIndex = $state(0);
    nextPolkadotAddressIndex = $state(0);
    accountList = $state<Account[]>([]);
    editingAccountIndex = $state(0);
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

    deleteAccount() {
        if (this.currentAccountIndex !== 0) {
            removeElement(dbStore.Account.name, this.currentAccountIndex);
        }
        this.accountList = this.accountList.filter(a => a.accountIndex !== this.currentAccountIndex);
        this.setCurrentAccountIndex(this.accountList[0].accountIndex);
        goto('/#/setting/account_manage');
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
    hiddenAccounts() {
        const account =$state.snapshot(this.currentAccount);
        if (account) {
            account.isHidden = !account.isHidden;
            editElement(dbStore.Account.name, account);
            this.accountList = this.accountList.map(a => a.accountIndex === this.currentAccountIndex ? account : a);
        }
    }

}

export const accountState = new AccountState();
