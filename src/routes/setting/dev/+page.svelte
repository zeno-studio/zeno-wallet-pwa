<script lang="ts">
	import { signer, type signerResponseType,saveMidPass,setTime,setAutoLock, queryTime, isLocked, isAutoLock,queryMid} from '$lib/wallet/runes';
	import {restoreMn} from '$lib/wallet/common';
	let signerResponse : signerResponseType | null = null;
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};

	function res(password:string, mn:string){
		console.log(restoreMn(password,mn));
	}

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
	<div>test</div>
</div>
</div>
