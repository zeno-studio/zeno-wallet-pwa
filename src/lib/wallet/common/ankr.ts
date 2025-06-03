// npm install @ankr.com/ankr.js
import { AnkrProvider,type Blockchain,type GetAccountBalanceReply } from '@ankr.com/ankr.js';
import {ANKR_API_KEY, DefaultChains, type Chain, } from '$lib/wallet/common';

// Setup provider AnkrProvider
const ankrAdvancedApiProvider = new AnkrProvider(`https://rpc.ankr.com/multichain/${ANKR_API_KEY}`);

// Get token balances of address with USD prices among multiple chains
export const getAddressBalances = async (chains: Chain[],address:string) => {
    return await ankrAdvancedApiProvider.getAccountBalance({
        blockchain: mapAnkrChainName(chains),
        walletAddress: address,
    });
};



export const mapAnkrChainName = (chains: Chain[]): Blockchain[] => {
    // Example implementation: map Chain objects to their blockchain name property
    const result: Blockchain[] = [];
    for (const chain of chains) {
        if (!chain) {
            throw new Error("Chain is null or undefined");
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
}

