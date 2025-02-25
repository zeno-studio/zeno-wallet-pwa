import { type Chain } from '$lib/wallet/common';
import { getElement, addElement, editElement } from '$lib/wallet/common';
import {
	westend,
	base,
	bsc,
	ethereum,
	optimism,
	polygon,
	sonic,
} from '$lib/wallet/common';

export const defaultChains = new Map<number, Chain>([
	[base.id, base],
	[bsc.id, bsc],
	[ethereum.id, ethereum],
	[optimism.id, optimism],
	[polygon.id, polygon],
	[sonic.id, sonic],
	[westend.id, westend],
]);

export type chainStore = {
	id: number;
	chains: Map<number, Chain>;
}

class ChainState {
	currentChain = $state(westend);
	chains = $state(defaultChains);
	constructor() {}

	async initChains() {
		const storedChains = await getElement('chains', 1) 
        if (!storedChains) {
			const data = {id: 1, chains: defaultChains};
            addElement('chains', data);
        }
		const storedCurrentChain = localStorage.getItem('currentChain');
        if (!storedCurrentChain) {
            localStorage.setItem('currentChain', JSON.stringify(this.currentChain));
        }
		if (storedCurrentChain) {
			this.currentChain = JSON.parse(storedCurrentChain) as Chain;
		}
	}

	setCurrentChain(chain: Chain) {
		this.currentChain = chain;
		localStorage.setItem('currentChain', JSON.stringify(chain));
	}

	async addChain(chain: Chain) {
        try {
            const storedChains = await getElement('chains', 1) as chainStore | null;
            if (storedChains) {
             const newChains = {id:1, chains:  storedChains.chains.set(chain.id, chain)};
                editElement('chains', newChains );
            } else {
				editElement('chains', {id:1,chains:defaultChains.set(chain.id, chain)});
            }
        } catch (error) {
            console.error('Failed to add chain:', error);
        }
    }

	async removeChain(chain: Chain) {
	const storedChains = await getElement('chains', 1) as chainStore | null;
	if (storedChains) {
		if (storedChains.chains.delete(chain.id)) {
			editElement('chains', storedChains);
			console.log('Chain removed successfully');
		} 
		else {	
			console.error('Failed to remove chain');
		}
	}

	}
}

export const chainState = new ChainState();
