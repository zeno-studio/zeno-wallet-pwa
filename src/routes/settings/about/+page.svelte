<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { VERSION } from '$lib/wallet/common';
	import { Header } from '$lib/ui/components';
	import { ArrowForward, ArrowBack, XIcon, GithubIcon, DiscordIcon, TelegramIcon } from '$lib/svg';
</script>



{#if !isSmallScreen.current}
<Header />
{/if}
<div class={{ "appBody": isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
		<div class="label-top">
			<a class="top-back" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>About
		</div>
		<div class="setting-dividing2"></div>
		<!-- Version -->
		<div class="version">
			<div class="item">
				<div class="entry">Version:{VERSION}</div>
			</div>
		</div>
		<!-- Privacy policy -->
		<a class="setting1" href="/#/settings/about/privacy">
			<div class="item">
				<div class="entry">Privacy policy</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!-- Privacy policy -->
		<a class="setting1" href="/#/settings/about/terms">
			<div class="item">
				<div class="entry">Terms of use</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
        <!-- Help Center -->
        <a class="setting1" href="/#/settings/about/help">
			<div class="item">
				<div class="entry">Help Center</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
        <!-- Document -->
        <a class="setting1" href="/#/null">
			<div class="item">
				<div class="entry">Document</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>

        <!-- social-icon -->
            <div class="social">
                <div class="social-icon">
                    <a href="https://x.com/0xa5d48801" target="_blank"><XIcon /></a>
                </div>
                <div class="social-icon">
                    <a href="https://github.com/boboskii" target="_blank"><GithubIcon /></a>
                </div>
                <div class="social-icon">
                    <a href="https://github.com/boboskii" target="_blank"><DiscordIcon /></a>
                </div>
                <div class="social-icon">
                    <a href="https://github.com/boboskii" target="_blank"><TelegramIcon /></a>
                </div>
            </div>
       

	</div>


<style>
	.appBody-d {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 1rem 1rem 0rem 1rem;
	}
	.version{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: var(--text);
		margin-top: 5rem;
		margin-bottom: 1rem;
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
	.item-r {
		position: absolute;
		right: 0px;
		fill: none;
		border: none;
		background: none;
	}
	.entry{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 500;
		width: 100%;
		margin-left: 1rem;
		color: var(--color);
	}

	.social {
        margin-top: 16px;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
		padding-left: 1rem;
	}
	.social-icon {
		width: 48px;
		height: 24px;
	}
	.setting1 {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;
		height: 6rem;
		&:hover {
			background: var(--bg3);
		}
	}

</style>

