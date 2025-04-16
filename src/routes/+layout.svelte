<script lang="ts">
	import '../app.pcss';
	import { createSettings } from '$lib/ui/runes';
	import { isSmallScreen } from '$lib/ui/ts';
	import { initDB } from '$lib/wallet/common';
	import { metadata } from '$lib/ui/runes';
	import { fade, fly } from 'svelte/transition';

	initDB();
	createSettings();
	let { children } = $props();
	let isUpdateModalOpen = $state(false);
	let y = $state(0);
	let newSW: ServiceWorker | null = null;

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;
		registration.addEventListener('updatefound', () => {
			newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW?.state === 'installed') {
					isUpdateModalOpen = true;
				}
			});
		});
	}

	function updateNow() {
		if (newSW) {
			newSW.postMessage({ type: 'SKIP_WAITING' });
			window.location.reload();
		}
		isUpdateModalOpen = false;
	}

	function updateLater() {
		isUpdateModalOpen = false;
	}

	const thumbnail = '/favicon.png';
	const favicon = '/favicon.svg';
	const favIco = '/favicon.ico';
	const appleTouchIcon = '/apple-touch-icon.png';
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			isUpdateModalOpen = false;;
		}
	}

	detectSWUpdate();

	let element = $state<HTMLElement | null>(null);
	let lastY = $state(0);



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

<main class="main" >
	{@render children()}
</main>

{#if isUpdateModalOpen}
	<div
		class="backdrop"
		role="dialog"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				isUpdateModalOpen = false;
			}
		}}
		tabindex="0"
	>
		<div
			id="updateConfirm"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
		>
		<div class="drag-bar" aria-hidden="true"></div>
			<div class="title">Update Available</div>
			<div class="content">A new version of the app is available. Would you like to update now?</div>
			<div class="btn-container">
				<button class="btn-later" onclick={updateLater}>Update Later</button>
				<button class="btn-now" onclick={updateNow}>Update Now</button>
			</div>
		</div>
	</div>
{/if}

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
		z-index: 0;
	}
	.modal {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 70%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}
	.modal-m {
		position: fixed;
		top: calc(100vh - 50rem);
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}

	.content{
		display: flex;
		font-size: 1.4rem;
		width: 80%;
		margin-bottom: 2rem;
		word-break: break-word;
	}

	.btn-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 80%;
		gap: 1rem;
	}
	.btn-now {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 600;
		width: 100%;
		color: #fff;
		background: var(--pink);
		border: none;
		padding: 1.5rem 2rem;
		cursor: pointer;
		height: 6rem;
		margin-bottom: 0.8rem;
		border-radius: 1.6rem;

	}
	.btn-later {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 600;
		width: 100%;
		color: var(--color);
		background: var(--bg2);
		border: none;
		padding: 1.5rem 2rem;
		cursor: pointer;
		height: 6rem;
		margin-bottom: 0.8rem;
		border-radius: 1.6rem;
	
	}
</style>
