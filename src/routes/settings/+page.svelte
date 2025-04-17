<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { SwitchTheme, LanguageSelector, CurrencySelector } from '$lib/ui/components';
	import {
		ArrowForward,
		BuyIcon,
		LanguageIcon,
		Darkmode,
		SafeGuardIcon,
		CloudIcon,
		BookIcon,
		ExplorerIcon,
		AppsIcon,
		QuestionIcon,
		AccountIcon
	} from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';
	import { Footer, Header, Modal } from '$lib/ui/components';
	import { metadata } from '$lib/ui/runes';

	metadata.title = 'Settings';
	metadata.description = 'Settings';

	function generateAvatar(address: string) {
		return toSvg(address, 60);
	}
	function gotoAccount() {
		goto(`#/settings/account_detail`);
		accountState.editingAccountIndex = accountState.currentAccountIndex;
	}

	let langOpen = $state(false);
	let currencyOpen = $state(false);
</script>

{#if !isSmallScreen.current}
	<Header />
{/if}
<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	<!-- currentAccount -->
	{#if isSmallScreen.current}
		<div class="label-top">Settings</div>
	{/if}
	<button class="account" onclick={gotoAccount}>
		<div class="item">
			<div class="item-l">
				<div class="avatar">
					{#if accountState.accountList.length === 0}
						0
					{:else}
						{@html generateAvatar(accountState.currentAccount?.address ?? '')}
					{/if}
					{#if accountState.currentAccount?.addressType === 'POLKADOT'}
						<img class="chain-logo" src="/token/dot.svg" alt="" />
					{/if}
				</div>
				<span class="label-m" style="font-weight: 600">{accountState.currentAccount?.name} </span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</button>
	<!-- Theme -->
	<div class="setting-top">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <Darkmode class="icon2" /></span>
				<span class="label-m">Theme</span>
			</div>
			<div class="item-r"><SwitchTheme /></div>
		</div>
	</div>
	<!-- Language -->
	<button class="setting-medium" onclick={() => (langOpen = !langOpen)}>
		<div class="item">
			<div class="item-l">
				<span class="icon"> <LanguageIcon class="icon2" /></span>

				<span class="label-m">Language</span>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</button>
	<!-- Currency -->
	<button class="setting-bottom" onclick={() => (currencyOpen = !currencyOpen)}>
		<div class="item">
			<div class="item-l">
				<span class="icon"> <BuyIcon class="icon2" /></span>

				<span class="label-m">Currency</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</button>
	<!-- manage account -->
	<a class="setting-top" href="/#/settings/account_manage">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <AccountIcon class="icon2" /></span>

				<span class="label-m">Manage Account</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>
	<!-- Security & Privacy -->
	<a class="setting-medium" href="/#/settings/security">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <SafeGuardIcon class="icon2" /></span>

				<span class="label-m">Security & Privacy</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>
	<!-- Backup Wallet -->
	<a class="setting-bottom" href="/#/settings/backup">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <CloudIcon class="icon2" /></span>

				<span class="label-m">Backup Wallet</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>
	<!--Active Chain -->
	<a class="setting-top" href="/#/settings/active_chains">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <ExplorerIcon class="icon2" /></span>

				<span class="label-m">Active Chains</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>
	<!--Address Book -->
	<a class="setting-medium" href="/#/settings/address_book">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <BookIcon class="icon2" /></span>

				<span class="label-m">Address Book</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>
	<!--Active App -->
	<a class="setting-bottom" href="/#/settings/active_apps">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <AppsIcon class="icon2" /></span>

				<span class="label-m">Active Apps</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>

	<a class="setting1" href="/#/settings/about">
		<div class="item">
			<div class="item-l">
				<span class="icon"> <QuestionIcon class="icon2" /></span>

				<span class="label-m">About</span>
			</div>

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</a>
</div>

<Footer />

{#snippet language()}
	<LanguageSelector />
{/snippet}

{#snippet currency()}
	<CurrencySelector />
{/snippet}

<Modal bind:modalName={langOpen} mode="full" content={language} />
<Modal bind:modalName={currencyOpen} mode="full" content={currency} />

<style lang="postcss">
	.label-m{
		color: var(--color);
	}
	.appBody-d {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 2rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 1rem 1rem 8rem 1rem;
	}
	.account {
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: none;
		border: none;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
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
	}

	.chain-logo {
		position: absolute;
		box-sizing: border-box;
		width: 2rem;
		height: 2rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 1rem;
		margin-right: 2rem;
	}

	.setting1 {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--bg2);
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;
		height: 5rem;
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
		background: var(--bg2);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.1rem;
		border: none;
		height: 5rem;
	}

	.setting-medium {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg2);
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 1px;
		border: none;
		height: 5rem;
	}

	.setting-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg2);
		border-bottom-left-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;
		height: 5rem;
	}
</style>
