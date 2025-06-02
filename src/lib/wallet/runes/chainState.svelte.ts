import { DB, type Chain, type Settings } from '$lib/wallet/common';
import { getElement, addElement, editElement, DefaultChains } from '$lib/wallet/common';

class ChainState {
	currentFiat = $state<string>("USD");
	currentCurrency = $state<string>("ETH");
	currentChain = $state<Chain |null>(null);
	Chains = $state<Chain[]>(DefaultChains);

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

	setCurrentChain(Id: number) {
		const chain = this.Chains.find((e) => e.chainId === Id);
		this.currentChain = chain ?? null
	}

	initChains() {
		DefaultChains.map(i => addElement(DB.Chains.name, i))
	}

	async getChains() {
		this.Chains = (await getElement(DB.Chains.name, "all")) as Chain[];
	}

	updateRpcUrl(endpoint: string, type: "http" | "ws"): void {
		if (!this.currentChain) {
			throw new Error("No chain selected");
		}
	
		const rpcUrls = this.currentChain.rpcUrls;
		switch (type) {
			case "http":
				rpcUrls.http.custom = endpoint;
				break;
			case "ws":
				rpcUrls.webSocket = rpcUrls.webSocket ?? {};
				rpcUrls.webSocket.custom = endpoint;
				break;
			default:
				throw new Error(`Unknown type: ${type}`);
		}
		this.Chains = [...this.Chains, this.currentChain];
		editElement(DB.Chains.name, this.currentChain);
	}
}

export const chainState = new ChainState();
