import {type ERC20Asset,type CurrencyAsset,type Fiat} from '$lib/wallet/common';

const usd :Fiat = {
    name: "USD",
    symbol: "$",
    iconPath: "/fiat/usd.svg",
}

const eur :Fiat = {
    name: "EUR",
    symbol: "€",
    iconPath: "/fiat/eur.svg",
}

const gbp :Fiat = {
    name: "GBP",
    symbol: "£",
    iconPath: "/fiat/gbp.svg",
}

const jpy :Fiat = {
    name: "JPY",
    symbol: "¥",
    iconPath: "/fiat/jpy.svg",
}

const cny :Fiat = {
    name: "CNY",
    symbol: "¥",
    iconPath: "/fiat/cny.svg",
}

const krw :Fiat = {
    name: "KRW",
    symbol: "₩",
    iconPath: "/fiat/krw.svg",
}

const rub :Fiat = {
    name: "RUB",
    symbol: "₽",
    iconPath: "/fiat/rub.svg",
}

export const fiats = new Set<Fiat> ([
    usd,
    eur,
    gbp,    
    jpy,
    cny,
    krw,
    rub,
])



export const wnd:CurrencyAsset = {  
    chainId: 420420421,
    type: "currency",
    decimals: 18,
    iconPath: "/token/dot.svg",
    symbol: "WND",
    name: 'West',
};

export const eth:CurrencyAsset = {
    chainId: 1,
    type: "currency",
    decimals: 18,
    iconPath: "/token/eth.svg",
    symbol: "ETH",
    name: 'Ether',
};

export const pol :CurrencyAsset = {
    chainId: 137,
    type: "currency",
    decimals: 18,
    iconPath: "/token/pol.svg",
    symbol: "POL",
    name: "POL",
};

export const bnb :CurrencyAsset = {
    chainId: 56,
    type: "currency",
    decimals: 18,
    iconPath: "/token/bnb.svg",
    symbol: "BNB",
    name: "Binance Coin",
}

export const eth_op :CurrencyAsset = {
    chainId: 10,
    type: "currency",
    decimals: 18,
    iconPath: "/token/eth.svg",
    symbol: "ETH",
    name: 'Ether',
};

export const eth_arbitrum :CurrencyAsset = {
    chainId: 42161,
    type: "currency",
    decimals: 18,
    iconPath: "/token/eth.svg",
    symbol: "ETH",
    name: 'Ether',
};

export const eth_base :CurrencyAsset = {
    chainId: 8453,
    type: "currency",
    decimals: 18,
    iconPath: "/token/eth.svg",
    symbol: "ETH",
    name: 'Ether',
};


export const usdt:ERC20Asset = {
    chainId: 1,
    type: "erc-20",
    decimals: 6,
    iconPath: "/token/usdt.svg",
    symbol: "USDT",
    name: 'Tether USD',
    contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
};

export const usdc:ERC20Asset = {
    chainId: 1,
    type: "erc-20",
    decimals: 6,
    iconPath: "/token/usdc.svg",
    symbol: "USDC",
    name: 'USD Coin',
    contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
};

export const dai:ERC20Asset = {
    chainId: 1,
    type: "erc-20",
    decimals: 18,
    iconPath: "/token/dai.svg",
    symbol: "DAI",
    name: 'Dai Stablecoin',
    contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
};

export const weth:ERC20Asset = {
    chainId: 1,
    type: "erc-20",
    decimals: 18,
    iconPath: "/token/weth.svg",
    symbol: "WETH",
    name: 'Wrapped Ether',
    contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
};

export const wbtc:ERC20Asset = {
    chainId: 1,
    type: "erc-20",
    decimals: 8,
    iconPath: "/token/wbtc.svg",
    symbol: "WBTC",
    name: 'Wrapped Bitcoin',
    contract: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
};


export const ethereumTonkens = new Map<string, ERC20Asset> ([
    [wbtc.contract, wbtc],
    [weth.contract, weth],
    [dai.contract, dai],
    [usdc.contract, usdc],
    [usdt.contract, usdt],
]
);

export const westendTonkens = new Map<string, ERC20Asset> ([

]);

export const baseTonkens = new Map<string, ERC20Asset> ([

]);



export const Currencies = new Map<number, CurrencyAsset> ([
    [420420421, wnd],
    [1, eth],
    [137, pol],
    [56, bnb],
    [10, eth_op],
    [42161, eth_arbitrum],
    [8453, eth_base],
]
);
