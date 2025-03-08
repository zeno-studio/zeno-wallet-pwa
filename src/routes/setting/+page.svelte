<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { SwitchTheme, LanguageSelector, FiatSelector } from '$lib/ui/components';
	import {
		CameraIcon,
		WalletIcon,
		ArrowForward,
		DollarIcon,
		LanguageIcon,
		CloseIcon
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

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!-- Theme -->
		<div class="setting-top">
			<div class="item">
				<div class="item-l">
					<span class="title"> <CameraIcon class="icon2A" /></span>
					<span class="title">Theme</span>
				</div>
				<div class="item-r"><SwitchTheme /></div>
			</div>
		</div>
		<!-- Language -->
		<button class="setting-medium" popovertarget="language">
			<div class="item">
				<div class="item-l">
					<span class="title"> <LanguageIcon class="icon2A" /></span>

					<span class="title">Language</span>
				</div>
				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</button>
		<!-- Currency -->
		<button class="setting-bottom" popovertarget="fiat">
			<div class="item">
				<div class="item-l">
					<span class="title"> <DollarIcon class="icon2A" /></span>

					<span class="title">Currency</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</button>
		<!-- manage account -->
		<a class="setting-top" href="/#/setting/account_manage">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Manage Account</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!-- Security & Privacy -->
		<a class="setting-medium" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Security & Privacy</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!-- Security & Privacy -->
		<a class="setting-bottom" href="/#/setting/backup">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Backup Wallet</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!--Active Network -->
		<a class="setting-top" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Active Network</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!--Address Book -->
		<a class="setting-medium" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Address Book</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!--Active App -->
		<a class="setting-bottom" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Active App</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>

		<a class="setting1" href="/#/setting/about">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">About</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<a class="setting" href="/#/setting/dev">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">DEV</span>
				</div>

				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
	</div>
</div>

<div id="language" popover class:active={isSmallScreen.current}>
	<button class="close" popovertarget="language" popovertargetaction="hide"
		><CloseIcon class="icon17A" /></button
	>
	<LanguageSelector />
</div>
<div id="fiat" popover class:active={isSmallScreen.current}>
	<button class="close" popovertarget="fiat" popovertargetaction="hide"
		><CloseIcon class="icon17A" /></button
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


</style>
