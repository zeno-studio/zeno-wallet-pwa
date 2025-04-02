<script lang="ts">
	import encodeQR from 'qr';
	import {isSmallScreen } from '$lib/ui/ts';
	import { SettingFilled } from '$lib/svg';
	import { page } from '$app/state';
	import { accountState } from '$lib/wallet/runes';
  import { onMount } from 'svelte';

  let previewBox = $state<HTMLVideoElement | null>(null);
  let canvas = $state<HTMLCanvasElement | null>(null);


let imgData = null;

function startCamera() {
  // 申请摄像头权限
  navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(stream => {
    // 把媒体流直接传给 video 的 srcObject
    (previewBox as HTMLVideoElement).srcObject = stream;
  }).catch(info => {
    alert('无法获取摄像头权限：' + info);
  });
}

function snapshot() {
  // 拍照
  if (canvas && previewBox) {
    canvas.getContext('2d').drawImage(previewBox, 0, 0, canvas.width, canvas.height);
    imgData = canvas.toDataURL('image/png');
  }
}

onMount(() => {
  const previewBoxElement = document.getElementById('preview-box');
  const canvasElement = document.getElementById('canvas');
  const startCameraButtonElement = document.getElementById('start-camera');
  const snapshotButtonElement = document.getElementById('snapshot-btn');

  if (!previewBoxElement || !canvasElement || !startCameraButtonElement || !snapshotButtonElement) {
    console.error('Some required elements not found:', previewBoxElement, canvasElement, startCameraButtonElement, snapshotButtonElement);
    return;
  }

  previewBox = previewBoxElement as HTMLVideoElement;
  canvas = canvasElement as HTMLCanvasElement;
});

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

      <button type="button" id="start-camera" onclick={startCamera}>打开摄像头</button>
      <button type="button" id="snapshot-btn" onclick={snapshot}>拍照</button>

			<video id="preview-box" width="640" height="480" autoplay></video>
			<canvas id="canvas" width="640" height="480"></canvas>
		</div>
	</div>
</div>

<style>
		

	.appBody {
		padding-top: 48px;
	}
	.active {
		padding-top: 20px;
	}
	.qr {
		width:20rem;
    height: 200px;
		background: var(--color-bg2);
		border-radius: 16px;
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
