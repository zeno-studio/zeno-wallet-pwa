import {getElement } from "$lib/wallet/common";


export interface AccountConfig {
    currentAccountIndex:number;
    accountIndex: number;
    evmAddressIndex: number;
    polkadotAddressIndex: number;
}

const initAccountConfig: AccountConfig ={
    currentAccountIndex: 0,
    accountIndex: 0,
    evmAddressIndex: 0,
    polkadotAddressIndex: 0,
};



class AccountState {
    accountConfig  =$state(initAccountConfig);
    currentAccountInfo =  $derived.by(async () => {
        if (this.accountConfig.currentAccountIndex === 0) {
            return null;
        }else{
            const info = await getElement('accountList', this.accountConfig.currentAccountIndex) as AccountInfo;
            return info;
        }
	});
    constructor() {
    }

    initAccountConfig() {
       const data = localStorage.getItem('accountConfig');
        if (data) {
            this.accountConfig = JSON.parse(data).currentAccount;
        } else {
            localStorage.setItem('accountConfig', JSON.stringify(this.accountConfig));
        } 
    }
    setAccountConfig(config: AccountConfig) {
        this.accountConfig=config
    }

}

export const accountState = new AccountState();


