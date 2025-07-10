<script lang="ts">
	import {
		CreateAccount,
		ImportAccount,
		Footer,
		Header,
		Modal,
		ChainSelector,
		NftBalance,
		ActivityRemote
	} from '$lib/ui/components';
	import {
		ReceiveIcon,
		CloseIcon,
		ArrowDown,
		UpIcon,
		UpDownIcon,
		DollarIcon,
		BridgeIcon,
		Loading
	} from '$lib/svg';
	import { accountState, generalState } from '$lib/wallet/runes';
	import { metadata } from '$lib/ui/runes';
	import { type GetAccountBalanceReply } from '@ankr.com/ankr.js';
	import {
		DefaultChains,
		getTokenBalancesByAnkr,
		rpcIntervalMs,
		getBalanceByFiat,
		getBalanceByCurrency,
		mapAnkrChainNameToLocal
	} from '$lib/wallet/common';

	let tab = $state<'token' | 'nft' | 'activity'>('token');
	metadata.title = 'Assets';
	metadata.description = 'Assets';
	let modalOpen = $state(false);
	let createModal = $state(false);
	let importModal = $state(false);
	let loading = $state(false);
	let showZeroBalance = $state(false);
	let showBalance = $state(true);

	let balanceRes: GetAccountBalanceReply | null = $state(null);
	let balanceByChain = $derived.by(() => {
		if (generalState.currentChain === null) {
			return balanceRes?.assets ?? [];
		}
		const balance = balanceRes?.assets.filter(
			(asset) => mapAnkrChainNameToLocal(asset.blockchain) === generalState.currentChain?.name
		);
		return balance ?? [];
	});

	$effect(() => {
		const fetchBalances = async () => {
			if (!accountState.currentAccount) {
				balanceRes = null;
				return;
			}
			loading = true;
			const result = await getTokenBalancesByAnkr(DefaultChains, accountState.currentAccount?.address);
			balanceRes = result ?? null;
			loading = false;
		};

		fetchBalances().catch(console.error);
		const intervalId = setInterval(async () => {
			fetchBalances().catch(console.error);
		}, rpcIntervalMs);
		return () => clearInterval(intervalId);
	});
</script>

