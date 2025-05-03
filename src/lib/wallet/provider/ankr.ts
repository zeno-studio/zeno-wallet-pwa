import {ANKR_KEY} from '$lib/wallet/common';
import {accountState} from '$lib/wallet/runes';
import { AnkrProvider } from '@ankr.com/ankr.js';
import type { GetAccountBalanceReply, GetNFTsByOwnerReply, GetNFTMetadataReply } from '@ankr.com/ankr.js/dist/types';
import type { Blockchain } from '@ankr.com/ankr.js/dist/types';

export const ankrAdvanced = new AnkrProvider(`https://rpc.ankr.com/multichain/${ANKR_KEY}`);
const listOfChains: Blockchain[] = ['eth', 'base','arbitrum', 'bsc', 'optimism','polygon'];

export const getBalance=async(chains:Blockchain[])=>{
    const addr = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

    await ankrAdvanced.getAccountBalance({
        blockchain: chains,
        walletAddress: addr
    }).then((response) => {
        return response.assets;
    });
}


export const getNFTs = async(): Promise<GetNFTsByOwnerReply> => {
    const addr = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

    return await ankrAdvanced.getNFTsByOwner({
        blockchain: listOfChains,
        walletAddress: addr
    });
}

export const getNFTMetadata=async(): Promise<GetNFTMetadataReply> => {
    const addr = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

    return await ankrAdvanced.getNFTMetadata({
        blockchain: listOfChains[0],
        contractAddress: addr,
        tokenId: addr,
        forceFetch: true
    });
}

