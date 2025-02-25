<script lang="ts">

	let password = $state('');
    let showModal = $state(false);

    function verify(password:string) {
        console.log(password);
    }
    
</script>

<button onclick={() => showModal = !showModal}>Click me</button>


{#if showModal}
<div class="popover" >
	<input class="input" type="password" bind:value={password} placeholder="Enter password" />
	<button onclick={() => verify(password)}>Submit</button>
    <button onclick={() => showModal = !showModal}>Click me</button>
</div>

{/if}






<style>
	.popover {
		position: absolute;
		top: 0;
		left: 0;
        width: 100%;
        height: 100%;
		background: white;
		padding: 10px;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.input {
		width: 200px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}
</style>