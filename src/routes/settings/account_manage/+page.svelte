<script lang="ts">
	import {
		CreateAccount,
		AddAccount,
		ImportAccount,
		AccountList,
		Modal,
		Header
	} from '$lib/ui/components';
	import { accountState, checkIsLocked, type signerResponseType } from '$lib/wallet/runes';
	import { isSmallScreen } from '$lib/ui/ts';
	import { metadata } from '$lib/ui/runes';
	import { ArrowBack } from '$lib/svg';

	metadata.title = 'Settings';
	metadata.description = 'Settings';
	let needpass = $state<'' | 'neednot' | 'need'>('');
	let exceed = $state<number[]>([0, 0, 0]);
	let addModal = $state(false);
	let createModal = $state(false);
	let importModal = $state(false);
	const checkModalList = async () => {
		if (accountState.accountList.length > 19) {
			exceed[0] = 1;
			return;
		}
		if (accountState.nextAccountIndex > 100) {
			exceed[1] = 1;
			return;
		}
		if (accountState.nextPolkadotIndex > 200) {
			exceed[2] = 1;
			return;
		}
		const result = (await checkIsLocked()) as signerResponseType | null;
		if (result?.data === false) {
			needpass = 'neednot';
			addModal = true;
		}

		if (result?.data === true) {
			needpass = 'need';
			addModal = true;
		}
	};
</script>

{#if !isSmallScreen.current}
	<Header />
{/if}

{#snippet add()}
	<button
		onclick={async () => await checkModalList()}
		class={{
			'gray-button': exceed[0] === 1 || exceed[1] === 1 || exceed[2] === 1,
			'bottom-button': exceed[0] === 0 && exceed[1] === 0 && exceed[2] === 0
		}}
	>
		{#if exceed[0] === 1}
			You can only keep 20 accounts
		{/if}
		{#if exceed[1] === 1}
			Too many times to add Ethereum account
		{/if}
		{#if exceed[2] === 1}
			Too many times to add Polkadot account
		{/if}
		{#if exceed[0] === 0 && exceed[1] === 0 && exceed[2] === 0}
			Add new account
		{/if}
	</button>
{/snippet}

<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	<!-- currentAccount -->
	{#if isSmallScreen.current}
		<div class="label-top">
			Manage Accounts
			<a class="arrowBack" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>
		</div>
	{/if}

	{#if accountState.accountList.length === 0}
		<div class="none-account">
			Please Create or Import an Account
		</div>
	{:else}
		<div class="account-container">
			<AccountList />
		</div>
	{/if}

	{#if isSmallScreen.current}
		{#if accountState.accountList.length === 0}
			<div class="bottomB-s">
				<button class="bottom-button-grey" onclick={() => (createModal = true)}> Create account </button>
				<button class="bottom-button" onclick={() => (importModal = true)}> Import account </button>
			</div>
		{:else if accountState.accountList.length > 0}
			<div class="bottomA-s">{@render add()}</div>
		{/if}
	{/if}

	{#if !isSmallScreen.current}
		{#if accountState.accountList.length === 0}
			<div class="bottomB">
				<button class="bottom-button-grey" onclick={() => (createModal = true)}> Create account </button>
				<button class="bottom-button" onclick={() => (importModal = true)}> Import account </button>
			</div>
		{:else if accountState.accountList.length > 0}
			<div class="bottomA">
				{@render add()}
			</div>
		{/if}
	{/if}
</div>

<Modal bind:modalName={addModal} mode="half">
	<AddAccount {needpass} />
</Modal>

<Modal bind:modalName={importModal} mode="half">
	<ImportAccount/>
</Modal>

<Modal bind:modalName={createModal} mode="half">
	<CreateAccount />
</Modal>

<style lang="postcss">
	.appBody-d {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 1rem 1rem 0rem 1rem;
	}
	.none-account {
		width: 100%;
		font-size: 1.6rem;
		font-weight: 500;
		flex-direction: column;
		background: none;
		border-radius: 1.6rem;
		padding: 1rem;
		margin-bottom: 0.8rem;
		border: 1px solid var(--border);
	}

	.account-container {
		width: 100%;
		height: 100%;
		margin-bottom: 9rem;
	}

	.bottomA {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 8rem;
		max-width: 48rem;
		background-color: transparent;
		box-sizing: border-box;
		z-index: 200;
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
	}

	.bottomA-s {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		box-sizing: border-box;
		gap: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 10rem;
		max-width: 48rem;
		width: 95%;
		background-color: transparent;
		z-index: 200;
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
	}

	.bottomB {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 13rem;
		max-width: 48rem;
		background-color: transparent;
		box-sizing: border-box;
		z-index: 200;
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
	}

	.bottomB-s {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		box-sizing: border-box;
		gap: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 13rem;
		max-width: 48rem;
		width: 95%;
		background-color: transparent;
		z-index: 200;
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
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
	.gray-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--storm3);
		color: #fff;
		font-size: 1.6rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}
</style>
