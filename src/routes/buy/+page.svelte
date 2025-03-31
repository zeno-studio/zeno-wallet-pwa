<script lang="ts">
	import encodeQR from 'qr';
	import {isSmallScreen } from '$lib/ui/ts';
	import { SettingFilled } from '$lib/svg';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let address = '0xeDf074bd2c3FC10A296E7C9c52BfD80ab5d2A9E9';
	
	function renderSimpleSquareQR(containerId: string) {
  try {
    const qrData = encodeQR(address, 'raw', { ecc: 'high' });
    if (!qrData || !Array.isArray(qrData) || qrData.length === 0) {
      throw new Error('Invalid QR data');
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    const size = qrData.length;
    const scale = 10;

    canvas.width = size * scale;
    canvas.height = size * scale;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (qrData[y][x]) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }

    finalizeRendering(canvas, containerId);
  } catch (error) {
    console.error('Error rendering QR code:', error);
  }
}

function finalizeRendering(canvas: HTMLCanvasElement | null, containerId: string) {
  if (!canvas) {
    console.error('Error rendering QR code: canvas is null');
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Error rendering QR code: container is null');
    return;
  }

  try {
    container.innerHTML = '';
    container.appendChild(canvas);

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download QR Code';
    downloadBtn.style.marginTop = '10px';
    downloadBtn.onclick = () => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qrcode_simple.png';
      link.click();
    };
    container.appendChild(downloadBtn);
  } catch (error) {
    console.error('Error rendering QR code:', error);
  }
}

onMount(() => {
	renderSimpleSquareQR('qr');
});
// 使用示例


</script>

<div class="appContainer">
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
				<div class="item-r">
					<SettingFilled class="icon2rem" />
				</div>
			</div>
		</div>
		<div class="item-container">
			<div class="item">
				<div id="qr">1</div>
				<div id="aa">1</div>
			</div>

			<div class="item">
				<div>{address}</div>
			</div>
		</div>
	</div>
</div>

<style>

	.appBody {
		padding-top: 64px;
	}
	.active {
		padding-top: 20px;
	}
	.qr {
		padding: 20px;
		width: 200px;
		height: 200px;
		fill: var(--color);
		stroke: none;
		background: var(--color-bg);
		border-radius: 16px;
		margin: 20px;
		border: 1px solid var(--color-border);
	}
	a {
		font-size: 1.3rem;
		font-weight: 600;
	}


	.active1 {
		background: var(--color-bg2);
		color: var(--color);
	}
</style>
