<script>
	import { XIcon, GithubIcon, DiscordIcon, TelegramIcon } from '$lib/svg';
</script>

<div class="placeholder"></div>
<div class="title">
	Hot
	<div class="content">
		<a href="/">Public Sale </a>
	</div>
	<div class="content">
		<a href="/">Zeno DAO </a>
	</div>
</div>
<div class="placeholder"></div>
<div class="title">
	Help Center
	<div class="content">
		<a href="/">Document </a>
	</div>
	<div class="content">
		<a href="/">Q&A </a>
	</div>
</div>
<div class="placeholder"></div>
<div class="title">
	Get the App
	<div class="content">
		<a href="">Android </a>
	</div>
</div>

<div class="placeholder"></div>
<div class="line"></div>

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
<div class="placeholder"></div>
<div class="copyright">Built by Zeno Studio</div>
<div class="copyright">version: 1.0.0</div>

<style>
	.line {
		margin: 8px;
		height: 1px;
		width: 90%;
		background: var(--color-shadow);
	}

	.social {
		width: 100%;
		justify-content: flex-start;
		align-items: center;
		padding-left: 1rem;
	}
	.social-icon {
		width: 48px;
		height: 24px;
	}
	.copyright {
		font-size: 1.2rem;
	}
	.title {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding-left: 3rem;
		border-radius: 1rem;
		color: var(--color);
		font-size: 1.5rem;
		font-weight: 600;
	}
	.content {
		font-size: 1.5rem;
	}
	.content:hover {
		color: var(--color-green);
	}
	.placeholder {
		height: 1.5rem;
	}

</style>
