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
	testnet: true
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
          blockCreated: 5022,
        },
      },
	testnet: false,
  logoPath: '/chain/base.svg'
};


export const ethereum: Chain = {
    chainId: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'eth', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        http: ['https://eth.merkle.io'],
    },
    blockExplorers: {
        url: ['https://etherscan.io'],

    },
    contracts: {
        multicall3: {
          address: '0xca11bde05977b3631167028862be2a173976ca11',
          blockCreated: 14353601,
        },
      },
    testnet: false,
    logoPath: '/chain/ethereum.svg'
};

  export const optimism : Chain = {
    chainId: 10,
    name: 'OP Mainnet',
    nativeCurrency: { name: 'eth_op', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        http: ['https://mainnet.optimism.io'],

    },
    blockExplorers: {
        url: ['https://optimistic.etherscan.io'],
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 4286263,
      },
    },
    testnet: false,
    logoPath: '/token/op.svg'
  }

  export const bsc : Chain = {
    chainId: 56,
    name: 'BNB Smart Chain',
    nativeCurrency: { decimals: 18,name: 'bnb',symbol: 'BNB',},
    rpcUrls: {
      http: ['https://rpc.ankr.com/bsc'] 
    },
    blockExplorers: {
        url: ['https://bscscan.com'],
     },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 15921452,
      },
    },
    testnet: false,
    logoPath: '/token/bnb.svg'
  }

  export const polygon : Chain ={
    chainId: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'pol', symbol: 'POL', decimals: 18 },
    rpcUrls: {
        http: ['https://polygon-rpc.com'],
    },
    blockExplorers: {
        url: ['https://polygonscan.com'],
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 25770160,
      },
    },
    testnet: false,
    logoPath: '/chain/polygon.svg'
  }

  export const sonic : Chain = {
    chainId: 146,
    name: 'Sonic',
    nativeCurrency: {
      decimals: 18,
      name: 'sonic',
      symbol: 'S',
    },
    rpcUrls: {
      http: ['https://rpc.soniclabs.com']
    },
    blockExplorers: {
        url: ['https://sonicscan.org/'],
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 60,
      },
    },
    testnet: false,
    logoPath: '/chain/sonic.svg'
  }

  export const arbitrum : Chain = {
    chainId: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'eth_arbitrum', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        http: ['https://arb1.arbitrum.io/rpc'],

    },
    blockExplorers: {
        url: ['https://arbiscan.io'],
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 7654707,
      },
    },
    testnet: false,
    logoPath: '/token/arb.svg'
  }

  export const moonbeam : Chain = {
    chainId: 1284,
    name: 'Moonbeam',
    nativeCurrency: { name: 'glmr', symbol: 'GLMR', decimals: 18 },
    rpcUrls: {
        http: ['https://rpc.api.moonbeam.network'],
    },
    blockExplorers: {
        url: ['https://moonbeam.moonscan.io'],
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1100000,
      },
    },
    testnet: false
  }



  //https://github.com/wevm/viem/tree/main/src/chains/definitions
