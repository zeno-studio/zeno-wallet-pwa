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
		return toSvg(address, 50);
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

	<button class="account" onclick={gotoAccount}>
		<div class="item">
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
			

			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</button>

	<!-- Theme -->
	<div class="setting">
		<div class="setting-entry">
			<div class="icon-container" style="background: var(--accent-blue-back)">
				<Darkmode class="icon16B" />
			</div>
			<div class="item-content">
				<div class="label-m">Dark mode</div>
			</div>
			<div class="item-r"><SwitchTheme /></div>
		</div>

		<div class="setting-dividing"></div>

		<button class="setting-entry" onclick={() => (langOpen = !langOpen)}>
			<div class="icon-container" style="background: var(--accent-blue-back)">
				<LanguageIcon class="icon16B" />
			</div>
			<div class="item-content">
				<div class="label-m">Language</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</button>
		<div class="setting-dividing"></div>
		<button class="setting-entry" onclick={() => (currencyOpen = !currencyOpen)}>
			<div class="icon-container" style="background: var(--accent-blue-back)">
				<BuyIcon class="icon16B" />
			</div>
			<div class="item-content">
				<div class="label-m">Currency</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</button>
	</div>

	<!-- group2 -->
	<div class="setting">
		<a class="setting-entry" href="/#/settings/account_manage">
			<div class="icon-container" style="background: var(--accent-pink-back)">
				<AccountIcon class="icon16PK" />
			</div>
			<div class="item-content">
				<div class="label-m">Manage Account</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>

		<div class="setting-dividing"></div>

		<a class="setting-entry" href="/#/settings/security">
			<div class="icon-container" style="background: var(--accent-pink-back)">
				<SafeGuardIcon class="icon16PK" />
			</div>
			<div class="item-content">
				<div class="label-m">Security & Privacy</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>
		<div class="setting-dividing"></div>
		<a class="setting-entry" href="/#/settings/backup">
			<div class="icon-container" style="background: var(--accent-pink-back)">
				<CloudIcon class="icon16PK" />
			</div>
			<div class="item-content">
				<div class="label-m">Backup Wallet</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>
		<div class="setting-dividing"></div>
	</div>

	<!--group3 -->
	<div class="setting">
		<a class="setting-entry" href="/#/settings/active_chains">
			<div class="icon-container" style="background: var(--accent-cyan-back)">
				<ExplorerIcon class="icon16C" />
			</div>
			<div class="item-content">
				<div class="label-m">Active Chains</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>

		<div class="setting-dividing"></div>

		<a class="setting-entry" href="/#/settings/address_book">
			<div class="icon-container" style="background: var(--accent-orange-back)">
				<BookIcon class="icon16O" />
			</div>
			<div class="item-content">
				<div class="label-m">Address Book</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>
		<div class="setting-dividing"></div>
		<a class="setting-entry" href="/#/settings/active_apps">
			<div class="icon-container" style="background: var(--accent-purple-back)">
				<AppsIcon class="icon16PP" />
			</div>
			<div class="item-content">
				<div class="label-m">Active Apps</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>
		<div class="setting-dividing"></div>
	</div>

	<!--group4 -->
	<div class="setting">
		<a class="setting-entry" href="/#/settings/about">
			<div class="icon-container" style="background: var(--accent-green-back)">
				<QuestionIcon class="icon16G" />
			</div>
			<div class="item-content">
				<div class="label-m">About</div>
			</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</a>
	</div>
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
	.label-m {
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
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: none;
		border: none;
		padding: 1rem;
		cursor: pointer;
		margin: 0.5rem 1rem 0.5rem 0;
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
		margin: 1.2rem 0 1.2rem 0;
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

</style>
