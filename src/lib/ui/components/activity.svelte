<script lang="ts">
	
	import { accountState, chainState, generalState } from '$lib/wallet/runes';
	import { metadata } from '$lib/ui/runes';
	import { AnkrProvider, type Blockchain, type GetNFTsByOwnerReply,type Nft } from '@ankr.com/ankr.js';
	import {
		DefaultChains,
		getTokenBalances,
		rpcIntervalMsNft,
		getBalanceByFiat,
		getNftBalances,
		mapAnkrChainNameToLocal,
        getData
	} from '$lib/wallet/common';

	let nftRes: any  | null = $state(null);


	// const nftFilterByChain = () => {
	// 	nftByChain = (nftRes?.assets ?? []).filter((asset) => {
	// 		if (chainState.currentChain?.name === mapAnkrChainNameToLocal(asset.blockchain)) {
	// 			nftByChain = [...nftByChain, asset];
	// 		}
	// 	});
	// };


	$effect(() => {
		const fetchBalances = async () => {
			if (!accountState.currentAccount) {
				nftRes = null;
				return;
			}
			if (chainState.currentChain === null) {
				const result = await  getData(
					DefaultChains,
					accountState.currentAccount?.address
				);
				nftRes = result ?? null;
				console.log(result);
			} else {
				const result = await getData(
					[chainState.currentChain],
					accountState.currentAccount?.address
				);
				nftRes = result ?? null;
				console.log(result);
			}
		};

		fetchBalances().catch(console.error);
		const intervalId = setInterval(async () => {
			fetchBalances().catch(console.error);
		}, rpcIntervalMsNft);
		return () => clearInterval(intervalId);
	});
</script>

<div class="grid-container">
	{#each nftRes?.transactions ?? [] as asset}
			<div class="nft-container">
				<img class="thumbnail" src={asset.imageUrl} alt={asset.collectionName} />
			</div>	
	{/each}
	</div>

<style>
	/* balance */
	.tokenList {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
		width: 100%;
		background: none;
		border: none;
	}

	.nft-container {
		aspect-ratio: 1 / 1;
		position: relative;
		padding: 0.25rem;
		border-radius: 0.75rem;
		background: none;
		border-radius: 2rem;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		grid-auto-rows: minmax(15rem, auto);
		height: 100%;
		width: 100%;
		gap: 1rem;
	}


	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 2rem;
	}


</style>
