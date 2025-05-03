<script lang="ts">
	import { signer, type signerResponseType,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {restoreMn} from '$lib/wallet/common';
	import {accountState} from '$lib/wallet/runes';
	import {generateQRCodeSvg} from '$lib/ui/ts';
	import { Toaster,Header,Footer } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';
	import {ANKR_KEY} from '$lib/wallet/common';
	import { onMount } from 'svelte';
	import { QrcodeIcon,AddCircle ,BuyIcon,ScanFocus,NftIcon,NftFilled } from '$lib/svg';

	let modalOpen = $state(false);

	let signerResponse : signerResponseType | null = $state(null);
	let assetList : any[] = $state([]);
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};
	function res(password:string, mn:string){
		console.log(restoreMn(password,mn));
	}
	let pass = $state('');
	let rates = $state<{ usd: number; eur: number }>({ usd: 0, eur: 0 });

import { AnkrProvider } from '@ankr.com/ankr.js';
import type { Blockchain } from '@ankr.com/ankr.js/dist/types';


export const ankrAdvanced = new AnkrProvider(`https://rpc.ankr.com/multichain/${ANKR_KEY}`);
const listOfChains: Blockchain[] = ['eth', 'base','arbitrum', 'bsc', 'optimism','polygon'];

const addr1 = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

async function getBalance(){
 const addr = accountState.accountList.find(a => a.accountIndex === accountState.currentAccountIndex)?.address as string;

     return  await ankrAdvanced.getAccountBalance(
{    blockchain:listOfChains,
    walletAddress:addr}
)

}

onMount(async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd,eur');
    rates = await res.json();
  });


</script>

<Header />
<Toaster />

	<div class="appBody">
		<div><NftIcon   class="icon2A"/></div>
		<div><NftFilled   class="icon3"/></div>
		
		{signerResponse?.data}
	
	<button onclick={queryMid} >mid</button>
		<button onclick={isLocked} >isLocked</button>
		<button onclick={isAutoLock}>isautoLock</button>
		<button onclick={queryTime}>time</button>
		<button onclick={() => setTime(1)}>settime</button>
		<button onclick={() => setAutoLock(false)}>setauto</button>
		<button onclick={() => saveMidPass("Qian7855")}>saveMidPass</button>
		<button onclick={() => res("sian7855","default")}>restoreMn</button>
		<button onclick={() => modalOpen =!modalOpen}>modal</button>
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
		{balance.totalBalanceUsd}
		{console.log(balance)}

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
