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
		XIcon,
		GithubIcon,
		DiscordIcon,
		TelegramIcon
	} from '$lib/svg';
	import { shortenAddress6 } from '$lib/ui/ts';
	import { toSvg } from 'jdenticon';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { LanguageSelector, CurrencySelector, SwitchTheme } from '$lib/ui/components';
	import ArrowBack from '$lib/svg/arrow-back.svelte';

	let { Panel = $bindable(false) } = $props();
	type Opt = 'main' | 'language' | 'currency' | 'account';

	let opt: Opt = $state('main');

	let copied = $state(false);
	const copyAddress=() =>{
		if (!accountState.currentAccount) return;
		navigator.clipboard.writeText(accountState.currentAccount.address);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 3000);
	}
	const gotoAccount=() =>{
		goto('#/settings/account_detail');
		accountState.editingAccountIndex = accountState.currentAccountIndex;
	}
	const generateAvatar=(address: string, size: number) =>{
		return toSvg(address, size);
	}

	const selectedAccount=(i: number)=> {
		accountState.setCurrentAccountIndex(i);
	}
	const gotoAccount2=(i: number) =>{
		goto('#/settings/account_detail');
		accountState.editingAccountIndex = i;
	}
	const handleKeydown=(event: KeyboardEvent)=> {
		if (event.key === 'Escape') {
			Panel = false;
		}
	}

	$effect(() => {
		if (Panel) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

{#if !isSmallScreen.current}
	{#if Panel}
		<div
			class="panel-desktop"
			in:fly={{ x: 360, duration: 500 }}
			out:fly={{ x: 360, duration: 500 }}
			onkeydown={handleKeydown}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button class="closeButton" onclick={() => (Panel = !Panel)}>
				<ChevronsRight />
			</button>
		</div>
		<div class="panelMain" in:fly={{ x: 360, duration: 500 }} out:fly={{ x: 360, duration: 500 }}>
			{#if opt === 'main'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }}>
					<div class="item">
						<div class="item-l">
							<button class="avatar" onclick={gotoAccount}>
								{#if accountState.accountList.length === 0}
									0
								{:else}
									{@html generateAvatar(accountState.currentAccount?.address ?? '', 50)}
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
					<div class="setting">
						<div class="setting-entry">
							<div class="icon-container" style="background: var(--accent-blue-back)">
								<Darkmode class="icon16B" />
							</div>
							<div class="item-content">
								<div class="label-s">Theme</div>
							</div>
							<div class="item-r"><SwitchTheme /></div>
						</div>

						<div class="setting-dividing"></div>

						<button class="setting-entry" onclick={() => (opt = 'language')}>
							<div class="icon-container" style="background: var(--accent-blue-back)">
								<LanguageIcon class="icon16B" />
							</div>
							<div class="item-content">
								<div class="label-s">Language</div>
							</div>
							<div class="item-r"><ArrowForward class="icon2A" /></div>
						</button>
						<div class="setting-dividing"></div>
						<button class="setting-entry" onclick={() => (opt = 'currency')}>
							<div class="icon-container" style="background: var(--accent-blue-back)">
								<BuyIcon class="icon16B" />
							</div>
							<div class="item-content">
								<div class="label-s">Currency</div>
							</div>
							<div class="item-r"><ArrowForward class="icon2A" /></div>
						</button>
					</div>
					<div class="setting">
						<button class="setting-entry" onclick={() => (opt = 'account')}>
							<div class="icon-container" style="background: var(--accent-pink-back)">
								<BuyIcon class="icon16PK" />
							</div>
							<div class="item-content">
								<div class="label-s">Switch Account</div>
							</div>
							<div class="item-r"><ArrowForward class="icon2A" /></div>
						</button>
					</div>
					<div class="social">
						<div class="social-icon">
							<a href="https://x.com/0xa5d48801" target="_blank"><XIcon /></a>
						</div>
						<div class="social-icon">
							<a href="https://github.com/boboskii" target="_blank"><GithubIcon /></a>
						</div>
						<div class="social-icon">
							<a href="https://github.com/boboskii" target="_blank"><DiscordIcon /></a>
						</div>
						<div class="social-icon">
							<a href="https://github.com/boboskii" target="_blank"><TelegramIcon /></a>
						</div>
					</div>
				</div>
			{/if}

			{#if opt === 'language'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }}>
					<div class="panel-content-top">
						<button class="empty-btn" onclick={() => (opt = 'main')}>
							<ArrowBack class="icon2A" />
						</button>
					</div>
					<LanguageSelector />
				</div>
			{/if}
			{#if opt === 'currency'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }}>
					<div class="panel-content-top">
						<button class="empty-btn" onclick={() => (opt = 'main')}>
							<ArrowBack class="icon2A" />
						</button>
					</div>
					<CurrencySelector />
				</div>
			{/if}
			{#if opt === 'account'}
				<div class="panal-content" in:fly={{ x: 360, duration: 300 }}>
					<div class="panel-content-top">
						<button class="empty-btn" onclick={() => (opt = 'main')}>
							<ArrowBack class="icon2A" />
						</button>
					</div>
					{#each accountState.accountList as account}
						{#if !account.isHidden}
							<div class="account-entry">
								<button
									class="account-btn"
									class:selected={account.accountIndex === accountState.currentAccountIndex}
									onclick={() => selectedAccount(account.accountIndex)}
								>
									<div class="avatar-drop">{@html generateAvatar(account.address, 32)}</div>

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
				</div>
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
		background-color: var(--primary);
	}

	.panel-desktop {
		position: fixed;
		display: flex;
		right: 1rem;
		top: 0.8rem;
		bottom: 0.8rem;
		width: 38rem;
		display: flex;
		border-radius: 1.6rem;
		background: transparent;
		z-index: 400;
	}
	.panel-desktop:hover {
		transform: scaleX(0.95);
		transition: ease-in 0.5s;
		background: rgba(128, 128, 128, 0.05);
	}

	.panal-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		overflow: scroll;
		scrollbar-width: none;
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
		z-index: 401;
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
		display: flex;
		justify-content: center;
		align-items: center;
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
		flex-shrink: 0;
		width: 100%;
		flex-direction: row;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		margin-bottom: 0.4rem;
	}
	.account-btn {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;

		font-size: 1.2rem;
		font-weight: 600;
		width: 100%;
		height: 6rem;
		padding: 1rem;
		background: var(--bg1);
		border: none;
		border-radius: 2rem;
		cursor: pointer;
		color: var(--text);

		&:hover {
			background: var(--bg3);
		}
		&:active {
			transform: translateY(1px);
		}
		&.selected {
			background: var(--bg3);
			color: var(--color);
			border:2px solid var(--accent-blue)
		}
	}

	
	.label-right {
		position: absolute;
		right: 1.5rem;
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		background: var(--bg3);
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		color: var(--color);
	}

	.setting {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 0rem 1.5rem 0rem 2rem;
		cursor: pointer;
		border: none;
		margin-bottom: 0.8rem;
		max-height: 30rem;
	}

	.setting-entry {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 0;
		background: none;
		border: none;
		color: var(--color);
		margin: 1rem 0 1rem 0;
		cursor: pointer;
	}
	.setting-dividing {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		height: 1px;
		background: var(--bg);
		border-radius: 1.6rem;
		padding: 0;
		margin: 0rem;
		border: none;
	}
	.icon-container {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		width: 3rem;
		border: none;
		border-radius: 1rem;
		margin-right: 2rem;
	}
	.social {
		margin-top: 2rem;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	.social-icon {
		width: 48px;
		height: 24px;
	}
</style>
