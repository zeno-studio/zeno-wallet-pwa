<script lang="ts">
	import { ArrowDown } from '$lib/svg';
	import { NavPanel, NavLeft } from '$lib/ui/components';
	import { clickOutside, isSmallScreen } from '$lib/ui/ts';
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
		<img class="logo" src="/favicon.svg" alt="logo" />

		{#if isSmallScreen.current}
			<div class="accountLeft">
				<button class="accountButton" onclick={() => (accountPanel = !accountPanel)}>
					{#if accountState.currentAccountIndex === 0}
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
					{#if accountState.currentAccountIndex === 0}
						have no account
					{:else}
						{name}
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
		margin-left: 1rem;
		margin-right: 2rem;
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
