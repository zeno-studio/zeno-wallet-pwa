<script lang="ts">
	import {signer,isLocked ,query,queryTimer, checkIsLocked} from '$lib/wallet/runes';
	import {restoreMn, type signerResponseType} from '$lib/wallet/common';
	import {accountState} from '$lib/wallet/runes';
	import {generateQRCodeSvg} from '$lib/ui/ts';
	import { Toaster,Header,Footer } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';
	import {ANKR_KEY} from '$lib/wallet/common';
	import { onMount } from 'svelte';
	import { NftIcon,NftFilled } from '$lib/svg';

let res: signerResponseType | null =  $state(null);

let signerResponse : signerResponseType | null = $state(null);
signer.onmessage = (event) => {
		signerResponse = event.data;
	};




async function p() {
	const result = (await checkIsLocked()) as signerResponseType | null;

	console.log("result?.data");
	
}
	

 
function q() {
	// signer.postMessage({ method: 'query', params: { id: 1 } });
	signer.postMessage({ method: 'queryTimer' });
	console.log(signerResponse);
}

p();
</script>

<Header />		
<Toaster />

	<div class="appBody">
		<div><NftIcon   class="icon2A"/></div>
		<div><NftFilled   class="icon3"/></div>
		{signerResponse?.data}
	
	<button onclick={p } >结果：{res}</button>
	<button onclick={q} >结果：{res}</button>
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
