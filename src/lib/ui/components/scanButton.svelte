
<script lang="ts">
    import { ScanIcon,CloseIcon } from '$lib/svg';
	import {frontalCamera, QRCanvas, frameLoop } from 'qr/dom.js';
    import { isSmallScreen } from '$lib/ui/ts';
    import { addressBookState } from '$lib/wallet/runes';

    async function startCamera() {
		const popover = document.getElementById('camera');
		popover?.showPopover();
		let preview = document.createElement('video');
		preview.id = 'preview';
		popover?.appendChild(preview);
		const canvas = new QRCanvas();
		const camera = await frontalCamera(preview);
		const devices = await camera.listDevices();
		await camera.setDevice(devices[0].deviceId);
		const beep = new Audio('/audio/scan-beep.mp3');
		let isRunning = true;
		let frameSkip = 0;
		frameLoop(() => {
			if (!isRunning) return;
			frameSkip++;
			if (frameSkip % 10 !== 0) return; 
			const res = camera.readFrame(canvas);
			if (res && typeof res === 'string') {
				addressBookState.scanedAddress = res;
				beep.play();
				camera.stop();
				isRunning = false;
				popover?.hidePopover();
			} else {
				console.log('qr not found');
			}
		});
	}
    function close() {
        const popover = document.getElementById('camera');
        popover?.hidePopover();
    }
</script>



<button class="scan-button" onclick={startCamera}>
    <ScanIcon class="icon2rem" />
</button>

<div id="camera" popover="manual" class:active={isSmallScreen.current}>
    <div class="bottom" class:mobile={isSmallScreen.current}>
        <button class="close-button" onclick={close}>
            <CloseIcon class="icon2rem" />
        </button>
        <button class="close-button" onclick={close}>
            <CloseIcon class="icon2rem" />
        </button>
    </div>

</div>
<style lang="postcss">
.bottom {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    align-items: center;
    z-index: 1002;
    width: 100%;
    height: 5rem;
    background: var(--color-bg1);
    border: none;
    margin: 0px;
}
.mobile {
    height: 8rem;
}
.scan-button {
    display: flex;
    justify-content:center;
    align-items: center;
	background: none;
	border: none;
	margin: 0px;
	padding: 0px;
	cursor: pointer;
}
.close-button {
    display: flex;
    justify-content: center;
    align-items: center;
	background: none;
    width: 2.4rem;
    height: 2.4rem;
	border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
	margin: 0px;
	padding: 0px;
    cursor: pointer;
    &:hover {
        border: 2px solid rgba(255, 255, 255, 0.6);
    }
}

:popover-open {

		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		height: 70%;
		width: 38.4rem;
        border-radius: 2rem;
        border: none;
		overflow: hidden;
		z-index: 1001;
        background: none;
	}
	.active {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
        border-radius: 0;
        border: none;
		margin: 0px;
		z-index: 1001;
	}

</style>