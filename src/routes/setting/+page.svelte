<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { SwitchTheme, LanguageSelector, CurrencySelector } from '$lib/ui/components';
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
		AccountIcon
	} from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	function generateAvatar(address: string) {
		return toSvg(address, 40);
	}
	function gotoAccount() {
		goto(`#/setting/account_detail`);
		accountState.editingAccountIndex = accountState.currentAccountIndex;
	}

	let langOpen = $state(false);
	let fiatOpen = $state(false);

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			langOpen = false;
			fiatOpen = false;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			langOpen = false;
			fiatOpen = false;
		}
	}

	$effect(() => {
		if (langOpen) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>


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
					<span class="label2">{accountState.currentAccount?.name} </span>
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
		<button class="setting-medium" onclick={() => (langOpen = !langOpen)}>
			<div class="item">
				<div class="item-l">
					<span class="icon"> <LanguageIcon class="icon18A" /></span>

					<span class="label2">Language</span>
				</div>
				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</button>
		<!-- Currency -->
		<button class="setting-bottom" onclick={() => (fiatOpen = !fiatOpen)}>
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

				<div class="item-r"><ArrowForward class="icon18A" /></div>
			</div>
		</a>
	</div>


{#if langOpen}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="backdrop" role="dialog" transition:fade={{ duration: 200 }} onclick={handleBackdropClick}>
		<div
			id="language"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
		>
			<button class="close" onclick={() => (langOpen = false)}><CloseIcon class="icon18A" /></button
			>
			<LanguageSelector />
		</div>
	</div>
{/if}

{#if fiatOpen}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="backdrop" role="dialog" transition:fade={{ duration: 200 }} onclick={handleBackdropClick}>
		<div
			id="fiat"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
		>
			<button class="close" onclick={() => (fiatOpen = false)}><CloseIcon class="icon18A" /></button
			>
			<CurrencySelector />
		</div>
	</div>
{/if}

<style lang="postcss">
	.appBody {
		margin-bottom: 8rem;
	}
	.item {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	font-size: 1.5rem;
	font-weight: 500;
	padding: 0px;
	background: none;
	border: none;
	color: var(--color)
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

	.modal {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 2rem;
		height: 100vh;
		width: 384px;
		padding: 2rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
	}
	.modal-m {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 5rem;
		height: 100vh;
		width: 100vw;
		padding: 2rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 1rem;
		margin-right: 2rem;
	}

	.setting {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: none;
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: 1px solid transparent;
	}

	.setting:hover {
		cursor: pointer;
		border: 1px solid var(--color-bg3);
	}

	.setting1 {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--color-bg1);
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
		height: 5rem;
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
		height: 5rem;
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
		height: 5rem;
	}
</style>
