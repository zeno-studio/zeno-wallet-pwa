<script lang="ts">
	import { signer, type signerResponseType,reBuildMn,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {type Settings,packMn } from '$lib/wallet/common';
	let signerResponse : signerResponseType | null = null;
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};

	function pushdata(data: number) {
		const settings = localStorage.getItem('settings');
	if (settings) {
		const parsedSettings = JSON.parse(settings) as Settings;
		parsedSettings.accountList.push(data);
		localStorage.setItem('settings', JSON.stringify(parsedSettings));
	}
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
		<button onclick={() => setTime(3)}>settime</button>
		<button onclick={() => setAutoLock(false)}>setauto</button>
		<button onclick={() => saveMidPass("Qian7855")}>saveMidPass</button>
		<button onclick={reBuildMn}>reBuildMn</button>
		<button onclick={() => pushdata(1)}>push</button>
		<button onclick={() => packMn("Qian7855", "slender segment decade embody ivory tell panel length kit pioneer science brick", "test")}>packMn</button>


</div>
