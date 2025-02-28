import { type Chain, type chainStore, type chainStoreType } from '$lib/wallet/common';
import { getElement,addElement, editElement } from '$lib/wallet/common';
import { westend, base, bsc, ethereum, optimism, polygon, sonic } from '$lib/wallet/common';

export const DefaultChains = new Map<number, Chain>([
	[base.id, base],
	[bsc.id, bsc],
	[ethereum.id, ethereum],
	[optimism.id, optimism],
	[polygon.id, polygon],
	[sonic.id, sonic]
]);

export const AddedChains = new Map<number, Chain>([[westend.id, westend]]);

export const chainState = () => {
	let currentChain = $state(westend);
	const defaultChains = $state(DefaultChains);
	const addedChains = $state(AddedChains);
	return {
		currentChain,
		defaultChains,
		addedChains,
		setCurrentChain(chain: Chain) {
			currentChain = chain;
			return true;
		},
		async initChainStore() {
			const d = await getElement('chainList', "defaultChains") ;
			if (!d) {
				addElement('chainList', { name: 'defaultChains', chains: DefaultChains });
			}

			const a = await getElement('chainList', "addedChains");
			if (!a) {
				addElement('chainList', { name: 'addedChains', chains: AddedChains });
			}
		},
		async addChain(chain: Chain, type: chainStoreType) {
			const storedChains = (await getElement('chainList', type)) as chainStore | null;
			if (storedChains) {
				const newChains = { name: type, chains: storedChains.chains.set(chain.id, chain) };
				editElement('chainList', newChains);
			} else {
				if (type === 'defaultChains') {
					editElement('defaultChains', { name: type, chains:DefaultChains.set(chain.id, chain) });
				}
				if (type === 'addedChains') {
					editElement('chainList', { name: type, chains: AddedChains.set(chain.id, chain) });
				}
			}
		},

		async removeChain(chain: Chain, type: chainStoreType) {
			const storedChains = (await getElement('chainList', type)) as chainStore | null;
			if (storedChains) {
				if (storedChains.chains.delete(chain.id)) {
					editElement('chainList', storedChains);
					console.log('Chain removed successfully');
				} else {
					console.error('Failed to remove chain');
				}
			}
		}
	};
};
