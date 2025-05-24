<script lang="ts">
   	import { isSmallScreen } from '$lib/ui/ts';
	import { Header, Modal} from '$lib/ui/components';
    import {ArrowBack,} from '$lib/svg';
    import { exportKeystore } from '$lib/wallet/common';


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
	<div class="setting-dividing2"></div>
    <button onclick={()=>downloadKeystore()}>download</button>

	
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


</style>
