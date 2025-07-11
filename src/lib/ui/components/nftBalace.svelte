<script lang="ts">
	import { accountState, generalState } from '$lib/wallet/runes';
	import {Modal,NftDetail} from '$lib/ui/components';
	import {
		type GetNFTsByOwnerReply,
		type Nft
	} from '@ankr.com/ankr.js';
	import {
		DefaultChains,
		rpcIntervalMsNft,
		getNftBalancesByAnkr,
		mapAnkrChainNameToLocal,
		mapAnkrChainNameToChainId
	} from '$lib/wallet/common';
	import {Loading} from '$lib/svg';
	import {cutString} from '$lib/ui/ts';

	let nftRes: Nft[] | null = $state(null);
	let nftByChain = $derived.by(() => {
		if (generalState.currentChain === null) {
			return nftRes ?? [];
			}
		const nfts = nftRes?.filter(asset => mapAnkrChainNameToLocal(asset.blockchain) === generalState.currentChain?.name);
		return nfts ?? [];
	});
	let loading = $state(false);
	let modal = $state(false);


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
					const result: GetNFTsByOwnerReply = await getNftBalancesByAnkr(
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

	{#if loading}
		<div class="loading"><Loading class="icon3B" /></div>
	{/if}
	{#each nftByChain  ?? [] as asset}
		<button class="nft-container" onclick={() =>modal = true}> 
			{#if !asset.imageUrl}
				<img class="thumbnail" src="/nft/nft-placeholder.svg"  alt="" />
				{:else}
				<img class="thumbnail" src={asset.imageUrl} loading="lazy" onerror={(e) => (e.target as HTMLImageElement).src = '/nft/nft-placeholder.svg'} alt="" />
			{/if}
			{#if generalState.currentChain === null}
				
					<img class="nft-chain" src={`/chain/${mapAnkrChainNameToChainId(asset.blockchain)}.svg`} alt="" />
			
			{/if}

			{#if !asset.collectionName}
				<div class="nft-title"> unknown</div>
				{:else}
				<div class="nft-title"> {cutString(asset.collectionName,12)}</div>
			{/if}

			<div class="nft-tokenId"> #{cutString(asset.tokenId,12)}</div>
		</button>
	{/each}
</div>

<Modal bind:modalName={modal} mode="full">
	<NftDetail />
</Modal>

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 5rem;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		height: 100%;
		width: 100%;
		gap: 1rem;
	}
	.nft-container {
		aspect-ratio: 1 / 1.25;
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: flex-start;
		background: var(--bg2);
		border-radius: 2rem;
		border: none;
		margin:0;
		padding: 0;
		cursor: pointer;
	}
	.nft-container:hover {
		background: var(--bg3);
	}
	.nft-title {
		font-size: 1.4rem;
		font-family: 700;
		color: var(--text);
		margin-left: 2rem;
	}
	.nft-chain{
		position: absolute;
		top:63%;
		right:1rem;
		height: 15%;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		border: 3px solid var(--bg2);
	}
	.nft-tokenId {
		font-size: 1.4rem;
		font-family: 700;
		color: var(--color);
		margin-left: 2rem;
		margin-bottom: 1rem;
	}

	.thumbnail {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 2rem;
		margin-bottom: 1rem;
	}
	

	
</style>
