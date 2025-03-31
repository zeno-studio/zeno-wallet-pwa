<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { SwitchTheme, LanguageSelector, FiatSelector } from '$lib/ui/components';
	import {
		ArrowForward,
		DollarIcon,
		LanguageIcon,
		CloseIcon,
		Darkmode,
		SafeGuardIcon,
		CloudIcon,
		BookIcon,
		ExplorerIcon,
		AppsIcon,
		QuestionIcon,
		AccountIcon,
	} from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';

	function generateAvatar(address: string) {
		return toSvg(address, 40);
	}
	function gotoAccount() {
		goto(`#/setting/account_detail`);
		accountState.editingAccountIndex = accountState.currentAccountIndex
	}
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->
		<button class="setting" onclick={gotoAccount}>
			<div class="item">
				<div class="item-l">
					<div class="avatar">
						{#if accountState.currentAccountIndex === 0}
					0
				{:else}
					{@html generateAvatar(accountState.currentAccount?.address ?? '')}
				{/if}
					</div>
					<span class="label2">{accountState.currentAccount?.accountName} </span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</button>
		<!-- Theme -->
		<div class="setting-top">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <Darkmode class="icon18A" /></span>
					<span class="label2">Theme</span>
				</div>
				<div class="item-r"><SwitchTheme /></div>
			</div>
		</div>
		<!-- Language -->
		<button class="setting-medium" popovertarget="language">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <LanguageIcon class="icon18A" /></span>

					<span class="label2">Language</span>
				</div>
				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</button>
		<!-- Currency -->
		<button class="setting-bottom" popovertarget="fiat">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <DollarIcon class="icon18A" /></span>

					<span class="label2">Currency</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</button>
		<!-- manage account -->
		<a class="setting-top" href="/#/setting/account_manage">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <AccountIcon class="icon18A" /></span>

					<span class="label2">Manage Account</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!-- Security & Privacy -->
		<a class="setting-medium" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <SafeGuardIcon class="icon18A" /></span>

					<span class="label2">Security & Privacy</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!-- Backup Wallet -->
		<a class="setting-bottom" href="/#/setting/backup">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <CloudIcon class="icon18A" /></span>

					<span class="label2">Backup Wallet</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!--Active Chain -->
		<a class="setting-top" href="/#/setting/active_chains">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <ExplorerIcon class="icon18A" /></span>

					<span class="label2">Active Chains</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!--Address Book -->
		<a class="setting-medium" href="/#/setting/address_book">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <BookIcon class="icon18A" /></span>

					<span class="label2">Address Book</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!--Active App -->
		<a class="setting-bottom" href="/#/setting/active_apps">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <AppsIcon class="icon18A" /></span>

					<span class="label2">Active Apps</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>

		<a class="setting1" href="/#/setting/about">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <QuestionIcon class="icon18A" /></span>

					<span class="label2">About</span>
				</div>

				<div class="item-r" ><ArrowForward class="icon18A" /></div>
			</div>
		</a>
	</div>
</div>

<div id="language" popover class:active={isSmallScreen.current}>
	<button class="close" popovertarget="language" popovertargetaction="hide"
		><CloseIcon class="icon18A" /></button
	>
	<LanguageSelector />
</div>
<div id="fiat" popover class:active={isSmallScreen.current}>
	<button class="close" popovertarget="fiat" popovertargetaction="hide"
		><CloseIcon class="icon18A" /></button
	>
	<FiatSelector />
</div>

<style lang="postcss">
	.avatar {
		box-sizing: border-box;
		flex-shrink: 0;
		width: 5rem;
		height: 5rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
		border: 2px solid var(--color-border);
	}

	:popover-open {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 20px;
		height: 100vh;
		width: 384px;
		padding: 16px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}

	[popover]:popover-open {
		translate: 0 0;
	}

	/*   EXIT STATE   */
	[popover] {
		transition:
			translate 0.3s ease-out,
			overlay 0.3s ease-out;
		translate: 0 1rem;
	}

	/*   0. BEFORE-OPEN STATE   */
	@starting-style {
		[popover]:popover-open {
			translate: 0 1rem;
		}
	}

	.active {
		position: fixed;
		top: 48px;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 20px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}
	.icon{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 1rem;
		margin-right: 2rem;

	}

</style>
