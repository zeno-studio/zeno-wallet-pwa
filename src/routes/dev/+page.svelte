<script lang="ts">
	import { signer, type signerResponseType,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {restoreMn} from '$lib/wallet/common';
	import {accountState} from '$lib/wallet/runes';
	import type { Account } from '$lib/wallet/common';
	let signerResponse : signerResponseType | null = null;
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};

	function res(password:string, mn:string){
		console.log(restoreMn(password,mn));
	}


	let svg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDM2MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzAwNTJGRiIgZD0iTTAgMGgzNjB2MzYwSDB6Ii8+PHBhdGggZD0iTTE3OC45MTUgMjgyLjE5YzU3LjAzNyAwIDEwMy4yNzUtNDYuMTU3IDEwMy4yNzUtMTAzLjA5NVMyMzUuOTUyIDc2IDE3OC45MTUgNzZDMTI0LjgwMiA3NiA4MC40MDkgMTE3LjU0NiA3NiAxNzAuNDI5aDEzNi41MDZ2MTcuMzMySDc2YzQuNDA5IDUyLjg4MiA0OC44MDIgOTQuNDI5IDEwMi45MTUgOTQuNDI5eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
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

console.log(getBalance());

</script>

<div class="appContainer">
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

	{@html ssvg}
	{accountState.currentAccount?.address}

</div>
</div>
