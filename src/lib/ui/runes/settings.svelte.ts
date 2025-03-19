import {
	type Settings,
	defaultSettings,
	dbStore,
	getElement,
	type Chain
} from '$lib/wallet/common';
import { accountState, chainState, setAutoLock, setTime } from '$lib/wallet/runes';
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
		setTime(data.timeLock);
		setAutoLock(data.autoLock);
		accountState.currentAccountIndex = data.currentAccountIndex;
		accountState.nextAccountIndex = data.nextAccountIndex;
		accountState.nextPolkadotIndex = data.nextPolkadotIndex;
		accountState.nextWatchAccountIndex = data.nextWatchAccountIndex;

		// intialize additionalChains
		const Chains = ((await getElement(dbStore.AdditionalChain.name, 'all')) as Chain[]) || [];
		if (Chains.length > 0) {
			chainState.additionalChains = new Map(Chains.map((chain) => [chain.chainId, chain]));
		}

		// intialize fiat
		chainState.currentFiat = data.fiat;

		// intialize locale
		userlocale.locale = data.locale;
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
	}
};
