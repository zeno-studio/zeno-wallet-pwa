<script lang="ts">
	import { ArrowDown } from '$lib/svg';
	import { NavPanel, NavLeft, Modal } from '$lib/ui/components';
	import { isSmallScreen } from '$lib/ui/ts';
	import { accountState } from '$lib/wallet/runes';
	import { EditIcon, SettingFilled } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';

	let accountDropDown = $state(false);
	let Panel = $state(false);
	let name = $state('');

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
		accountDropDown = false;
	}

	function generateAvatar(address: string, size: number) {
		return toSvg(address, size);
	}

	function gotoAccount(i: number) {
		goto('#/settings/account_detail');
		accountState.editingAccountIndex = i;
	}

	function gotoSetting() {
		goto('#/settings/account_manage');
		accountDropDown = false;
	}

	function toggleModal() {
		accountDropDown = !accountDropDown;
	}

	$effect(() => {
		const account = accountState.accountList.find(
			(a) => a.accountIndex === accountState.currentAccountIndex
		);
		if (account) name = account.name;
	});
</script>

<div class="nav" role="navigation">
	<div class="nav-container">
		<a class="logo-link" href="/"><img class="logo" src="/favicon.svg" alt="logo" /></a>
		{#if isSmallScreen.current}
			<div class="accountLeft">
				<button class="accountButton" onclick={toggleModal}>
					{#if accountState.accountList.length === 0}
						have no account
					{:else}
						{name}
					{/if}

					<ArrowDown class="icon18" />
				</button>
			</div>
		{/if}
		<NavLeft />

		{#if !isSmallScreen.current}
			<button class="accountButtonRight" onclick={() => (Panel = !Panel)}>
				{#if accountState.accountList.length === 0}
					have no account
				{:else}
					<div class="avatar">
						{@html generateAvatar(accountState.currentAccount?.address!, 22)}
						{#if accountState.currentAccount?.addressType === 'POLKADOT'}
							<img class="chain-logo" src="/chain/polkadot.svg" alt="" />
						{/if}
					</div>
					{name}
					<ArrowDown class="icon18A" />
				{/if}
			</button>
		{/if}
	</div>
</div>
<NavPanel bind:Panel />

{#snippet list()}
	<div class="dropdown-label">
		<div class="label-m" style="margin-left: 1rem; font-weight: 600;">Switch Account</div>
		<button class="setting-btn" onclick={gotoSetting}><SettingFilled class="icon2A" /> </button>
	</div>
	{#each accountState.accountList as account}
		{#if !account.isHidden}
			<div class="account-entry">
				<button
					class="account-btn"
					class:selected={account.accountIndex === accountState.currentAccountIndex}
					onclick={() => selectedAccount(account.accountIndex)}
				>
					<div class="avatar-drop">{@html generateAvatar(account.address, 33)}
						{#if account.addressType === 'POLKADOT'}
							<img class="chain-logo2" src="/chain/polkadot.svg" alt="" />
						{/if}
					</div>

					<span
						class="label-m"
						style="font-weight: 600"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						>{account.name}
					</span>
				</button>
				<button
					class="label-right"
					class:selected={account.accountIndex === accountState.currentAccountIndex}
					onclick={() => gotoAccount(account.accountIndex)}
					><EditIcon class="icon2A" />
				</button>
			</div>
		{/if}
	{/each}
{/snippet}

{#if isSmallScreen.current}
	<Modal bind:modalName={accountDropDown} mode="full" content={list} />
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
		fill: var(--pink);
	}
	.chain-logo {
		position: absolute;
		box-sizing: border-box;
		width: 1.2rem;
		height: 1.2rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		background: var(--pink);
	}
	.chain-logo2 {
		position: absolute;
		box-sizing: border-box;
		width: 1.5rem;
		height: 1.5rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		background: var(--pink);
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
		backdrop-filter: blur(2rem);
		z-index: 100;
	}
	.nav-container {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		width: 95%;
	}
	.logo {
		border-radius: 0.8rem;
		width: 3.6rem;
		height: 3.6rem;
		padding: 0px;
		border: none;
		background: none;
	}

	.accountButton {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 500;
		border: none;
		background: none;
		box-sizing: border-box;
		color: var(--color);
		cursor: pointer;
	}

	.accountButtonRight {
		display: flex;
		position: absolute;
		right: 1rem;
		justify-content: flex-start;
		align-items: center;
		color: var(--text);
		font-size: 1.4rem;
		font-weight: 500;
		border-radius: 2rem;
		border: 1px solid var(--bg3);
		background: var(--bg2);
		color: var(--text);
		z-index: 300;
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
		width: 100%;
	}

	.dropdown-label {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 1rem;
		margin: 0rem;
	}
	.setting-btn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		right: 1rem;
		padding: 0rem;
		margin-right: 1rem;
		border: none;
		background: none;
	}

	.avatar {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 2.6rem;
		height: 2.6rem;
		margin: 0.2rem 0.8rem 0.2rem -0.3rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}

	.avatar-drop {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
		margin-right: 1rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}

	.account-entry {
		position: relative;
		display: flex;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: none;
		border: none;
		margin-bottom: 0.8rem;
	}
	.selected {
		background: var(--storm2);
		color: #000;
	}
	.account-btn {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		font-size: 1.6rem;
		font-weight: 500;
		width: 100%;
		height: 6rem;
		padding: 1rem;
		background: var(--bg2);
		border: none;
		border-radius: 2rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--storm2);
		}
		&:active {
			transform: translateY(1px);
		}
		&.selected {
			background: var(--storm2);
		}
	}

	.label-right {
		position: absolute;
		right: 1.5rem;
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		background: var(--bg4);
		width: 3.5rem;
		height: 3.5rem;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		color: var(--color);
	}
</style>
