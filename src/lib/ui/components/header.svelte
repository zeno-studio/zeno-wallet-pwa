<script lang="ts">
	import { ArrowDown } from '$lib/svg';
	import { NavPanel, NavLeft,AccountList } from '$lib/ui/components';
	import { clickOutside, isSmallScreen } from '$lib/ui/ts';
	import { accountState } from '$lib/wallet/runes';
	
	let accountPanel = $state(false);
	let Panel = $state(false);
	let networkPanel = $state(false);

	let name = $state("");


	$effect(() => {
		const account = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex) 
		if (account) name = account.accountName
	})


</script>

<div class="nav">
	<div class="nav-wrapper">
			<img class="logo" src="/favicon.svg" alt="logo" />
		
		{#if isSmallScreen.current}
			<div class="accountLeft">
				<button class="accountButton" onclick={() => (accountPanel = !accountPanel)}>
					{#if accountState.currentAccountIndex === 0}
						have no account
					{:else}

							{name }

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

					{name }

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
		height: 3.2rem;
		padding: 1.6rem 1.6rem;
	}
	.logo{
		border-radius: 0.6rem;
		width: 3.6rem;
		height: 3.6rem;
		padding: 0px;
		border: none;
		background: none;
	}
	.subMenu {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 6.4rem;
		left: 2rem;
		width: 24rem;
		height: 50rem;
		overflow-y: scroll;
		background: var(--color-bg);
		border-radius: 2rem;
		padding: 0.8rem;
		z-index: 100;
		border: 1px solid var(--color-border);
		overflow-y: scroll;
		scrollbar-width: none;

	}
	.navRight {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-left: auto;
	}
	.accountButton {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 600;
		margin-right: auto;
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
		height: 2.8rem;
		padding: 0rem 1rem;
		border-radius: 1.4rem;
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
		width: 2.4rem;
		height: 2.4rem;
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
