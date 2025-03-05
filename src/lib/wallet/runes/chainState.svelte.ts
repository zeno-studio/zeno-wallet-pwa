import { dbStore, type Chain, type Settings } from '$lib/wallet/common';
import {  addElement, editElement } from '$lib/wallet/common';
import { westend, base, bsc, ethereum, optimism, polygon, sonic } from '$lib/wallet/common';

export const DefaultChains = new Map<number, Chain>([
	[base.chainId, base],
	[bsc.chainId, bsc],
	[ethereum.chainId, ethereum],
	[optimism.chainId, optimism],
	[polygon.chainId, polygon],
	[sonic.chainId, sonic]
]);

export const AdditionalChains = new Map<number, Chain>([]);

class ChainState {
	currentChain = $state(westend);
	additionalChains = $state(AdditionalChains);

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
