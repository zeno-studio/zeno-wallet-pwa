<script lang="ts">
	import { accountState, generalState,queriedData } from '$lib/wallet/runes';
	import { type Blockchain } from '$lib/wallet/provider';
	import { DefaultChains, rpcIntervalMsNft } from '$lib/wallet/common';
	import {
		mapAnkrChainNameToLocal,
		getActivityByAnkr,
		type Transaction
	} from '$lib/wallet/provider';
	import { Loading } from '$lib/svg';

	let loading = $state(false);
	let days = $state(365); // Default to last 365 days

	let activityByChain = $derived.by(() => {
		if (generalState.currentChain === null) {
			return queriedData.ankrActivities ?? [];
		}
		const activity = queriedData.ankrActivities?.filter(
			(transaction) =>
				mapAnkrChainNameToLocal(transaction.blockchain as Blockchain) ===
				generalState.currentChain?.name
		);
		return activity ?? [];
	});

	$effect(() => {
		const fetchBalances = async () => {
			if (!accountState.currentAccount) {
				queriedData.ankrActivities = null;
				return;
			}
			loading = true;
			let activities:Transaction[] = [];
			let nextPageToken = '';

			try {
				do {
					const result = await getActivityByAnkr(
						DefaultChains,
						accountState.currentAccount?.address,
						days,
						nextPageToken
					);
					if (result) {
						activities = [...activities, ...(result.transactions ?? [])];
						nextPageToken = result.nextPageToken ?? '';
					} else {
						nextPageToken = '';
					}
				} while (nextPageToken !== '');
			} finally {
				loading = false;
				queriedData.ankrActivities = activities;
			}
		};

		fetchBalances().catch(console.error);
		const intervalId = setInterval(async () => {
			fetchBalances().catch(console.error);
		}, rpcIntervalMsNft);
		return () => clearInterval(intervalId);
	});
</script>

<div class="item-container2">
	{#if loading}
		<div class="loading"><Loading class="icon3B" /></div>
	{/if}
	{#each activityByChain ?? [] as transaction}
		<div class="token-entry">
			<div class="token-thumbnail"></div>
			<div class="content">
				<div class="label-m">
					{transaction.from}
				</div>
				<div class="label-m">
					{transaction.to}
				</div>
			</div>
			<div class="token-entry-right">
				<div class="address">{transaction.input}</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.item-container2 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding: 0px;
		margin-bottom: 1rem;
	}

	.token-entry {
		padding: 0.4rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		height: 5rem;
		flex-direction: row;
		background: var(--bg1);
		border: none;
		border-radius: 1.6rem;
		cursor: pointer;
		outline: none;

		&:active {
			transform: translateY(1px);
		}
	}
	.token-entry-right {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		right: 1rem;
		width: 3.5rem;
		height: 3.5rem;
		border: none;
		background: none;
		cursor: pointer;
		margin-right: 1rem;
	}

	.token-thumbnail {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 5rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
</style>
