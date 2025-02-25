<script lang="ts">
	import '../app.css';
	import { Header, Footer, Toaster } from '$lib/ui/components';
	import { MediaQuery } from 'svelte/reactivity';
	import { initLocale, initTheme } from '$lib/ui/runes';
	import { initDB,ethereum,moonbeam} from '$lib/wallet/common';
	import { accountState,chainState } from '$lib/wallet/runes';

	initLocale();
	initTheme();
	initDB();
	accountState.initAccountConfig();
	chainState.initChains();

	let { children } = $props();


	const isSmallScreen = new MediaQuery('(max-width: 768px)');

	const metadata = {
		title: 'zeno dapp',
		description: 'zeno dapp',
		thumbnail: '/favicon.png',
		favicon: '/favicon.png'
	};

	
</script>

<noscript>You need to enable JavaScript to run this app.</noscript>

{#if isSmallScreen.current}
	<div></div>
{/if}

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image:url" content={metadata.thumbnail} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={metadata.thumbnail} />
	<meta property="twitter:title" content={metadata.title} />
	<meta property="twitter:description" content={metadata.description} />
	<link rel="icon" type="image/png" href={metadata.favicon} sizes="32x32" />
</svelte:head>

<Toaster />
<Header />
{@render children()}
<Footer />
