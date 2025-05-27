<script lang="ts">
   	import { isSmallScreen } from '$lib/ui/ts';
	import { Header, Modal} from '$lib/ui/components';
    import {ArrowBack,} from '$lib/svg';
    import { exportKeystore } from '$lib/wallet/common';
    import { accountState } from '$lib/wallet/runes';
    import { generateQRCodeSvg, downloadQRCodeAsPNG ,shareQRCodeAsPNG} from '$lib/ui/ts';


    const downloadKeystore=async () =>{
    const keystore = await exportKeystore('zeno',1);
    if (!keystore) {
        console.error("Failed to export keystore");
        return;
    }
    const blob = new Blob([keystore], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ZenoWallet-Keystore-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

const QRCodeSvg = async () =>{
        const keystore = await exportKeystore('zeno',1);
    if (!keystore) {
        console.error("Failed to export keystore");
        return;
    }
        return await generateQRCodeSvg(
			keystore,
			{
				size: 300,
				color: '#000000',
				radius: 0.25,
				border: 2
			},
			{ image: '/favicon-r.svg' }
		);
}

const downloadPNG = async () =>{
        const svg = await QRCodeSvg();
        if (!svg) {
            console.error("Failed to generate QR code SVG");
            return;
        } 
		await downloadQRCodeAsPNG(svg, {size: 600});
	}

const share= async () => {
    const svg = await QRCodeSvg();
    if (!svg) {
        console.error("Failed to generate QR code SVG");
        return;
    }
    await shareQRCodeAsPNG(svg, {size: 600});
}

</script>

{#if !isSmallScreen.current}
	<Header />
{/if}
<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	<div class="label-top">
		<a class="arrowBack" href="/#/settings/security">
			<ArrowBack class="icon2A" />
		</a>Export Keystore
	</div>

	<button onclick={() => downloadKeystore()}>download</button>

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
				{#await QRCodeSvg() then qr}
					{@html qr}
				{:catch error}
					<div>Error loading QR code: {error.message}</div>
				{/await}
			</div>

			<div>
				<div class="name">{accountState.currentAccount?.name}</div>
			</div>

			<div>
				<button class="share-l" onclick={downloadPNG}> Share Qrcode </button>

				<button
					class="share-r"
					onclick={share}
				>
					Share Address
				</button>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
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
		border: 1px solid var(--hover2);
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
		border: 1px solid var(--hover2);
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
		border: 1px solid var(--bg3);
	}
	a {
		font-size: 1.3rem;
		font-weight: 600;
	}
</style>
