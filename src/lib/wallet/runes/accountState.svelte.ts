import { DB, editElement, removeElement,getElement,type Settings,type Account} from '$lib/wallet/common';
import { goto } from '$app/navigation';

class AccountState {
    isBackup = $state(false);
    currentAccountIndex = $state(0);
    nextAccountIndex = $state(1);
    nextPolkadotIndex = $state(101);
    accountList = $state<Account[]>([]);
    editingAccountIndex = $state(0);
    editingAccount = $derived.by(() => {
        return this.accountList.find(a => a.accountIndex === this.editingAccountIndex);
    });
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
        if (this.editingAccountIndex !== 0) {
            removeElement(DB.Account.name, this.editingAccountIndex);
        }
        this.accountList = this.accountList.filter(a => a.accountIndex !== this.editingAccountIndex);
        this.setCurrentAccountIndex(this.accountList[0].accountIndex);
        goto('/#/setting/account_manage');
    }

    async getAccountList() {
        try {
            const accounts = await getElement(DB.Account.name, "all");
            if (accounts) {
                this.accountList = accounts as Account[];
            }
        } catch (error) {
            console.error('Failed to get account list:', error);
        }
    }
    hiddenAccounts() {
        if (!this.editingAccount) return;
        this.editingAccount.isHidden = !this.editingAccount.isHidden;
        const account =$state.snapshot(this.editingAccount);
        if (account) {
            editElement(DB.Account.name, account);
            this.accountList = this.accountList.map(a => a.accountIndex === this.editingAccountIndex ? account : a);
        }
    }

}

export const accountState = new AccountState();
