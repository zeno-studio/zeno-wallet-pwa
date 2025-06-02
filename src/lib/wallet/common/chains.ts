import { type Chain } from '$lib/wallet/common';

export const westend: Chain = {
	chainId: 420420421,
	name: 'Westend Asset Hub',
	nativeCurrency: { name: 'wnd', symbol: 'WND', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://westend-asset-hub-eth-rpc.polkadot.io'
		}
	},
	blockExplorers: 'https://westend.subscan.io',
  testnet: true,
};

export const base: Chain = {
	chainId: 8453,
	name: 'Base',
	nativeCurrency: { name: 'eth_base', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://mainnet.base.org'
		}
	},
	blockExplorers: 'https://basescan.org',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 5022
	},
  testnet: false,
};

export const ethereum: Chain = {
	chainId: 1,
	name: 'Ethereum',
	nativeCurrency: { name: 'eth', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://eth.merkle.io'
		}
	},
	blockExplorers: 'https://etherscan.io',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 14353601
	},
  testnet: false,
};

export const optimism: Chain = {
	chainId: 10,
	name: 'OP Mainnet',
	nativeCurrency: { name: 'eth_op', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://mainnet.optimism.io'
		}
	},
	blockExplorers: 'https://optimistic.etherscan.io',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 4286263
	},
  testnet: false,
};

export const bsc: Chain = {
	chainId: 56,
	name: 'BNB Smart Chain',
	nativeCurrency: { decimals: 18, name: 'bnb', symbol: 'BNB' },
	rpcUrls: {
		http: {
			public: 'https://rpc.ankr.com/bsc'
		}
	},
	blockExplorers: 'https://bscscan.com',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 15921452
	},
  testnet: false,
};

export const polygon: Chain = {
	chainId: 137,
	name: 'Polygon',
	nativeCurrency: { name: 'pol', symbol: 'POL', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://polygon-rpc.com'
		}
	},
	blockExplorers: 'https://polygonscan.com',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 25770160
	},
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
		http: {
			public: 'https://rpc.soniclabs.com'
		}
	},
	blockExplorers: 'https://sonicscan.org',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 60
	},
  testnet: false,
};

export const arbitrum: Chain = {
	chainId: 42161,
	name: 'Arbitrum One',
	nativeCurrency: { name: 'eth_arbitrum', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://arb1.arbitrum.io/rpc'
		}
	},
	blockExplorers: 'https://arbiscan.io',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 7654707
	},
  testnet: false,
};

export const sepolia: Chain = {
	chainId: 11155111,
	name: 'Sepolia',
	nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		http: {
			public: 'https://sepolia.drpc.org'
		}
	},
	blockExplorers: 'https://sepolia.etherscan.io',
	multicall3: {
		address: '0xca11bde05977b3631167028862be2a173976ca11',
		blockCreated: 751532
	},
  testnet: true,
};

export const DefaultChains :Chain[] = [ethereum,arbitrum, base, bsc, optimism, polygon];

export const DefaultTestnetChains:Chain[] =[westend,sepolia]

//https://github.com/wevm/viem/tree/main/src/chains/definitions
