// npm install @ankr.com/ankr.js
import { AnkrProvider, type Blockchain, type GetAccountBalanceReply } from '@ankr.com/ankr.js';
import { ANKR_API_KEY, DefaultChains, type Chain } from '$lib/wallet/common';

// Setup provider AnkrProvider
const ankrAdvancedApiProvider = new AnkrProvider(`https://rpc.ankr.com/multichain/${ANKR_API_KEY}`);

// Get token balances of address with USD prices among multiple chains
export const getTokenBalances = async (chains: Chain[], address: string) => {
	return await ankrAdvancedApiProvider.getAccountBalance({
		blockchain: mapLocalChainNameToAnkr(chains),
		walletAddress: address,
		nativeFirst: true,
	});
};

export const getNftBalances = async (chains: Chain[], address: string,pageToken:string) => {
	return await ankrAdvancedApiProvider.getNFTsByOwner({
		blockchain: mapLocalChainNameToAnkr(chains),
		walletAddress: address,
		pageSize: 50,
		pageToken: pageToken,
	});
};

export const getTxData = async (hash: string) => {
	return await ankrAdvancedApiProvider.getTransactionsByHash({
		transactionHash: hash,
		decodeTxData: true
	});
};

export const mapLocalChainNameToAnkr = (chains: Chain[]): Blockchain[] => {
	// Example implementation: map Chain objects to their blockchain name property
	const result: Blockchain[] = [];
	for (const chain of chains) {
		if (!chain) {
			throw new Error('Chain is null or undefined');
		}
		switch (chain.name) {
			case 'Ethereum':
				result.push('eth' as Blockchain);
				break;
			case 'BNB Smart Chain':
				result.push('bsc' as Blockchain);
				break;
			case 'Base':
				result.push('base' as Blockchain);
				break;
			case 'Arbitrum One':
				result.push('arbitrum' as Blockchain);
				break;
			case 'Polygon':
				result.push('polygon' as Blockchain);
				break;
			case 'OP Mainnet':
				result.push('optimism' as Blockchain);
				break;
			default:
				throw new Error(`Unknown chain name: ${chain.name}`);
		}
	}
	return result;
};

export const mapAnkrChainNameToLocal = (chain: Blockchain): string => {
	// Example implementation: map Chain objects to their blockchain name property

	if (!chain) {
		throw new Error('Chain is null or undefined');
	}
	switch (chain) {
		case 'eth':
			return 'Ethereum';
		case 'bsc':
			return 'BNB Smart Chain';
		case 'base':
			return 'Base';
		case 'arbitrum':
			return 'Arbitrum One';
		case 'polygon':
			return 'Polygon';
		case 'optimism':
			return 'OP Mainnet';
		default:
			throw new Error(`Unknown chain name: ${chain}`);
	}
};



export const getData=async(chains: Chain[], address: string)=> {
  try {
    const response = await fetch(`https://rpc.ankr.com/multichain/${ANKR_API_KEY}`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: JSON.stringify({
		id: 1,
		jsonrpc: '2.0',
		method: 'ankr_getTransactionsByAddress',
		params: {
			blockchain: mapLocalChainNameToAnkr(chains),
			address: address,
		}
	})
});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}