
import {
	type Blockchain,
	type GetAccountBalanceReply,
	type GetNFTsByOwnerReply,
	type GetTransactionsByAddressReply,
	type Transaction

} from '$lib/wallet/provider';
import {
	functionSelectors,
	contractMetadata,
	type Chain
} from '$lib/wallet/common';


import { PUBLIC_ANKR_API_KEY  } from '$env/static/public';

export const getTokenBalancesByAnkr = async (chains: Chain[], address: string) => {
	try {
		const response = await fetch(`https://rpc.ankr.com/multichain/${PUBLIC_ANKR_API_KEY }`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: 1,
				jsonrpc: '2.0',
				method: 'ankr_getAccountBalance',
				params: {
					blockchain: mapLocalChainNameToAnkr(chains),
					walletAddress: address,
					nativeFirst: true
				}
			})
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return (json.result as GetAccountBalanceReply) ?? null;
	} catch (error: any) {
		console.error(error.message);
	}
};

export const getNftBalancesByAnkr = async (chains: Chain[], address: string, pageToken: string) => {
	// return await ankrAdvancedApiProvider.getNFTsByOwner({
	// 	blockchain: mapLocalChainNameToAnkr(chains),
	// 	walletAddress: address,
	// 	pageSize: 50,
	// 	pageToken: pageToken
	// });
	try {
		const response = await fetch(`https://rpc.ankr.com/multichain/${PUBLIC_ANKR_API_KEY }`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: 1,
				jsonrpc: '2.0',
				method: 'ankr_getNFTsByOwner',
				params: {
					blockchain: mapLocalChainNameToAnkr(chains),
					walletAddress: address,
					pageSize: 50,
					pageToken: pageToken
				}
			})
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return (json.result as GetNFTsByOwnerReply) ?? null;
	} catch (error: any) {
		console.error(error.message);
	}
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


export const getActivityByAnkr = async (chains: Chain[], address: string, days: number, pageToken: string) => {
	try {
		const response = await fetch(`https://rpc.ankr.com/multichain/${PUBLIC_ANKR_API_KEY }`, {
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
					descOrder: true, //(布尔值)：选择数据顺序，降序（如果true）或升序（如果false）
					pageToken: pageToken, // 分页令牌
					pageSize: 50, // 每页大小
				}
			})
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return (json.result as GetTransactionsByAddressReply) ?? null;
	} catch (error: any) {
		console.error(error.message);
	}
};

export const parseAnkrActivities = async (
	activities: Transaction[]
): Promise<
	Array<{
		hash: string;
		type: string;
		description: string;
		signature?: string;
		standard?: string;
	}>
> => {
	const results: Array<{
		hash: string;
		type: string;
		description: string;
		signature?: string;
		standard?: string;
	}> = [];

	for (const activity of activities) {
		const { input, value, to, hash } = activity;

		// 步骤 1：判断 Native Transfer
		if (value !== '0x0' && (!input || input === '0x')) {
			results.push({
				hash,
				type: 'Native Transfer',
				description: `Transfer ${parseInt(value, 16) / 1e18} ${activity.blockchain.toUpperCase()} to ${to}`
			});
			continue;
		}

		// 步骤 2：处理 Execute Contract
		if (!input || input === '0x') {
			results.push({
				hash,
				type: 'Contract Call',
				description: 'Unknown contract call'
			});
			continue;
		}

		const selector = input.slice(0, 10); // 提取前 4 字节
		const matches = functionSelectors.filter((item) => item.selector === selector);

		if (!matches.length) {
			results.push({
				hash,
				type: 'Contract Call',
				description: 'Unknown contract call'
			});
			continue;
		}

		// 步骤 3：检查 to 地址的合约类型
		let standard = 'Unknown';
		const contractInfo = contractMetadata[to.toLowerCase()];
		if (contractInfo) {
			standard = contractInfo.standard;
		} else {
			// 可选：链上查询 supportsInterface（需要 Web3 实例）
			// 为了简化，这里假设未知合约优先 ERC-20
		}

		// 步骤 4：处理重复选择器
		const match = matches.find((m) => m.standard === standard) || matches[0];
		let description = match.description;

		// 步骤 5：针对 ERC-20 转账，解析金额和代币
		if (
			match.standard === 'ERC-20' &&
			selector === '0xa9059cbb' &&
			contractInfo?.decimals &&
			contractInfo?.symbol
		) {
			// 解析 transfer(address,uint256) 的参数
			const params = web3.eth.abi.decodeParameters(['address', 'uint256'], input.slice(10));
			const amount = Number(params[1]) / 10 ** contractInfo.decimals;
			description = `Transfer ${amount.toFixed(2)} ${contractInfo.symbol} to ${params[0]}`;
		}

		results.push({
			hash,
			type: `${match.standard} ${match.description.split(' ')[0]}`,
			description,
			signature: match.signature,
			standard: match.standard
		});
	}

	return results;
};
