import { dbStore, type Chain,type Settings} from '$lib/wallet/common';
import { getElement,addElement, editElement } from '$lib/wallet/common';



export const AdditionalChains = new Map<number, Chain>([]);

class ChainState {
	currentFiat = $state<string>("USD");
	currentChain = $state<Chain|null>(null);
	additionalChains = $state(AdditionalChains);

	setFiat(fiat: string) {
		this.currentFiat = fiat;
		const settings = localStorage.getItem('settings');
		if (settings) {
			const data = JSON.parse(settings) as Settings;
			data.fiat = fiat;
			localStorage.setItem('settings', JSON.stringify(data));
		}
		
	}
	async getAdditionalChains(){
		const Chains = ((await getElement(dbStore.AdditionalChain.name, 'all')) as Chain[]) || [];
		if (Chains.length > 0) {
			chainState.additionalChains = new Map(Chains.map((chain) => [chain.chainId, chain]));
		}
	}

	async addChain(chain: Chain) {
		addElement(dbStore.AdditionalChain.name, chain);
		this.additionalChains.set(chain.chainId, chain);
		const settings = localStorage.getItem('settings');
		if (settings) {
			const data = JSON.parse(settings) as Settings;
			data.additionalChains.push(chain.chainId);
			localStorage.setItem('settings', JSON.stringify(data));
		}
	}
	async removeChain(chain: Chain) {
		this.additionalChains.delete(chain.chainId);
		const settings = localStorage.getItem('settings');
		if (settings) {
			const data = JSON.parse(settings) as Settings;
			data.additionalChains = data.additionalChains.filter((id) => id !== chain.chainId);
			localStorage.setItem('settings', JSON.stringify(data));
		}
	}

	async editChain(chain: Chain) {
		editElement(dbStore.AdditionalChain.name, chain);
		this.additionalChains.set(chain.chainId, chain);
	}
}

export const chainState = new ChainState();
