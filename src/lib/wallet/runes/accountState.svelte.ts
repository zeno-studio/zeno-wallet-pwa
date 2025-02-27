import { type Account,type Settings,getElement } from "$lib/wallet/common";


export const accountState = () => {
    let currentAccountIndex = $state(0);
    const currentAccount = $derived.by(async () => {
        if (currentAccountIndex === 0) return null;
        else return await getElement('accountList', currentAccountIndex) as Account | null;
    })

    $effect(() => {
        (async () => {
            const savedSettings = localStorage.getItem('settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings) as Settings;
                const resolvedAccount = await currentAccount as Account | null;
                const newSettings = {...settings, currentAccountIndex: resolvedAccount ? resolvedAccount.accountIndex : 0};
                localStorage.setItem('settings', JSON.stringify(newSettings));
            }
        })();
    });

    return {
        setCurrentAccountIndex: (accountIndex: number) => {
           currentAccountIndex = accountIndex;
           const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}')
           const newSettings = {...savedSettings, currentAccountIndex: accountIndex};
           localStorage.setItem('settings', JSON.stringify(newSettings));
        },
        currentAccount,
        currentAccountIndex
    }

    
}





