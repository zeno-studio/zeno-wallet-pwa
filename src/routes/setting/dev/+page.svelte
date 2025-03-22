<script lang="ts">
	import { signer,checkPassword, type signerResponseType,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {restoreMn,isValidPassword} from '$lib/wallet/common';
	let signerResponse : signerResponseType | null = null;
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};

	function res(password:string, mn:string){
		console.log(restoreMn(password,mn));
	}

</script>

<div class="appContainer">
	<div>
		{signerResponse?.data}
	</div>
	<button onclick={queryMid} >mid</button>
		<button onclick={isLocked} >isLocked</button>
		<button onclick={isAutoLock}>isautoLock</button>
		<button onclick={queryTime}>time</button>
		<button onclick={() => setTime(1)}>settime</button>
		<button onclick={() => setAutoLock(false)}>setauto</button>
		<button onclick={() => saveMidPass("Qian7855")}>saveMidPass</button>
		<button onclick={() => res("sian7855","default")}>restoreMn</button>
</div>
