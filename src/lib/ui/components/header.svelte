<script lang="ts">
	import { ArrowDown } from '$lib/svg';
	import { NavPanel, NavLeft } from '$lib/ui/components';
	import { clickOutside, isSmallScreen,cutString } from '$lib/ui/ts';
	import { accountState } from '$lib/wallet/runes';
	import { EditIcon, SettingFilled } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	


	let isHidden = $state(false);
	let accountPanel = $state(false);
	let Panel = $state(false);
	let name = $state('');

	

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
		accountPanel = false;
	}

	function generateAvatar(address: string) {
		return toSvg(address, 30);
	}

	function gotoAccount(i: number) {
		goto('#/setting/account_detail');
		accountState.editingAccountIndex = i;
	}

	function gotoSetting() {
		goto('#/setting/account_manage');
		accountPanel = false;
	}

	$effect(() => {
		const account = accountState.accountList.find(
			(a) => a.accountIndex === accountState.currentAccountIndex
		);
		if (account) name = account.name;
	});
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			accountPanel = false;
		}
	}

	$effect(() => {
		if (accountPanel) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<div class="nav">
	<div class="nav-wrapper">
		<a class="logo-link" href="/"><img class="logo" src="/favicon.svg" alt="logo" /></a>
		

		{#if isSmallScreen.current}
			<div class="accountLeft">
				<button class="accountButton" onclick={() => (accountPanel = !accountPanel)}>
					{#if accountState.accountList.length === 0}
						have no account
					{:else}
						{name}
					{/if}

					<ArrowDown class="icon2rem" />
				</button>
			</div>
		{/if}
		<NavLeft />

		<div class="navRight">
			{#if !isSmallScreen.current}
					<button class="accountButtonRight" onclick={() => (Panel = !Panel)}>
					{#if accountState.accountList.length === 0}
						{cutString('have no account', 16)}
					{:else}
					<div class="avatar">{@html generateAvatar(accountState.currentAccount?.address!)}</div>{cutString(name, 16)}<ArrowDown class="icon2rem" />
					{/if}
				</button>
			{/if}
		</div>
	</div>
</div>
<NavPanel bind:Panel />

{#if isSmallScreen.current}
	{#if accountPanel}
		<div
			class="subMenu"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			use:clickOutside
			onoutclick={() => (accountPanel = !accountPanel)}
		>
			<div class="container">
				<div class="label-switch">Switch Account</div>
				<button class="setting-button" onclick={gotoSetting}
					><SettingFilled class="icon18A" />
				</button>
			</div>
			{#if !isHidden}
				{#each accountState.accountList as account}
					{#if !account.isHidden}
						<div class="accountList">
							<button
								class="label-left"
								class:selected={account.accountIndex === accountState.currentAccountIndex}
								onclick={() => selectedAccount(account.accountIndex)}
							>
								<div class="avatar">{@html generateAvatar(account.address)}</div>
								<div class="content">
									<span class="label">{account.name} </span>
								</div>
							</button>
							<button
								class="label-right"
								class:selected={account.accountIndex === accountState.currentAccountIndex}
								onclick={() => gotoAccount(account.accountIndex)}
								><EditIcon class="icon18A" />
							</button>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	{/if}
{/if}

<style lang="postcss">
	.logo-link {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.8rem;
	}
	.logo {
		height: 3.2rem;
		width: 3.2rem;
		color: var(--color);
		fill: var(--color-pink);
	}
	.label-switch {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		font-size: 1.3rem;
		font-weight: 600;
		margin-left: 1rem;
		color: var(--color);
	}
	.nav {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-flow: row;
		width: 100%;
		position: fixed;
		height: 6.4rem;
		top: 0px;
		background: transparent;
		backdrop-filter: blur(30px);
	}
	.nav-wrapper {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		width: 96%;
	}
	.logo {
		border-radius: 0.6rem;
		width: 3.6rem;
		height: 3.6rem;
		padding: 0px;
		border: none;
		background: none;
	}
	.subMenu {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		top: 6.4rem;
		width: 100%;
		height: 100vh;
		background: var(--color-bg);
		border-radius: 1.6rem;
		padding: 2rem;
		z-index: 1000;
		border: 1px solid var(--color-border);
		margin: 0rem;
	}

	.navRight {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		right: 0;
		border: none;
		box-sizing: border-box;
	}
	.accountButton {
		display: flex;
		justify-content: flex-start;
		align-items: flex-baseline;
		font-size: 1.5rem;
		font-weight: 600;
		border: none;
		background: none;
		box-sizing: border-box;
		color: var(--color-text);
		
	}

	.accountButton:hover {
		cursor: pointer;
		color: var(--color);
	}

	.accountButtonRight {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: var(--color-text);
		font-size: 1.5rem;
		font-weight: 600;
		padding-right: 1rem;
		border-radius: 2rem;
		border: 1px solid var(--color-border);
		background: var(--color-bg1);
		color: var(--color-text);
		box-sizing: border-box;
		
	}
	.accountButtonRight:hover {
		cursor: pointer;
		color: var(--color);
	}

	.accountLeft {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.container {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 1rem;
		margin: 0rem;
	}
	.setting-button {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		right: 1rem;
		padding: 0rem;
		margin: 0rem;
		border: none;
		background: none;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
	.avatar {
		box-sizing: border-box;
		flex-shrink: 0;
		width: 3rem;
		height: 3rem;
		margin-left: -0.4rem;
		margin-right: 0.8rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
		border: 2px solid var(--color-border);
	}

	.accountList {
		display: grid;
		grid-template-columns: 1fr 5rem;
		padding: 0rem;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: none;
		border: none;
		margin-bottom: 0.8rem;
	}
	.selected {
		background: var(--green4);
	}
	.label {
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
	}
	.label-left {
		display: flex;
		font-size: 1.8rem;
		font-weight: 600;
		padding: 1rem;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		background: var(--color-bg1);
		border: none;
		border-top-left-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--color-bg2);
		}
		&.selected {
			background: var(--green4);
		}
	}
	.label-right {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: var(--color-bg1);
		border: none;
		border-top-right-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--color-bg2);
		}
		&.selected {
			background: var(--green4);
		}
	}
</style>
