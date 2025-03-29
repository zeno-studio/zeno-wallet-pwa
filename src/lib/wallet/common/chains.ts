import { type Chain } from '$lib/wallet/common';

export const westend: Chain = {
	chainId: 420420421,
	name: 'Westend',
	nativeCurrency: { name: 'wnd', symbol: 'WND', decimals: 18 },
	rpcUrls: {
		http: ['https://westend-asset-hub-eth-rpc.polkadot.io']
	},
	blockExplorers: {
		url: ['https://westend.subscan.io']
	},
	logoPath: '',
  testnet: true,
};

export const base: Chain = {
	chainId: 8453,
	name: 'Base',
	nativeCurrency: { name: 'eth_base', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: ['https://mainnet.base.org']
	},
	blockExplorers: {
		url: ['https://basescan.org']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 5022
		}
	},
	logoPath: '/chain/base.svg',
  testnet: false,
};

export const ethereum: Chain = {
	chainId: 1,
	name: 'Ethereum',
	nativeCurrency: { name: 'eth', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: ['https://eth.merkle.io']
	},
	blockExplorers: {
		url: ['https://etherscan.io']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 14353601
		}
	},
	logoPath: '/chain/ethereum.svg',
  testnet: false,
};

export const optimism: Chain = {
	chainId: 10,
	name: 'OP Mainnet',
	nativeCurrency: { name: 'eth_op', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: ['https://mainnet.optimism.io']
	},
	blockExplorers: {
		url: ['https://optimistic.etherscan.io']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 4286263
		}
	},
	logoPath: '/token/op.svg',
  testnet: false,
};

export const bsc: Chain = {
	chainId: 56,
	name: 'BNB Smart Chain',
	nativeCurrency: { decimals: 18, name: 'bnb', symbol: 'BNB' },
	rpcUrls: {
		http: ['https://rpc.ankr.com/bsc']
	},
	blockExplorers: {
		url: ['https://bscscan.com']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 15921452
		}
	},
	logoPath: '/token/bnb.svg',
  testnet: false,
};

export const polygon: Chain = {
	chainId: 137,
	name: 'Polygon',
	nativeCurrency: { name: 'pol', symbol: 'POL', decimals: 18 },
	rpcUrls: {
		http: ['https://polygon-rpc.com']
	},
	blockExplorers: {
		url: ['https://polygonscan.com']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 25770160
		}
	},
	logoPath: '/chain/polygon.svg',
  testnet: false,
};

export const sonic: Chain = {
	chainId: 146,
	name: 'Sonic',
	nativeCurrency: {
		decimals: 18,
		name: 'sonic',
		symbol: 'S'
	},
	rpcUrls: {
		http: ['https://rpc.soniclabs.com']
	},
	blockExplorers: {
		url: ['https://sonicscan.org/']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 60
		}
	},
	logoPath: '/chain/sonic.svg',
  testnet: false,
};

export const arbitrum: Chain = {
	chainId: 42161,
	name: 'Arbitrum One',
	nativeCurrency: { name: 'eth_arbitrum', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: ['https://arb1.arbitrum.io/rpc']
	},
	blockExplorers: {
		url: ['https://arbiscan.io']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 7654707
		}
	},
	logoPath: '/token/arb.svg',
  testnet: false,
};

export const sepolia: Chain = {
	chainId: 11_155_111,
	name: 'Sepolia',
	nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: ['https://sepolia.drpc.org']
	},
	blockExplorers: {
		url: ['https://sepolia.etherscan.io']
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 751532
		}
	},
	logoPath: '',
  testnet: true,
};

export const DefaultChains :Chain[] = [ethereum,arbitrum, base, bsc, optimism, polygon, sonic];

export const DefaultTestnetChains:Chain[] =[westend,sepolia]

//https://github.com/wevm/viem/tree/main/src/chains/definitions
