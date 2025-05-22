import {type Token} from '../common';
export const wnd:Token = {  
    chainId: 420420421,
    type: "currency",
    decimals: 18,
    symbol: "WND",
    name: 'West',
};

export const eth:Token = {
    chainId: 1,
    type: "currency",
    decimals: 18,
    symbol: "ETH",
    name: 'Ether',
};

export const pol :Token = {
    chainId: 137,
    type: "currency",
    decimals: 18,
    symbol: "POL",
    name: "POL",
};

export const bnb :Token = {
    chainId: 56,
    type: "currency",
    decimals: 18,
    symbol: "BNB",
    name: "Binance Coin",
}

export const eth_op :Token = {
    chainId: 10,
    type: "currency",
    decimals: 18,
    symbol: "ETH",
    name: 'Ether',
};

export const eth_arbitrum :Token = {
    chainId: 42161,
    type: "currency",
    decimals: 18,
    symbol: "ETH",
    name: 'Ether',
};

export const eth_base :Token = {
    chainId: 8453,
    type: "currency",
    decimals: 18,
    symbol: "ETH",
    name: 'Ether',
};


export const usdt:Token = {
    chainId: 1,
    type: "erc-20",
    decimals: 6,
    symbol: "USDT",
    name: 'Tether USD',
    contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
};

export const usdc:Token = {
    chainId: 1,
    type: "erc-20",
    decimals: 6,
    symbol: "USDC",
    name: 'USD Coin',
    contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
};

export const dai:Token = {
    chainId: 1,
    type: "erc-20",
    decimals: 18,
    symbol: "DAI",
    name: 'Dai Stablecoin',
    contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
};

export const weth:Token = {
    chainId: 1,
    type: "erc-20",
    decimals: 18,
    symbol: "WETH",
    name: 'Wrapped Ether',
    contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
};

export const wbtc:Token = {
    chainId: 1,
    type: "erc-20",
    decimals: 8,
    symbol: "WBTC",
    name: 'Wrapped Bitcoin',
    contract: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
};


export const ethereumTonkens = new Set<Token> ([
    eth,
    wbtc,
    weth,
    dai,
    usdc,
    usdt,
]);

export const westendTonkens = new Set<Token> ([
    wnd,
]);

export const baseTonkens = new Set<Token> ([
    eth_base,
]);


export const DefaultCurrencies = ["BTC","ETH","DOT"];

