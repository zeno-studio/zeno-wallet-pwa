import {type Settings, defaultSettings } from "$lib/wallet/common";
import { accountState} from "$lib/wallet/runes";
import  {userlocale,getLanguage,availableLanguages} from "$lib/ui/runes";    


export const createSettings = async () =>{
     const settings  = localStorage.getItem('settings')
    if (settings !== null) {
        const data  = JSON.parse(settings) as Settings;
        const initialTheme = data.darkMode;
            if (initialTheme) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
            }
        accountState().setCurrentAccountIndex(data.currentAccountIndex);
        userlocale().locale = data.locale;
        
    } else {
        const systemLanguage = getLanguage();
        if (availableLanguages.has(systemLanguage)) {
            userlocale().locale = systemLanguage;
            const newSettings= {...defaultSettings, locale: systemLanguage};
            localStorage.setItem('settings', JSON.stringify(newSettings));
        }
        else {userlocale().locale = 'en';
            const newSettings= {...defaultSettings, locale: 'en'};
            localStorage.setItem('settings', JSON.stringify(newSettings));
        };

      

    }

}

