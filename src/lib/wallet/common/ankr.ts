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
    return chains.map(chain => {
        switch (chain.name) {
            case 'Ethereum':
                return 'eth' as Blockchain;
            case 'BNB Smart Chain':
                return 'bsc' as Blockchain;;
            case 'Base':
                return 'base' as Blockchain;
            case 'Arbitrum One':
                return 'arbitrum' as Blockchain;
            case 'Polygon':
                return 'polygon' as Blockchain;
            case 'OP Mainnet':
                return 'optimism' as Blockchain; 
            default:
                throw new Error(`Unknown chain name: ${chain.name}`);
        }
    });
}

