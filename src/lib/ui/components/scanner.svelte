<script lang="ts">
	import { CloseIcon, ScanFocus } from '$lib/svg';
	import { frameLoop } from 'qr/dom.js';
	import { backCamera, isSmallScreen } from '$lib/ui/ts';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { frontalCamera, QRCanvas } from 'qr/dom.js';

	let { scanOpen = $bindable(), scanData = $bindable() } = $props();

	const startCamera=async()=> {
		await tick();

		const preview = document.getElementById('preview') as HTMLVideoElement;
		const canvas = new QRCanvas({ overlay: document.createElement('canvas') });
		const camera = await frontalCamera(preview);
		const beep = new Audio('/audio/scan-beep.mp3');
		frameLoop(() => {
			const res = camera.readFrame(canvas);
			if (res && typeof res === 'string') {
				scanData = res;
				beep.play();
				camera.stop();
				scanOpen = false;
			} else {
				console.log('qr not found');
			}
		});
	}

	const close=async()=> {
		const preview = document.getElementById('preview') as HTMLVideoElement;
		if (!preview) return;
		const stream = preview.srcObject as MediaStream;
		stream.getTracks().forEach((track) => track.stop());
		scanOpen = false;
	}

	const handleKeydown=(event: KeyboardEvent) =>{
		if (event.key === 'Escape') {
			close();
		}
	}

	const handleBackdropClick=(event: MouseEvent) =>{
		if (event.target === event.currentTarget) {
			close();
		}
	}

	$effect(() => {
		if (scanOpen) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});

	startCamera();
</script>

{#if scanOpen}

	<div class="backdrop" transition:fade={{ duration: 200 }} onclick={handleBackdropClick}>
		<div class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}>
	
			<video id="preview"> </video>
			<div id="preview-focus" class={{ 'preview-pc': !isSmallScreen.current, 'preview-m': isSmallScreen.current }}>
				<ScanFocus class="scan-focus" />
			</div>
			<div class="close-btn" onclick={close}>
				<CloseIcon class="icon2A" />
			</div>
			{#if isSmallScreen.current}
				<div class="foot"></div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal {
		position: relative;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		height: 80%;
		width: 100rem;
		padding: 0;
		margin: 0;
		overflow: hidden;
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}
	.modal-m {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		height: 100%;
		width: 100%;
		padding: 0;
		background: var(--bg1);
	}
	
	.preview-pc {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		z-index: 1001;
	}
	.preview-m {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: none;
		object-fit: scale-down;
		z-index: 1001;
	}



	.foot {
		position: absolute;
		background: #e2e1e1;
		bottom: 0;
		width: 100vw;
		height: 22rem;
	}
	#preview-focus {
		position: absolute;
		top: calc(50% - 20rem);
		left: calc(50% - 10rem);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1004;
	}

	.close-btn {
		position: absolute;
		top: 3rem;
		right: 3rem;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.5);
		z-index: 1004;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	/* @media screen and (orientation: landscape) {
  video, canvas {
    transform: rotate(90deg);
    transform-origin: center;
    width: 100vw;
    height: auto;
  }
} */
 
@media screen and (orientation: landscape) {
  video, canvas {
    transform: rotate(90deg);
    transform-origin: center;
    width: 100vw;
    height: auto;
  }
}
</style>
