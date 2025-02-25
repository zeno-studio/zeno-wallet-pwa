<script>
	import { page } from '$app/state';
	import { MediaQuery } from 'svelte/reactivity';
	import { clickOutside } from '$lib/ui/ts';
	import { Submenu } from '$lib/ui/components';
	import { WalletIcon, NftIcon, AppsIcon, SettingIcon } from '$lib/svg';

	let bottomMenuOpen = $state(false);
	const isSmallScreen = new MediaQuery('(max-width: 768px)');
</script>

{#if isSmallScreen.current}
	<div class="footer">
		<div class="menu">
			<a href="/" class:active={page.route.id == '/'} aria-label="Asset">
				<div class="set">
					<WalletIcon class="icon24" />
					Asset
				</div>
			</a>

			<a href="/#/apps" class:active={page.route.id == '/apps'} aria-label="Apps">
				<div class="set">
					<AppsIcon class="icon24" />
					Apps
				</div>
			</a>
			<a href="/#/nft" class:active={page.route.id == '/nft'} aria-label="NFT">
				<div class="set">
					<NftIcon class="icon24" />
					NFT
				</div>
			</a>

			<a href="/#/setting" class:active={page.route.id == '/setting'} aria-label="Setting">
				<div class="set">
					<SettingIcon class="icon24" />
					Setting
				</div>
			</a>
		</div>
	</div>
{/if}

{#if bottomMenuOpen}
	<div class="bottomMenu" use:clickOutside onoutclick={() => (bottomMenuOpen = false)}>
		<Submenu />
	</div>
{/if}

<style lang="postcss">
	.footer {
		box-sizing: border-box;
		position: fixed;
		display: flex;
		bottom: 0px;
		right: 0px;
		left: 0px;
		width: 100vw;
		padding: 12px;
		z-index: 10;
		background: transparent;
		backdrop-filter: blur(30px);
		border-top: 1px solid var(--color-border);
	}
	.menu {
		width: 100vw;
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	.set {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}

	a {
		text-align: center;
		text-decoration: none;
		font-weight: 500;
	}
	.active {
		color: var(--color-pink);
	}
</style>