<Header />
<div class="appBody">
	{#if !balanceRes}
		<div class="item-container3"></div>
	{:else}
		<div class="item-container3">
			<div class="balance">
				{generalState.currentFiat.symbol}{getBalanceByFiat(Number(balanceRes.totalBalanceUsd))}
			</div>
			<div class="balance2">
				{getBalanceByCurrency(Number(balanceRes.totalBalanceUsd))}{generalState.currentCurrency}
			</div>
		</div>
	{/if}

	<div class="item-container2">
		<div class="menu1">
			<a class="text1" href="/#/receive">
				<ReceiveIcon class="icon3B" />
				Receive
			</a>
			<a class="text1" href="/#/send">
				<UpIcon class="icon3B" />
				Send
			</a>
			<a class="text1" href="/#/swap">
				<UpDownIcon class="icon3B" />
				Swap
			</a>
			<a class="text1" href="/#/bridge">
				<BridgeIcon class="icon3B" />
				Bridge
			</a>
			<a class="text1" href="/#/buy">
				<DollarIcon class="icon3B" />
				Buy
			</a>
		</div>
	</div>

	<div class="item-container2">
		{#if accountState.accountList.length === 0}
			<div class="menu2">
				<button class="bottom-button-grey" onclick={() => (createModal = true)}>
					Create account
				</button>
				<button class="bottom-button" onclick={() => (importModal = true)}> Import account </button>
			</div>
		{/if}
		{#if accountState.nextAccountIndex > 1 && accountState.isBackup === false}
			<div class="backup">
				<button
					class="close"
					onclick={() => {
						accountState.isBackup = true;
					}}
				>
					<CloseIcon class="icon2A" />
				</button>
				<button class="backup-button"> Backup Your Recovery Phrase </button>
			</div>
		{/if}
	</div>
	<!-- Tab -->
	<div class="tab-container">
		<div class="container">
			<div class="tabs">
				<input type="radio" id="radio-1" name="tabs" bind:group={tab} value="token" />
				<label class="tab" for="radio-1">Token</label>
				<input type="radio" id="radio-2" name="tabs" bind:group={tab} value="nft" />
				<label class="tab" for="radio-2">NFT</label>
				<input type="radio" id="radio-3" name="tabs" bind:group={tab} value="activity" />
				<label class="tab" for="radio-3">Activity</label>
				<span class="glider"></span>
			</div>
		</div>
		<button
			class="chain"
			onclick={() => {
				modalOpen = true;
			}}
		>
			<img class="icon-chain" src={`/chain/${generalState.currentChainId}.svg`} alt="" />
			<ArrowDown class="icon2A" />
		</button>
	</div>

	<div class="item-container2">
		{#if tab === 'token'}
			<div class="tokenList">
				{#if loading}
					<div class="loading"><Loading class="icon3B" /></div>
				{/if}
				{#each balanceByChain ?? [] as asset}
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
							<div class="address">{getBalanceByFiat(Number(asset.balanceUsd))}</div>
							<div>{getBalanceByFiat(Number(asset.tokenPrice))}</div>
						</div>
					</div>
				{/each}
			</div>
		{:else if tab === 'nft'}
			<NftBalance />
		{:else if tab === 'activity'}
			<ActivityRemote />
		{/if}
	</div>
</div>
<Footer />

<Modal bind:modalName={importModal} mode="half">
	<ImportAccount />
</Modal>

<Modal bind:modalName={createModal} mode="half">
	<CreateAccount />
</Modal>

<Modal bind:modalName={modalOpen} mode="full">
	<ChainSelector />
</Modal>

<style lang="postcss">
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 8rem 1rem;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 5rem;
	}

	.item-container3 {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: none;
		border-radius: 1.6rem;
		margin-bottom: 1rem;
		font-weight: 600;
		font-size: 1.8rem;
		height: 8rem;
	}
	.balance {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3rem;
		font-weight: 600;
		margin-top: 1rem;
		color: var(--color);
	}
	.balance2 {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.item-container2 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding: 0px;
		margin-bottom: 1rem;
	}

	.menu1 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
		height: 100%;
		width: 100%;
		gap: 1rem;
	}

	.text1 {
		aspect-ratio: 1 / 1;
		border-radius: 1.6rem;
		border: 0px;
		color: var(--color);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 1rem;
		background: var(--bg2);
	}
	.menu2 {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.backup {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding: 1rem;
		background: var(--primary);
		border: none;
		border-radius: 1.6rem;
		box-sizing: border-box;
		gap: 0px;
	}

	.backup-button {
		display: flex;
		justify-content: center;
		width: 100%;
		background: none;
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		border: none;
		cursor: pointer;
	}
	.chain {
		display: flex;
		position: absolute;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		right: 0;
		background: var(--bg3);
		padding: 0;
		margin: 0;
		width: 8rem;
		height: 4.4rem;
		cursor: pointer;
		border: none;
		border-radius: 2.2rem;
	}

	.icon-chain {
		height: 3.8rem;
		width: 3.8rem;
		cursor: pointer;
		margin-left: 0.4rem;
		margin-right: 1rem;
		border-radius: 50%;
		padding: 0;
	}
	.bottom-button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 2.4rem;
		background: var(--primary);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
		outline: none;
		z-index: 200;
	}

	.bottom-button-grey {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--text);
		font-size: 1.8rem;
		font-weight: 600;
		height: 4.8rem;
		border: 1px solid var(--border);
		border-radius: 2.4rem;
		background: var(--bg3);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
		outline: none;
		z-index: 200;
	}

	.tab-container {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		background: none;
		padding: 0;
		margin-bottom: 1rem;
	}

	.tab-panel {
		padding: 1rem;
	}

	/* tab */
	.tabs {
		display: flex;
		position: relative;
		background-color: var(--bg3);
		padding: 0;
		width: 24.4rem;
		margin: 0 auto;
		border-radius: 2.2rem;
	}

	.tabs * {
		z-index: 2;
	}

	.container input[type='radio'] {
		display: none;
	}
	.container input[type='radio']:checked + label {
		color: var(--color);
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 4.4rem;
		width: 8rem;
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.1s ease-in;
	}

	.container input[id='radio-1']:checked ~ .glider {
		transform: translateX(0);
	}

	.container input[id='radio-2']:checked ~ .glider {
		transform: translateX(100%);
	}
	.container input[id='radio-3']:checked ~ .glider {
		transform: translateX(200%);
	}

	.glider {
		position: absolute;
		display: flex;
		left: 0;
		height: 4rem;
		width: 8rem;
		margin-left: 0.2rem;
		background-color: var(--bg);
		z-index: 1;
		border-radius: 2rem;
		transition: 0.25s ease-out;
	}

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
