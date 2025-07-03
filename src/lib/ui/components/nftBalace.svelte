<script lang="ts">
	import { accountState, chainState, generalState } from '$lib/wallet/runes';
	import { metadata } from '$lib/ui/runes';
	import { AnkrProvider, type Blockchain, type GetAccountBalanceReply } from '@ankr.com/ankr.js';
	import {
		DefaultChains,
		getAddressBalances,
		rpcIntervalMs,
		getBalanceByFiat,
		getBalanceByCurrency
	} from '$lib/wallet/common';

	let balanceRes: GetAccountBalanceReply | null = $state(null);

	$effect(() => {
		const fetchBalances = async () => {
			if (!accountState.currentAccount) {
				balanceRes = null;
				return;
			}
			if (chainState.currentChain === null) {
				const result = await getAddressBalances(
					DefaultChains,
					accountState.currentAccount?.address
				);
				balanceRes = result ?? null;
				console.log(result.totalBalanceUsd);
			} else {
				const result = await getAddressBalances(
					[chainState.currentChain],
					accountState.currentAccount?.address
				);
				balanceRes = result ?? null;
			}
		};

		fetchBalances().catch(console.error);
		const intervalId = setInterval(async () => {
			fetchBalances().catch(console.error);
		}, rpcIntervalMs);
		return () => clearInterval(intervalId);
	});
</script>

<div class="tokenList">
	{#each balanceRes?.assets ?? [] as asset}
		<div class="token-entry">
			<div class="token-thumbnail">
				<img class="thumbnail" src={asset.thumbnail} alt={asset.tokenSymbol} />
			</div>
			<div class="content">
				<div class="label-m">
					{asset.tokenSymbol}
				</div>
				<div class="address">{asset.balance}</div>
			</div>
			<div class="token-entry-right">
				<div class="address">
					{generalState.currentFiat.symbol}{getBalanceByFiat(Number(asset.balanceUsd))}
				</div>
				<div>sdfd</div>
			</div>
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

	.thumbnail {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
</style>
