<script lang="ts">
	import { fly } from 'svelte/transition';
	import { MediaQuery } from 'svelte/reactivity';
	import { ChevronsRight } from '$lib/svg';
	import { shortenAddress } from '$lib/ui/ts';

	let address = '0xeDf074bd2c3FC10A296E7C9c52BfD80ab5d2A9E9';
	const isSmallScreen = new MediaQuery('(max-width: 768px)');

	let {Panel = $bindable(false)} = $props();
	let sdf=$state('ddfdfd');



</script>

{#if !isSmallScreen.current}
	{#if Panel}
		<div class="panel-desktop" transition:fly={{ x: 360, opacity: 1 }}>
			<button class="closeButton" onclick={() => (Panel = !Panel)}> 
			<ChevronsRight />
			</button>
		</div>
		<div class="panelMain" transition:fly={{ x: 360, opacity: 1 }}>
			<div class="panel-top">
				<div class="panel-Item-l">{shortenAddress(address)}</div>
				<div class="panel-Item-r">{sdf}</div>
			</div>

			
		</div>
	{/if}
{/if}

<style lang="postcss">
	.panel-desktop {
		position: fixed;
		display: flex;
		right: 10px;
		top: 8px;
		bottom: 8px;
		width: 380px;
		display: flex;
		z-index: 100;
		border-radius: 16px;
		background: transparent;
	}
	.panel-desktop:hover {
		transform: scaleX(0.95);
		transition: ease-in 0.5s;
		background: var(--color-bg1);
	}

	

	.panelMain {
		position: fixed;
		right: 8px;
		top: 8px;
		bottom: 8px;
		border-radius: 12px;
		width: 320px;
		padding: 20px 16px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: var(--color-bg);
		border: none;
		box-shadow:var(--color-shadow) 0px 2px 6px;
		transition: margin-right 250ms ease 0s;
		box-sizing: border-box;
		background: var(--color-bg);
		z-index: 101;
	}

	
	.panel-top {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 1rem;
		border-radius: 16px;
		background: none;
		padding: 0px;
	}

	.panel-Item-l {
		justify-content: flex-start;
		width: 200px;
		height: 100%;
		margin-left: 1.5rem;
	}
	.panel-Item-r {
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		margin-right: 1.5rem;
	}

	.closeButton {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		padding: 1rem;
		border: none;
		border-radius: 16px;
		background: none;
	}

	

</style>
