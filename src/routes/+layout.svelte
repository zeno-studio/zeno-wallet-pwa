<script lang="ts">
	import '../app.pcss';
	import { createSettings } from '$lib/ui/runes';
	import { initDB } from '$lib/wallet/common';
	import { metadata } from '$lib/ui/runes';
	import { onMount } from 'svelte';

	initDB();
	createSettings();
	let { children } = $props();

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;
		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('New update available!Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	const thumbnail = '/favicon.png';
	const favicon = '/favicon.svg';
	const favIco = '/favicon.ico';
	const appleTouchIcon = '/apple-touch-icon.png';

	onMount(() => {
		detectSWUpdate();
	});
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
	<link rel="icon" href={favIco} sizes="48x48" />
	<link rel="icon" href={favicon} sizes="any" type="image/svg+xml" />
	<link rel="apple-touch-icon" href={appleTouchIcon} />
	<link rel="manifest" href="/manifest.json" />

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
