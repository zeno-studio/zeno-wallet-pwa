import {
	type Settings,
	defaultSettings,
} from '$lib/wallet/common';
import { accountState, chainState,setTimer, generalState } from '$lib/wallet/runes';
import { userlocale, getLanguage, availableLanguages } from '$lib/ui/runes';
import {} from '$lib/wallet/runes';

export const createSettings = async () => {
	const settings = localStorage.getItem('settings');
	if (settings) {
		const data = JSON.parse(settings) as Settings;
		// intialize theme
		const initialTheme = data.darkMode;
		if (initialTheme) {
			document.body.setAttribute('data-theme', 'dark');
		} else {
			document.body.setAttribute('data-theme', 'light');
		}
		// intialize account
		
		accountState.isBackup = data.isBackup;
		accountState.currentAccountIndex = data.currentAccountIndex;
		accountState.nextAccountIndex = data.nextAccountIndex;
		accountState.nextPQAccountIndex = data.nextPQAccountIndex;
		await accountState.getAccountList();

		// intialize currency
		chainState.currentCurrency = data.currency;
		chainState.currentFiat = data.fiat;

		// intialize locale
		userlocale.locale = data.locale;

		// intialize generalState
		setTimer(data.autoLockTimer);
		generalState.autoLockTimer = data.autoLockTimer;
		generalState.isAutoLock = data.autoLock;
	}

	if (!settings) {
		const systemLanguage = getLanguage();
		if (availableLanguages.has(systemLanguage)) {
			userlocale.locale = systemLanguage;
			const newSettings = { ...defaultSettings, locale: systemLanguage };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		} else {
			userlocale.locale = 'en';
			const newSettings = { ...defaultSettings, locale: 'en' };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		}
		chainState.initChains() 
	}
};
