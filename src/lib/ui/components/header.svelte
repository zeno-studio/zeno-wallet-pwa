<script lang="ts">
	import { LogoIcon, ArrowDown } from '$lib/svg';
	import { NavPanel, NavLeft,AccountList } from '$lib/ui/components';
	import { clickOutside, isSmallScreen } from '$lib/ui/ts';
	import { dbStore, getElement ,type Account} from '$lib/wallet/common';
	import { accountState } from '$lib/wallet/runes';
	import { tick } from 'svelte';
	
	let accountPanel = $state(false);
	let Panel = $state(false);
	let networkPanel = $state(false);
	async function getAccount() {
		return await getElement(dbStore.Account.name, accountState.currentAccountIndex) as Account;
	}

</script>

<div class="nav">
	<div class="nav-wrapper">
		<div class="icon">
			<button class="logoButton">
				<LogoIcon class="logo" />
			</button>
		</div>
		{#if isSmallScreen.current}
			<div class="accountLeft">
				<button class="accountButton" onclick={() => (accountPanel = !accountPanel)}>
					{#if accountState.currentAccountIndex === 0}
						have no account
					{:else}
					    {#await getAccount() then account}
							{account.accountName}
						{/await}
					{/if}
					
					<ArrowDown class="icon2rem" />
				</button>
			</div>
		{/if}
		<NavLeft />

		<div class="navRight">
			<button class="networkButton" onclick={() => (networkPanel = !networkPanel)}>
				<img class="networkImage" src="/chain/ethereum.svg" alt="ethereum" />
			</button>
			{#if !isSmallScreen.current}
				<button class="accountButtonRight" onclick={() => (Panel = !Panel)}> 
					{#if accountState.currentAccountIndex === 0}
						have no account
					{:else}
						{#await getAccount() then account}
							{account.accountName}
						{/await}
					{/if}
				</button>
			{/if}
		</div>
	</div>
</div>
<NavPanel bind:Panel />


{#if accountPanel}
	<div class="subMenu" use:clickOutside onoutclick={() => (accountPanel = !accountPanel)}>
		<AccountList />
	</div>
{/if}

{#if networkPanel}
	<div class="subMenu" use:clickOutside onoutclick={() => (networkPanel = !networkPanel)}>
		<div>
			<img class="networkImage" src="/network/ethereum.svg" alt="ethereum" />
		</div>
	</div>
{/if}

<style lang="postcss">
	.nav {
		box-sizing: border-box;
		display: flex;
		flex-flow: row;
		width: 100%;
		position: fixed;
		top: 0px;
		background: var(--color-bg);
	}
	.nav-wrapper {
		display: flex;
		width: 96%;
		height: 32px;
		padding: 16px 16px;
	}
	.icon {
		display: block;
		justify-content: flex-start;
		height: 32px;
		vertical-align: middle;
	}
	.logoButton {
		width: 36px;
		height: 36px;
		margin-right: 12px;
		padding: 0px;
		border: none;
		background: none;
		cursor: pointer;
	}
	.subMenu {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 64px;
		left: 2rem;
		width: 236px;
		height: 500px;
		overflow-y: scroll;
		background: var(--color-bg);
		border-radius: 2rem;
		padding: 8px;
		z-index: 100;
		border: 1px solid var(--color-border);

	}
	.navRight {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
		box-sizing: border-box;
		vertical-align: baseline;
		margin-left: auto;
	}
	.accountButton {
		display: flex;
		justify-content: flex-start;
		font-size: 1.6rem;
		font-weight: 600;
		width: 200px;
		border: none;
		background: none;
		color: var(--color-text);
	}

	.accountButton:hover {
		cursor: pointer;
		color: var(--color);
	}

	.accountButtonRight {
		color: var(--color-text);
		font-size: 1.6rem;
		font-weight: 600;
		height: 28px;
		padding: 0px 1rem;
		border-radius: 14px;
		border: 1px solid var(--color-border);
		background: var(--color-bg1);
		color: var(--color-text);
	}
	.accountButtonRight:hover {
		cursor: pointer;
		color: var(--color);
	}

	.accountLeft {
		width: 100%;
	}
	.networkImage {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}
	.networkButton {
		display: flex;
		align-items: center;
		text-decoration: none;
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
	}
</style>
