<script lang="ts">
	import { signer, type signerResponseType,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {restoreMn} from '$lib/wallet/common';
	import {accountState} from '$lib/wallet/runes';
	import {generateQRCodeSvg} from '$lib/ui/ts';
	import { Toaster,Header,Footer } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';

	let signerResponse : signerResponseType | null = null;
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};

	function res(password:string, mn:string){
		console.log(restoreMn(password,mn));
	}

	let pass = $state('');


	let svg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDM2MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzAwNTJGRiIgZD0iTTAgMGgzNjB2MzYwSDB6Ii8+PHBhdGggZD0iTTE3OC45MTUgMjgyLjE5YzU3LjAzNyAwIDEwMy4yNzUtNDYuMTU3IDEwMy4yNzUtMTAzLjA5NVMyMzUuOTUyIDc2IDE3OC45MTUgNzZDMTI0LjgwMiA3NiA4MC40MDkgMTE3LjU0NiA3NiAxNzAuNDI5aDEzNi41MDZ2MTcuMzMySDc2YzQuNDA5IDUyLjg4MiA0OC44MDIgOTQuNDI5IDEwMi45MTUgOTQuNDI5eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
	let svg1 = generateQRCodeSvg("0x8fF448Ed0C027DbE9F5AdD62e6fAEE439EAc0259",{
    size: 300,
    color: '#3C1C64',
    radius: 0.3,
    border: 3// 或 4
  },{image:"/token/dot.svg"});

let ssvg =atob(svg.split(',')[1])
let addr = "0x8fF448Ed0C027DbE9F5AdD62e6fAEE439EAc0259";

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
		{@html svg1}
	
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

	<input type="text" bind:value={pass} />
	<button onclick={() => toastState.add('title', 'message')}>toast</button>



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
</style>
