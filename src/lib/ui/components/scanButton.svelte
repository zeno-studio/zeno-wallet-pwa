<script lang="ts">
	import { ScanIcon, CloseIcon } from '$lib/svg';
	import { frameLoop } from 'qr/dom.js';
	import { isSmallScreen,backCamera,QRCanvas} from '$lib/ui/ts';
	import { addressBook } from '$lib/wallet/runes';
	import { tick } from 'svelte';
	import { fade} from 'svelte/transition';

	let  scanOpen=$state(false);



	async function startCamera() {
		scanOpen = true;
    await tick(); 
    const video = document.getElementById('video');
		let preview = document.createElement('video');
		preview.id = 'preview';
		preview.style.position = 'absolute';
		preview.style.top = '0';
		preview.style.left = '0';
		preview.style.objectFit = 'scale-down';
		video?.appendChild(preview);
		const canvas = new QRCanvas({overlay: document.createElement('canvas')});
		const camera = await backCamera(preview);
		const beep = new Audio('/audio/scan-beep.mp3');
		frameLoop(() => {
			const res = camera.readFrame(canvas);
			if (res && typeof res === 'string') {
				addressBook.scanedAddress = res;
				beep.play();
				camera.stop();
				scanOpen = false;
			} else {
				console.log('qr not found');
			}
		});
	}

	async function close() {
		const preview = document.getElementById('preview') as HTMLVideoElement;
		if (!preview) return;
		const stream = preview.srcObject as MediaStream;
		stream.getTracks().forEach(track => track.stop());
		scanOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
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


</script>



{#if scanOpen}

	 <!-- svelte-ignore a11y_click_events_have_key_events -->
	 <!-- svelte-ignore a11y_no_static_element_interactions -->
	 <div class="backdrop" 
	 transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		>

	
	<div  class={{ "modal": !isSmallScreen.current, 'modal-m': isSmallScreen.current }}>

		<div id="video" class="top">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="close-btn" onclick={close}>
				<CloseIcon class="icon18A" />
			</div>
		</div>
	</div>
</div>
{/if}

<button class="scan-button" onclick={startCamera}>
	<ScanIcon class="icon2A" />
</button>
<style lang="postcss">
	#video {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: var(--bg3);
		border-radius: 1.6rem;
		overflow: hidden;
	}
	.modal {
	box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		height: 48rem;
		width: 72rem;
		padding: 0;
		background: var(--bg1);

		
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

	.close-btn {
		position:fixed;
		top: 5rem;
		right: 5rem;
		cursor: pointer;
		z-index: 9999;
	}

	.top{
		width: 100%;
		height: 20rem;
		background:rgba(255, 255, 255, 0.3) ;
	}
	.square {
		aspect-ratio: 1 / 1;
		display: grid;
		grid-template-columns: 1fr 20rem 1fr;
		width: 100%;
		height: 20rem;
	}
	.fill{
		width: 100%;
		height: 100%;
		background:rgba(255, 255, 255, 0.3) ;
	}
	.focus{
		width: 100%;
		height: 100%;
		background:transparent;
	}
	


	.scan-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		border: none;
		margin: 0px;
		padding: 0px;
		cursor: pointer;
	}

	.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0); /* 半透明黑色遮罩 */
    pointer-events: none; /* 允许点击穿透 */
	z-index: 1006;
  }

	
	
</style>
