<script lang="ts">
	import { signer,setTime, queryTime, isLocked, isAutoLock,queryMid,saveMidPass,type signerResponseType } from '$lib/wallet/runes';
	let result = $state<signerResponseType | null>(null);
	signer.onmessage = (event) => {
		result = event.data;
	};
</script>

<div class="appContainer">
	<div>
		{result?.data}
	</div>
	<button onclick={queryMid} >mid</button>
		<button onclick={isLocked} >isLocked</button>
		<button onclick={isAutoLock}>isautoLock</button>
		<button onclick={queryTime}>time</button>
		<button onclick={() => setTime(1)}>settime</button>
</div>
