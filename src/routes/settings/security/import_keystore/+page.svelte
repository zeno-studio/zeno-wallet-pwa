<script lang="ts">
   	import { isSmallScreen,decodeQRimg} from '$lib/ui/ts';
	import { Header, FileLoad} from '$lib/ui/components';
    import {ArrowBack,} from '$lib/svg';
	import { parseJsonFile} from '$lib/wallet/common';

  	let file = $state<File | null>(null);
	let success = $state<boolean | null>(null);

	async function handleImport() {
	if (!file) {
	  console.error('No file selected');
	  return;
	}
    try {
      if (['image/png', 'image/jpeg'].includes(file.type)) {
        const keystore = await  decodeQRimg(file);
		console.log('Keystore:', keystore);
        success = true
      } else if (file.type === 'application/json') {
        // JSON：调用 decodeKeystore
        const {version, salt, ciphertext } = await parseJsonFile(file);
		console.log('Keystore Version:', version);
		console.log('Keystore Salt:', salt);
		console.log('Keystore Ciphertext:', ciphertext);
		success = true;
	  }
    } catch (error) {
	  success = false;
	  console.error('Failed to process file:', error);
	}
	
  }

</script>

{#if !isSmallScreen.current}
<Header />
{/if}
<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	<div class="label-top">
		<a class="arrowBack" href="/#/settings/security">
			<ArrowBack class="icon2A" />
		</a>Import Keystore
	</div>



	<FileLoad bind:file={file} />
	<button class="start" onclick={handleImport}>
		Import Keystore
	</button>
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

	.start {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.6rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--primary);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}

</style>
