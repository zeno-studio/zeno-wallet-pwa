import { generalState } from '$lib/wallet/runes';
import {decimalAdjust } from '$lib/ui/ts';

export type FiatName = 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'KRW' | 'RUB';
export type CurrencyName = 'BTC' | 'ETH' | 'DOT';



export const getBalanceByFiat = (balances: number) => {
	if (generalState.currentFiat.name === 'USD') {
		return balances.toFixed(2);
	} else {
		const fiat = generalState.currentFiat.name as FiatName;
		const fiatRate = generalState.fiatRate ?? null;
		if (!fiatRate) {
			return 'not available';
		}
		if (fiatRate && fiatRate[fiat]) {
			return (balances * fiatRate[fiat]).toFixed(2);
		}
		return balances.toFixed(2);
	}
};

export const getBalanceByCurrency = (balances: number) => {
	const currency = generalState.currentCurrency as CurrencyName;
	const prices = generalState.currencyPrice ?? null;
	if (!prices) {
		return 'not available';
	}
	if (prices && prices[currency]) {
		const currencyPrice = prices[currency].toFixed(0);
		const bit = currencyPrice.toString().length + 1;
		return (balances / prices[currency]).toFixed(bit);
	}
};

export const getQuntityByPrice = (balances: number, prices: number) => {
	let currencyPrice: number;
	let bit: number;
	if (!prices || prices < 0.01) {
        return balances
	} 
    else {
		currencyPrice = Number(prices.toFixed(0));
		bit = currencyPrice.toString().length + 2;
		return decimalAdjust ("floor",balances,-bit);
	}
};
