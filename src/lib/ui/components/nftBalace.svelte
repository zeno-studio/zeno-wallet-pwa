<script lang="ts">
	import { accountState, chainState, generalState } from '$lib/wallet/runes';
	import { metadata } from '$lib/ui/runes';
	import {
		AnkrProvider,
		type Blockchain,
		type GetNFTsByOwnerReply,
		type Nft
	} from '@ankr.com/ankr.js';
	import {
		DefaultChains,
		getTokenBalances,
		rpcIntervalMsNft,
		getBalanceByFiat,
		getNftBalances,
		mapAnkrChainNameToLocal
	} from '$lib/wallet/common';
	import { page } from '$app/state';

	let nftRes: Nft[] | null = $state(null);
	let nftByChain = $derived.by(() => {
		if (chainState.currentChain === null) {
			return nftRes ?? [];
			}
		const nfts = nftRes?.filter(asset => mapAnkrChainNameToLocal(asset.blockchain) === chainState.currentChain?.name);
		return nfts ?? [];
	});
	let loading = $state(false);

	const getNftThumbnail = (asset: Nft) => {
		if (!asset.imageUrl) {
			return "";
		} 
		return asset.imageUrl;	
	};

	$effect(() => {
		const fetchBalances = async () => {
			if (!accountState.currentAccount) {
				nftRes = null;
				return;
			}
			loading = true;
			nftRes = [];
			let nextPageToken = '';

			try {
				do {
					const result: GetNFTsByOwnerReply = await getNftBalances(
						DefaultChains,
						accountState.currentAccount?.address,
						nextPageToken
					);
					nftRes = [...nftRes, ...(result.assets ?? [])];
					nextPageToken = result.nextPageToken ?? '';
				} while (nextPageToken !== '');
			} finally {
				loading = false;
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
	{#each nftByChain  ?? [] as asset}
		<div class="nft-container">
			<img class="thumbnail" src={getNftThumbnail(asset)} alt="" />
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
