import {
	usd,
	DefaultChains,
	type Settings,
	type Fiat,
	type FiatRate,
	type CurrencyPrice,
	type Chain
} from '$lib/wallet/common';

class GeneralState {
	autoLockTimer = $state(15);
	isLocked = $state(true);
	isAutoLock = $state(true);
	currentFiat = $state<Fiat>(usd);
	fiatRate = $state<FiatRate | null>(null);
	currentCurrency = $state<string>('ETH');
	currencyPrice = $state<CurrencyPrice | null>(null);
	currentChain = $state<Chain | null>(null);
	currentChainId = $derived.by(() => {
		if (this.currentChain === null) {
			return 0;
		}
		return this.currentChain.chainId;
	});
	setFiat(fiat: Fiat) {
		this.currentFiat = fiat;
		const settings = localStorage.getItem('settings');
		if (settings) {
			const data = JSON.parse(settings) as Settings;
			data.fiat = fiat.name;
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
	setCurrentChain(Id: number) {
		const chain = DefaultChains.find((e) => e.chainId === Id);
		this.currentChain = chain ?? null;
	}
}

export const generalState = new GeneralState();
