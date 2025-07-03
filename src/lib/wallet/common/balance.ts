import { accountState, chainState ,generalState} from '$lib/wallet/runes';

export type FiatName = 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'KRW' | 'RUB';
export type CurrencyName = 'BTC' | 'ETH' | 'DOT';

export const getBalanceByFiat = (balances:number) => {
    if (generalState.currentFiat.name === 'USD') {
        return balances.toFixed(2)
    } else {
        const fiat = generalState.currentFiat.name as FiatName;
        const fiatRate = generalState.fiatRate ?? null;
        if (fiatRate && fiatRate[fiat]) {    
            return (balances * fiatRate[fiat]).toFixed(2);
        }
        return balances.toFixed(2); 
    }

}  

export const getBalanceByCurrency = (balances:number) => {
        const currency = generalState.currentCurrency as CurrencyName;
        const prices = generalState.currencyPrice ?? null;
        if (prices && prices[currency]) {    
            const currencyPrice = prices[currency].toFixed(0);
            const bit = currencyPrice.toString().length+1;
            return (balances / prices[currency]).toFixed(bit);
        }
        return "not available"; 
  
}
  