<script lang="ts">
	import { signer, type signerResponseType,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {restoreMn} from '$lib/wallet/common';
	import {accountState} from '$lib/wallet/runes';
	import {generateQRCodeSvg} from '$lib/ui/ts';
	import { Toaster,Header,Footer } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';

	let signerResponse : signerResponseType | null = $state(null);
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};
	function res(password:string, mn:string){
		console.log(restoreMn(password,mn));
	}
	let pass = $state('');

import { AnkrProvider } from '@ankr.com/ankr.js';
import { PUBLIC_ANKR_KEY } from '$env/static/public';
import type { Blockchain } from '@ankr.com/ankr.js/dist/types';

export const ankrAdvanced = new AnkrProvider(`https://rpc.ankr.com/multichain/${PUBLIC_ANKR_KEY}`);
const listOfChains: Blockchain[] = ['eth', 'base','arbitrum', 'bsc', 'optimism','polygon'];

const addr1 = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

async function getBalance() {
 const addr = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

    return await ankrAdvanced.getAccountBalance(
{    blockchain:listOfChains,
    walletAddress:"0x8fF448Ed0C027DbE9F5AdD62e6fAEE439EAc0259"}
)
}




</script>

<Header />
<Toaster />

	<div class="appBody">
		{signerResponse?.data}
	
	<button onclick={queryMid} >mid</button>
		<button onclick={isLocked} >isLocked</button>
		<button onclick={isAutoLock}>isautoLock</button>
		<button onclick={queryTime}>time</button>
		<button onclick={() => setTime(1)}>settime</button>
		<button onclick={() => setAutoLock(false)}>setauto</button>
		<button onclick={() => saveMidPass("Qian7855")}>saveMidPass</button>
		<button onclick={() => res("sian7855","default")}>restoreMn</button>
	<div class="item">
		<label for="pet-select">Choose a pet:</label>

		<select name="pets" id="pet-select">
		  <option value="">--Please choose an option--</option>
		  <option value="dog">Dog</option>
		  <option value="cat">Cat</option>
		  <option value="hamster">Hamster</option>
		  <option value="parrot">Parrot</option>
		  <option value="spider">Spider</option>
		  <option value="goldfish">Goldfish</option>
		</select>
	</div>
	{#await getBalance() then balance}
		{balance.assets}
	{/await}

	<button onclick={() => toastState.add('title', 'message')}>toast</button>
	<input type="file" />
	<input type="file" capture='environment' accept="image/*" />

	<details>
		<summary>Details</summary>
		Something small enough to escape casual notice.
	  </details>
	  

</div>
<Footer />

<style lang="postcss">
		.appBody {
	flex-direction: column;
	height: 100%;
	width: 95%;
	max-width: 48rem;
	padding: 6.4rem 1rem 0rem 1rem;
}
details {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
}

summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}
</style>
