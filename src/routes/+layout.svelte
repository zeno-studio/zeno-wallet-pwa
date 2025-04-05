<script lang="ts">
	import "../app.pcss";
	import { Header, Footer, Toaster } from '$lib/ui/components';
	import { createSettings } from '$lib/ui/runes';
	import { initDB } from '$lib/wallet/common';
	import { page } from '$app/state';


	initDB();
	createSettings();
	let { children } = $props();

	const metadata = {
		title: 'Zeno Wallet',
		description: 'Zeno Wallet',
		thumbnail: '/favicon.png',
		favicon: '/favicon.png'
	};
</script>

<noscript>You need to enable JavaScript to run this app.</noscript>

<svelte:head>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image:url" content={metadata.thumbnail} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={metadata.thumbnail} />
	<meta property="twitter:title" content={metadata.title} />
	<meta property="twitter:description" content={metadata.description} />
	<link rel="icon" type="image/png" href={metadata.favicon} sizes="32x32" />
	<title>{page.route.id}</title>
</svelte:head>

<Toaster />
<Header />
{@render children()}
<Footer />
