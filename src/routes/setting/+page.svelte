<script lang="ts">
	import { SwitchTheme, LanguageSelector } from '$lib/ui/components';
	import {
		CameraIcon,
		WalletIcon,
		AddIcon,
		ArrowForward,
		DollarIcon,
		LanguageIcon
	} from '$lib/svg';


</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->
		<a class="setting" href="/#/setting/account_detail">
			<div class="item">
				<div class="item-l">
					<div class="avatar">1</div>
					<span class="title">Account 1</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!-- Theme -->
		<div class="setting-top">
			<div class="item">
				<div class="item-l">
					<span class="title"> <CameraIcon class="icon2A" /></span>
					<span class="title">Theme</span>
				</div>
				<div class="item-r"><SwitchTheme class="icon2A" /></div>
			</div>
		</div>
		<!-- Language -->
		<button class="setting-medium">
			<div class="item">
				<div class="item-l">
					<span class="title"> <LanguageIcon class="icon2A" /></span>

					<span class="title">Language</span>
				</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</button>
		<!-- Currency -->
		<a class="setting-bottom" href="/#/setting/currency">
			<div class="item">
				<div class="item-l">
					<span class="title"> <DollarIcon class="icon2A" /></span>

					<span class="title">Currency</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!-- manage account -->
		<a class="setting-top" href="/#/setting/account_manage">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Manage Account</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!-- Security & Privacy -->
		<a class="setting-medium" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Security & Privacy</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!-- Security & Privacy -->
		<a class="setting-bottom" href="/#/setting/backup">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Backup Wallet</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!--Active Network -->
		<a class="setting-top" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Active Network</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!--Address Book -->
		<a class="setting-medium" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Address Book</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!--Active App -->
		<a class="setting-bottom" href="/#/setting/security">
			<div class="item">
				<div class="item-l">
					<span class="title"> <WalletIcon class="icon2A" /></span>

					<span class="title">Active App</span>
				</div>

				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>

	</div>
</div>

<style lang="postcss">
	.title {
		display: flex;
		justify-content: flex-start;
		margin-left: 1rem;
	}
	.avatar {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		margin-left: 1rem;
		border-radius: 20px;
		background-color: var(--color-bg3);
	}

	.setting {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--color-bg1);
		border-radius: 16px;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 8px;
	}
	.setting:hover,
	.setting-medium:hover,
	.setting-top:hover,
	.setting-bottom:hover {
		background: var(--color-bg2);
	}

	.setting-top {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--color-bg1);
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 2px;
	}
	.setting-medium {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--color-bg1);
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 2px;
		border: none;
	}

	.setting-bottom {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--color-bg1);
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 8px;
	}
</style>
