<script lang="ts">
	import { signer,setTime, isLockedNow, autoLock, type signerResponseType } from '$lib/wallet/runes';
	let result = $state<signerResponseType | null>(null);
	signer.onmessage = (event) => {
		result = event.data;
	};
</script>

<div class="appContainer">
	<div class="appBody">
		<button onclick={isLockedNow}>test{result?.data}</button>
	</div>
	<div class="appBody">
		<button onclick={() => setTime(1)}>test{result?.data}</button>
	</div>
</div>
