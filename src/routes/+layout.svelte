<script lang="ts">
	import "../app.pcss";
	import { createSettings } from '$lib/ui/runes';
	import { initDB } from '$lib/wallet/common';
	import { metadata } from '$lib/ui/runes';

	initDB();
	createSettings();
	let { children } = $props();

	const thumbnail = '/favicon.png';
	const favicon = '/favicon.svg';

</script>

<noscript>You need to enable JavaScript to run this app.</noscript>

<svelte:head>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image:url" content={thumbnail} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={thumbnail} />
	<meta property="twitter:title" content={metadata.title} />
	<meta property="twitter:description" content={metadata.description} />
	<link rel="icon" type="image/png" href={favicon} sizes="32x32" />

	<title>{metadata.title} {metadata.description}</title>
</svelte:head>


<main class="main">
	{@render children()}
</main>


<style lang="postcss">
	main {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--bg);
	color: var(--text);
	border: none;
	padding: 0px;
	margin: 0px;
}

</style>

