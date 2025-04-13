import { DB, type Chain,type Settings} from '$lib/wallet/common';
import { getElement,addElement, editElement } from '$lib/wallet/common';



export const AdditionalChains = new Map<number, Chain>([]);

class ChainState {
	currentCurrency = $state<string>("USD");
	currentChain = $state<Chain|null>(null);

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

export const chainState = new ChainState();
