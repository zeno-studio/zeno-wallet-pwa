<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		ChevronsRight,
		ArrowForward,
		SettingFilled,
		CopyIcon,
		Darkmode,
		LanguageIcon,
		BuyIcon,
		EditIcon, 
	} from '$lib/svg';
	import { shortenAddress6 } from '$lib/ui/ts';
	import { toSvg } from 'jdenticon';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { LanguageSelector, CurrencySelector, SwitchTheme, } from '$lib/ui/components';
	import ArrowBack from '$lib/svg/arrow-back.svelte';

	let { Panel = $bindable(false) } = $props();
	let account = $state(false);


	type Opt = 'main' | 'language' | 'currency';

	let opt: Opt = $state('main');

	let copied = $state(false);
	function copyAddress() {
		if (!accountState.currentAccount) return;
		navigator.clipboard.writeText(accountState.currentAccount.address);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 3000);
	}
	function gotoAccount() {
		goto('#/settings/account_detail');
		accountState.editingAccountIndex = accountState.currentAccountIndex;
	}
	function generateAvatar(address: string) {
		return toSvg(address, 40);
	}
	
	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
	}
	function gotoAccount2(i: number) {
		goto('#/settings/account_detail');
		accountState.editingAccountIndex = i;
	}
</script>

{#if !isSmallScreen.current}
	{#if Panel}
		<div
			class="panel-desktop"
			in:fly={{ x: 360, duration: 500 }}
			out:fly={{ x: 360, duration: 500 }}
		>
			<button class="closeButton" onclick={() => (Panel = !Panel)}>
				<ChevronsRight />
			</button>
		</div>
		<div class="panelMain" in:fly={{ x: 360, duration: 500 }} out:fly={{ x: 360, duration: 500 }}>
			{#if opt === 'main'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }} >
					<div class="item">
						<div class="item-l">
							<button class="avatar" onclick={gotoAccount}>
								{#if accountState.accountList.length === 0}
									0
								{:else}
									{@html generateAvatar(accountState.currentAccount?.address ?? '')}
								{/if}
								{#if accountState.currentAccount?.addressType === 'POLKADOT'}
									<img class="chain-logo" src="/chain/polkadot.svg" alt="" />
								{/if}
							</button>
							<div class="account-info">
								<span class="account-name">{accountState.currentAccount?.name} </span>
								<div class="address-container">
									<span class="address"
										>{shortenAddress6(accountState.currentAccount?.address ?? '')}</span
									>

									{#if copied}
										<div class="copied">Copied</div>
									{:else}
										<button class="copyicon" onclick={copyAddress}>
											<CopyIcon class="icon16" />
										</button>
									{/if}
								</div>
							</div>
						</div>
						<div class="setting-icon">
							<a href="/#/settings">
								<SettingFilled class="icon2A" />
							</a>
						</div>
					</div>
					<!-- Theme -->
					<div class="setting-top">
						<div class="item2">
							<div class="item-l">
								<span class="icon"> <Darkmode class="icon2A" /></span>
								<span class="label-xs">Theme</span>
							</div>
							<div class="item-r"><SwitchTheme /></div>
						</div>
					</div>
					<!-- Language -->
					<button class="setting-medium" onclick={() => (opt = 'language')}>
						<div class="item2">
							<div class="item-l">
								<span class="icon"> <LanguageIcon class="icon2A" /></span>

								<span class="label-xs">Language</span>
							</div>
							<div class="item-r"><ArrowForward class="icon2A" /></div>
						</div>
					</button>
					<!-- Currency -->
					<button class="setting-bottom" onclick={() => (opt = 'currency')}>
						<div class="item2">
							<div class="item-l">
								<span class="icon"> <BuyIcon class="icon2A" /></span>

								<span class="label-xs">Currency</span>
							</div>

							<div class="item-r"><ArrowForward class="icon2A" /></div>
						</div>
					</button>
					<button class="setting1" onclick={() => (account = true)}>
						<div class="item2">
							<div class="item-l">
								<span class="icon"> <BuyIcon class="icon2" /></span>
			
								<span class="label-xs">Switch Account</span>
							</div>
			
							<div class="item-r"><ArrowForward class="icon2A" /></div>
						</div>
					</button>
				</div>	
			{/if}

			{#if opt === 'language'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }} >
					<div class="panel-content-top">
						<button class="empty-btn" onclick={() => (opt = 'main')}>
							<ArrowBack class="icon2A" />
						</button>
					</div>
					<LanguageSelector />
				</div>
			{/if}
			{#if opt === 'currency'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }} >
					<div class="panel-content-top">
						<button class="empty-btn" onclick={() => (opt = 'main')}>
						<ArrowBack class="icon2A" />
					</button>
				</div>
					<CurrencySelector />
				</div>
			{/if}

			{#if account}
				{#each accountState.accountList as account}
					{#if !account.isHidden}
						<div class="account-entry">
							<button
								class="account-btn"
								class:selected={account.accountIndex === accountState.currentAccountIndex}
								onclick={() => selectedAccount(account.accountIndex)}
							>
								<div class="avatar-drop">{@html generateAvatar(account.address)}</div>
							
									<span class="label-name">{account.name} </span>
								
							</button>
							<button
								class="label-right"
								class:selected={account.accountIndex === accountState.currentAccountIndex}
								onclick={() => gotoAccount2(account.accountIndex)}
								><EditIcon class="icon2A" />
							</button>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	{/if}
{/if}

<style lang="postcss">
	.chain-logo {
		position: absolute;
		box-sizing: border-box;
		width: 2rem;
		height: 2rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		padding: 2px;
		background-color: var(--pink);
	}
	.button-empty {
		margin-top: 0.6rem;
		padding: 0;
		height: 2rem;
		border: none;
		background: none;
	}
	.panel-desktop {
		position: fixed;
		display: flex;
		right: 1rem;
		top: 0.8rem;
		bottom: 0.8rem;
		width: 38rem;
		display: flex;
		z-index: 100;
		border-radius: 1.6rem;
		background: transparent;
	}
	.panel-desktop:hover {
		transform: scaleX(0.95);
		transition: ease-in 0.5s;
		background: var(--bg5);
		backdrop-filter: blur(2rem);
	}

	.panal-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
	}
	.panel-content-top {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 4rem;
		margin-bottom: 0.8rem;
	}
	.account-info {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
	}

	.panelMain {
		position: fixed;
		right: 0.8rem;
		top: 0.8rem;
		bottom: 0.8rem;
		border-radius: 1.6rem;
		width: 32rem;
		padding: 2rem 1.6rem;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: var(--bg);
		border: none;
		box-shadow: var(--bg4) 0px 2px 6px;
		transition: margin-right 250ms ease 0s;
		box-sizing: border-box;
		background: var(--bg);
		z-index: 101;
	}

	.closeButton {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		padding: 1rem;
		border: none;
		border-radius: 1.6rem;
		background: none;
	}

	.item {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 0px;
		background: none;
		border: none;
		color: var(--color);
		margin-bottom: 2rem;
	}

	.item2 {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 0px;
		background: none;
		border: none;
		color: var(--color);
	}
	.account-name {
		display: flex;
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--color);
	}

	.item-l {
		display: flex;
	}

	.item-r {
		position: absolute;
		right: 0px;
		fill: none;
		border: none;
		background: none;
	}
	.setting-icon {
		display: flex;
		position: absolute;
		top: 0;
		right: 0;
		border: none;
		padding: 0.8rem 0rem;
		background: none;
		box-sizing: border-box;
		margin-right: 1rem;
	}
	.avatar {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 6rem;
		height: 6rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
		border: 2px solid var(--bg3);
		cursor: pointer;
	}
	.address-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: none;
		border: none;
	}
	.copyicon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
	}
	.copied {
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
		background: var(--success);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0.4rem;
		border-radius: 1rem;
		width: auto;
		height: 1.4rem;
		border: none;
		cursor: pointer;
	}
	.address {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
		margin-right: 0.4rem;
	}
	.setting1 {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;
		height: 4rem;
	}

	.setting1:hover,
	.setting-medium:hover,
	.setting-top:hover,
	.setting-bottom:hover {
		background: var(--bg2);
	}

	.setting-top {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg1);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.1rem;
		border: none;
		height: 4rem;
	}

	.setting-medium {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg1);
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 1px;
		border: none;
		height: 4rem;
	}

	.setting-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg1);
		border-bottom-left-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;
		height: 4rem;
	}
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 1rem;
		margin-right: 2rem;
	}
	.label2 {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--color);
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
			background: var(--bg3);
		}
		&:active {
			transform: translateY(1px);
		}
		&.selected {
			background: var(--pink200);
			color: var(--pink);
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
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		color: var(--color);
	}
</style>
