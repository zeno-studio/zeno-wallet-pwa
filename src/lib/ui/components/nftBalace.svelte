<script lang="ts">
	import { accountState, generalState,queriedData  } from '$lib/wallet/runes';
	import { Modal, NftDetail } from '$lib/ui/components';
	import { DefaultChains, rpcIntervalMsNft } from '$lib/wallet/common';
	import {
		getNftBalancesByAnkr,
		mapAnkrChainNameToLocal,
		mapAnkrChainNameToChainId,
		type Nft
	} from '$lib/wallet/provider';

	import { Loading} from '$lib/svg';
	import { cutString } from '$lib/ui/ts';



	let nftByChain = $derived.by(() => {
		if (generalState.currentChain === null) {
			return queriedData.ankrNftBalances ?? [];
		}
		const nfts = queriedData.ankrNftBalances?.filter(
			(asset) => mapAnkrChainNameToLocal(asset.blockchain) === generalState.currentChain?.name
		);
		return nfts ?? [];
	});
	let loading = $state(false);
	let modal = $state(false);
	let settingModal = $state(false);

	$effect(() => {
		const fetchBalances = async () => {
			if (!accountState.currentAccount) {
				queriedData.ankrNftBalances = null;
				return;
			}
			loading = true;
			let balances:Nft[]=[];
			let nextPageToken = '';

			try {
				do {
					const result = await getNftBalancesByAnkr(
						DefaultChains,
						accountState.currentAccount?.address,
						nextPageToken
					);
					if (result) {
						balances = [...balances, ...(result.assets ?? [])];
						nextPageToken = result.nextPageToken ?? '';
					} else {
						nextPageToken = '';
					}
				} while (nextPageToken !== '');
			} finally {
				loading = false;
				queriedData.ankrNftBalances = balances 
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
	{#if loading }
		<div class="loading"><Loading class="icon3B" /></div>
	{/if}
	{#each nftByChain ?? [] as asset}
		<button class="nft-container" onclick={() => (modal = true)}>
			{#if !asset.imageUrl}
				<img class="thumbnail" src="/nft/nft-placeholder.svg" alt="" />
			{:else}
				<img
					class="thumbnail"
					src={asset.imageUrl}
					loading="lazy"
					onerror={(e) => ((e.target as HTMLImageElement).src = '/nft/nft-placeholder.svg')}
					alt=""
				/>
			{/if}
			{#if generalState.currentChain === null}
				<img
					class="nft-chain"
					src={`/chain/${mapAnkrChainNameToChainId(asset.blockchain)}.svg`}
					alt=""
				/>
			{/if}

			{#if !asset.collectionName}
				<div class="nft-title">unknown</div>
			{:else}
				<div class="nft-title">{cutString(asset.collectionName, 12)}</div>
			{/if}

			<div class="nft-tokenId">#{cutString(asset.tokenId, 8)}</div>
		</button>
	{/each}
	

</div>

{#if !queriedData.ankrNftBalances || queriedData.ankrNftBalances.length === 0}
		<div class="loading">No NFTs found</div>
	{/if}
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
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		height: 100%;
		width: 100%;
		gap: 1rem;
		margin-bottom: 1rem;
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
		margin: 0;
		padding: 0;
		cursor: pointer;
	}
	.nft-container:hover {
		transform: translateY(2px);
	}
	.nft-title {
		font-size: 1.2rem;
		font-family: 700;
		color: var(--text);
		margin-left: 2rem;
	}
	.nft-chain {
		position: absolute;
		top: 55%;
		right: 1rem;
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
