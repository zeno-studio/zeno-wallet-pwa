// npm install @ankr.com/ankr.js
import { AnkrProvider, type Blockchain, type GetAccountBalanceReply } from '@ankr.com/ankr.js';
import { ANKR_API_KEY, DefaultChains, type Chain } from '$lib/wallet/common';

// Setup provider AnkrProvider
const ankrAdvancedApiProvider = new AnkrProvider(`https://rpc.ankr.com/multichain/${ANKR_API_KEY}`);

// Get token balances of address with USD prices among multiple chains
export const getTokenBalancesByAnkr = async (chains: Chain[], address: string) => {
	return await ankrAdvancedApiProvider.getAccountBalance({
		blockchain: mapLocalChainNameToAnkr(chains),
		walletAddress: address,
		nativeFirst: true
		// onlyWhitelisted:false //only show tokens listed on CoinGekko (true) or all the tokens (false). Default — tru
	});
};

export const getNftBalancesByAnkr = async (chains: Chain[], address: string, pageToken: string) => {
	return await ankrAdvancedApiProvider.getNFTsByOwner({
		blockchain: mapLocalChainNameToAnkr(chains),
		walletAddress: address,
		pageSize: 50,
		pageToken: pageToken
	});
};

export const getTxByHashByAnkr = async (hash: string) => {
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
			case 'Sepolia':
				result.push('eth_sepolia' as Blockchain);
				break;
			default:
				throw new Error(`Unknown chain name: ${chain.name}`);
		}
	}
	return result;
};

export const mapLocalChainNameToAnkrSingle = (chain: Chain): Blockchain => {
	// Example implementation: map Chain objects to their blockchain name property
	let result: Blockchain;
	switch (chain.name) {
		case 'Ethereum':
			return (result = 'eth' as Blockchain);
		case 'BNB Smart Chain':
			return (result = 'bsc' as Blockchain);
		case 'Base':
			return (result = 'base' as Blockchain);
		case 'Arbitrum One':
			return (result = 'arbitrum' as Blockchain);
		case 'Polygon':
			return (result = 'polygon' as Blockchain);
		case 'OP Mainnet':
			return (result = 'optimism' as Blockchain);
		case 'Sepolia':
			return (result = 'eth_sepolia' as Blockchain);
		default:
			throw new Error(`Unknown chain name: ${chain.name}`);
	}
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
		case 'eth_sepolia':
			return 'Sepolia';
		default:
			throw new Error(`Unknown chain name: ${chain}`);
	}
};

export const mapAnkrChainNameToChainId = (chain: Blockchain): number => {
	if (!chain) {
		throw new Error('Chain is null or undefined');
	}
	switch (chain) {
		case 'eth':
			return 1;
		case 'bsc':
			return 56;
		case 'base':
			return 8453;
		case 'arbitrum':
			return 42161;
		case 'polygon':
			return 137;
		case 'optimism':
			return 10;
		case 'eth_sepolia':
			return 11155111;
		default:
			throw new Error(`Unknown chain name: ${chain}`);
	}
};

export type ankrActivityReply = {
	transactions: [
		{
			blockHash: string;
			blockNumber: string;
			blockchain: string;
			cumulativeGasUsed: string;
			from: string;
			gas: string;
			gasPrice: string;
			gasUsed: string;
			hash: string;
			input: string;
			nonce: string;
			r: string;
			s: string;
			status: string;
			timestamp: string;
			to: string;
			transactionIndex: string;
			type: string;
			v: string;
			value: string;
		}
	];
};

export const getActivityByAnkr = async (chains: Chain[], address: string, days: number) => {
	try {
		const response = await fetch(`https://rpc.ankr.com/multichain/${ANKR_API_KEY}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: 1,
				jsonrpc: '2.0',
				method: 'ankr_getTransactionsByAddress',
				params: {
					blockchain: mapLocalChainNameToAnkr(chains),
					address: address,
					fromTimestamp: Math.floor((Date.now() - days * 24 * 60 * 60 * 1000) / 1000), // last 30 days
					descOrder:true //(布尔值)：选择数据顺序，降序（如果true）或升序（如果false）
				}
			})
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return (json.result as ankrActivityReply) ?? null;
	} catch (error:any) {
		console.error(error.message);
	}
};
