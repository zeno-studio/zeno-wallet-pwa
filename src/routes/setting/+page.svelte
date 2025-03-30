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
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->
		<a class="setting" href="/#/setting/account_detail">
			<div class="item">
				<div class="item-l">
					<div class="avatar">1</div>
					<span class="title">Account 1 </span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!-- Theme -->
		<div class="setting-top">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <Darkmode class="icon18A" /></span>
					<span class="title">Theme</span>
				</div>
				<div class="item-r"><SwitchTheme /></div>
			</div>
		</div>
		<!-- Language -->
		<button class="setting-medium" popovertarget="language">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <LanguageIcon class="icon18A" /></span>

					<span class="title">Language</span>
				</div>
				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</button>
		<!-- Currency -->
		<button class="setting-bottom" popovertarget="fiat">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <DollarIcon class="icon18A" /></span>

					<span class="title">Currency</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</button>
		<!-- manage account -->
		<a class="setting-top" href="/#/setting/account_manage">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <AccountIcon class="icon18A" /></span>

					<span class="title">Manage Account</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!-- Security & Privacy -->
		<a class="setting-medium" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <SafeGuardIcon class="icon18A" /></span>

					<span class="title">Security & Privacy</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!-- Backup Wallet -->
		<a class="setting-bottom" href="/#/setting/backup">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <CloudIcon class="icon18A" /></span>

					<span class="title">Backup Wallet</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!--Active Chain -->
		<a class="setting-top" href="/#/setting/active_chains">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <ExplorerIcon class="icon18A" /></span>

					<span class="title">Active Chains</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!--Address Book -->
		<a class="setting-medium" href="/#/setting/address_book">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <BookIcon class="icon18A" /></span>

					<span class="title">Address Book</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
		<!--Active App -->
		<a class="setting-bottom" href="/#/setting/active_apps">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <AppsIcon class="icon18A" /></span>

					<span class="title">Active Apps</span>
				</div>

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>

		<a class="setting1" href="/#/setting/about">
			<div class="item">
				<div class="item-l">
					<span class="icon"> <QuestionIcon class="icon18A" /></span>

					<span class="title">About</span>
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
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 20px;
		background-color: var(--color-pink);
		color: #fff;
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
	.title{
		display: flex;
		color: var(--color);

	}
</style>
