<script lang="ts">
	import { VERSION } from '$lib/wallet/common';
	import { ArrowForward ,XIcon, GithubIcon, DiscordIcon, TelegramIcon } from '$lib/svg';
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- Version -->
		<div class="setting">
			<div class="item">
				<div class="item-l">

					<span class="title">Version:{VERSION}</span>
				</div>
			</div>
		</div>
		<!-- Privacy policy -->
		<a class="setting1" href="/#/setting/about/privacy">
			<div class="item">
				<div class="item-l">

					<span class="title">Privacy policy</span>
				</div>
				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
		<!-- Privacy policy -->
		<a class="setting1" href="/#/setting/about/terms">
			<div class="item">
				<div class="item-l">

					<span class="title">Terms of use</span>
				</div>
				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
        <!-- Help Center -->
        <a class="setting1" href="/#/setting/about/help">
			<div class="item">
				<div class="item-l">

					<span class="title">Help Center</span>
				</div>
				<div class="item-r"><ArrowForward class="icon17A" /></div>
			</div>
		</a>
        <!-- Document -->
        <a class="setting1" href="/#/null">
			<div class="item">
				<div class="item-l">

					<span class="title">Document</span>
				</div>
				<div class="item-r"><ArrowForward class="icon17A" /></div>
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
</div>

<style>

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
	.space {
		width: 1rem;
	}

</style>

