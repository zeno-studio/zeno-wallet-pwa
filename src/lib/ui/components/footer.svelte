<script>
	import { page } from '$app/state';
	import { isSmallScreen } from '$lib/ui/ts';
	import { AppsFilled,SettingFilled,HomeIcon,NftFilled  } from '$lib/svg';

	
</script>

{#if isSmallScreen.current}
	<div class="footer">
		<div class="menu">
			<a href="/" class:active={page.route.id == '/'} aria-label="Asset">
				<div class="set">
					<HomeIcon class="icon28-footer" />
				</div>
			</a>

			<a href="/#/apps" class:active={page.route.id == '/apps'} aria-label="Apps">
				<div class="set">
					<AppsFilled class="icon28-footer" />
				</div>
			</a>
			<a href="/#/nft" class:active={page.route.id == '/nft'} aria-label="NFT">
				<div class="set">
					<NftFilled class="icon28-footer" />
				</div>
			</a>

			<a href="/#/settings" class:active={page.route.id == '/settings'} aria-label="Settings">
				<div class="set">
					<SettingFilled class="icon28-footer" />
				</div>
			</a>
		</div>
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
		padding: 1rem 1.2rem 3rem 1.2rem;
		height: 6.4rem;
		background: transparent;
		backdrop-filter: blur(30px);
		border-top: 1px solid var(--bg3);

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
		color: var(--primary);
	}
</style>
