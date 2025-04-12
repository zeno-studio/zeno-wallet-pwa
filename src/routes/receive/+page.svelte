<script lang="ts">
	import { isSmallScreen, copyText } from '$lib/ui/ts';
	import { CopyIcon } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { page } from '$app/state';
	import { generateQRCodeSvg } from '$lib/ui/ts';
	import { Header } from '$lib/ui/components';
	let qrcode = $derived(() => {
		if (!accountState.currentAccount?.address) return '';
		return generateQRCodeSvg(
			accountState.currentAccount.address,
			{
				size: 300,
				color: '#000000',
				radius: 0.3,
				border: 2 
			},
			{ image: '/favicon.svg' }
		);
	});

	let copied = $state(false);

	function handleCopy() {
		copyText('address');
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function downloadSvg() {
		const blob = new Blob([qrcode()], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'qrcode.svg';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}
</script>
<Header />
<div class="appBody" class:active={isSmallScreen.current}>
	<div class="item-container2">
		<div class="item">
			<div class="item-l">
				<button class="button-label" class:active1={page.route.id == '/receive'}>
					<a href="/#/receive" class:active1={page.route.id == '/receive'} aria-label="Setting"
						>Receive</a
					>
				</button>
				<button class="button-label" class:active1={page.route.id == '/send'}>
					<a href="/#/send" class:active1={page.route.id == '/send'} aria-label="Setting">Send</a>
				</button>
				<button class="button-label" class:active1={page.route.id == '/swap'}>
					<a href="/#/swap" class:active1={page.route.id == '/swap'} aria-label="Setting">Swap</a>
				</button>
				<button class="button-label" class:active1={page.route.id == '/buy'}>
					<a href="/#/buy" class:active1={page.route.id == '/buy'} aria-label="Setting">Buy</a>
				</button>
			</div>
		</div>
	</div>

	<div class="item-container">
		{#if accountState.currentAccountIndex === 0}
			<div class="qr">have no account</div>
			<div>
				<div class="name">{accountState.currentAccount?.name}</div>
			</div>

			<div>
				<button class="share-l"> Share Qrcode </button>

				<button class="share-r"> Share Address </button>
			</div>
		{:else}
			<div class="qr">
				{@html qrcode()}
			</div>

			<div>
				<div class="name">{accountState.currentAccount?.name}</div>
			</div>

			<div>
				<button class="share-l" onclick={downloadSvg}> Share Qrcode </button>

				<button
					class="share-r"
					onclick={() => {
						if (navigator.share) {
							navigator.share({
								title: 'Address',
								text: accountState.currentAccount?.address || ''
							});
						}
					}}
				>
					Share Address
				</button>
			</div>
		{/if}
	</div>

	{#if copied}
		<div class="copied">Copied</div>
	{:else}
		<div class="item-container3">
			<button class="copy" onclick={handleCopy}>
				<span id="address">{accountState.currentAccount?.address}</span>&nbsp;
				<CopyIcon class="icon18A" />
			</button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 10.4rem 1rem 0rem 1rem;
	}
	.active {
		padding: 8.4rem 1rem 0rem 1rem;

	}
	.item-container {
		gap: 1rem;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 3rem 1rem 1rem 1rem;
		margin-bottom: 0.8rem;
	}

	.item-container2 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding: 0px;
		margin-bottom: 1rem;
	}

	.item-container3 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding: 1rem;
		border-radius: 1.6rem;
		background: var(--bg);
		border: 1px solid var(--border);
		margin-bottom: 1rem;
	}

	.item {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		font-size: 1.5rem;
		font-weight: 500;
		padding: 0px;
		background: none;
		border: none;
		color: var(--color);
	}

	.item-l {
		display: flex;
	}

	.button-label {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 7rem;
		height: 3.5rem;
		margin-right: 0.4rem;
		border-radius: 1.6rem;
		border: none;
		background: none;
		cursor: pointer;
		view-transition-name: action-lable;
	}

	::view-transition-new(action-lable) {
		rotate: 10deg;
	}

	.share-l {
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
		border-top-left-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;
		border: 1px solid var(--bg3);
		background: none;
		color: var(--text);
		cursor: pointer;
		&:hover {
			background: var(--success);
			color: #fff;
		}
	}
	.share-r {
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
		border-top-right-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		border: 1px solid var(--bg3);
		background: none;
		color: var(--text);
		cursor: pointer;
		&:hover {
			background: var(--success);
			color: #fff;
		}
	}
	.qr {
		display: flex;
		border-radius: 3rem;
		overflow: hidden;
		background: white;
		width: 300px;
		height: 300px;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border);
	}
	a {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.active1 {
		background: var(--bg2);
		color: var(--color);
	}
	#address {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
	}
	.copy {
		display: flex;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
	}

	.copied {
		font-size: 1.6rem;
		font-weight: 600;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: center;
		background: var(--blue);
		border: none;
		border-radius: 1.6rem;
		color: #fff;
		padding: 0.5rem;
	}
	.name {
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--color);
	}
</style>
