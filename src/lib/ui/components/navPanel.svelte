<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		ChevronsRight,
		ArrowForward,
		SettingFilled,
		CopyIcon,
		Darkmode,
		LanguageIcon,
		DollarIcon
	} from '$lib/svg';
	import { shortenAddress6 } from '$lib/ui/ts';
	import { toSvg } from 'jdenticon';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { LanguageSelector, CurrencySelector, SwitchTheme } from '$lib/ui/components';

	let { Panel = $bindable(false) } = $props();

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
</script>

{#if !isSmallScreen.current}
	{#if Panel}
		<div class="panel-desktop" transition:fly={{ x: 360, opacity: 1 }}>
			<button class="closeButton" onclick={() => (Panel = !Panel)}>
				<ChevronsRight />
			</button>
		</div>
		<div class="panelMain" transition:fly={{ x: 360, opacity: 1 }}>
			<div class="panel-optop"></div>

			{#if opt === 'main'}
		

			<div class="item">
				<div class="item-l">
					<div class="avatar">
						{#if accountState.accountList.length === 0}
							0
						{:else}
							{@html generateAvatar(accountState.currentAccount?.address ?? '')}
						{/if}
					</div>
					<div class="account-info">
						<span class="label2">{accountState.currentAccount?.name} </span>
						<div class="address-container">
							<span class="address"
								>{shortenAddress6(accountState.currentAccount?.address ?? '')}</span
							>

							{#if copied}
								<div class="copied">Copied</div>
							{:else}
								<button class="copyicon" onclick={copyAddress}>
									<CopyIcon class="icon18A" />
								</button>
							{/if}
						</div>
					</div>
				</div>
				<div class="setting-icon">
					<a href="/#/settings">
						<SettingFilled class="icon18A" />
					</a>
					<button class="button-empty" onclick={gotoAccount}
						><ArrowForward class="icon18A" />
					</button>
				</div>
			</div>
			<!-- Theme -->
			<div class="setting-top">
				<div class="item2">
					<div class="item-l">
						<span class="icon"> <Darkmode class="icon18A" /></span>
						<span class="label2">Theme</span>
					</div>
					<div class="item-r"><SwitchTheme /></div>
				</div>
			</div>
			<!-- Language -->
			<button class="setting-medium" onclick={() => (opt = 'language')}>
				<div class="item2">
					<div class="item-l">
						<span class="icon"> <LanguageIcon class="icon18A" /></span>

						<span class="label2">Language</span>
					</div>
					<div class="item-r"><ArrowForward class="icon18A" /></div>
				</div>
			</button>
			<!-- Currency -->
			<button class="setting-bottom" onclick={() => (opt = 'currency')}>
				<div class="item2">
					<div class="item-l">
						<span class="icon"> <DollarIcon class="icon18A" /></span>

						<span class="label2">Currency</span>
					</div>

					<div class="item-r"><ArrowForward class="icon18A" /></div>
				</div>
			</button>
			{/if}
		</div>
	{/if}
{/if}

<style lang="postcss">
	.button-empty {
		margin-top: 0.6rem;
		padding: 0;
		height: 1.8rem;
		border: none;
		background: none;
	}
	.panel-desktop {
		position: fixed;
		display: flex;
		right: 1rem;
		top: 0.8rem;
		bottom: 8px;
		width: 38rem;
		display: flex;
		z-index: 100;
		border-radius: 1.6rem;
		background: transparent;
	}
	.panel-desktop:hover {
		transform: scaleX(0.95);
		transition: ease-in 0.5s;
		background: var(--color-bg1);
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
		background-color: var(--color-bg);
		border: none;
		box-shadow: var(--color-shadow) 0px 2px 6px;
		transition: margin-right 250ms ease 0s;
		box-sizing: border-box;
		background: var(--color-bg);
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
		margin-bottom: 0.8rem;
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
		flex-direction: column;
		position: absolute;
		right: 0px;
		border: none;
		padding: 0.8rem 0rem;
		background: none;
		box-sizing: border-box;
	}
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
		background: var(--green4);
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
		color: var(--color-text);
		margin-right: 0.4rem;
	}

	.setting-medium:hover,
	.setting-top:hover,
	.setting-bottom:hover {
		background: var(--color-bg2);
	}

	.setting-top {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--color-bg1);
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
		background: var(--color-bg1);
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
		background: var(--color-bg1);
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
	.label2{
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--color);
	}
</style>
