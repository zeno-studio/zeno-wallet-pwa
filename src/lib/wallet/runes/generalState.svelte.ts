import { type Settings, type FiatRate,type CurrencyPrice } from '$lib/wallet/common';

class GeneralState {
	autoLockTimer = $state(15);
	isLocked = $state(true);
	isAutoLock = $state(true);
	currentFiat = $state<string>('USD');
	fiatRate = $state<FiatRate | null>(null);
	currentCurrency = $state<string>('ETH');
	currencyPrice = $state<CurrencyPrice | null>(null);
	setFiat(currency: string) {
		this.currentFiat = currency;
		const settings = localStorage.getItem('settings');
		if (settings) {
			const data = JSON.parse(settings) as Settings;
			data.currency = currency;
			localStorage.setItem('settings', JSON.stringify(data));
		}
	}
	setCurrency(currency: string) {
		this.currentCurrency = currency;
		const settings = localStorage.getItem('settings');
		if (settings) {
			const data = JSON.parse(settings) as Settings;
			data.currency = currency;
			localStorage.setItem('settings', JSON.stringify(data));
		}
	}
}

export const generalState = new GeneralState();
