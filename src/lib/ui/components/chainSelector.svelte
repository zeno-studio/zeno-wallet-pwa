<script lang="ts">
	import { generalState } from '$lib/wallet/runes';
	import { CheckIcon } from '$lib/svg';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
	import { DefaultChains, DefaultTestnetChains } from '$lib/wallet/common';
	const { closeModal, updatePageTitle, currentPage } = getContext<ModalContext>('modal');
	updatePageTitle(1, 'Select a network');

	function setChain(chainId: number) {
		if (chainId === 0) {
			generalState.currentChain=null;
			closeModal();
			return;
		}
		generalState.setCurrentChain(chainId);
		closeModal();
	}
</script>

<div class="list-container">
	{#if currentPage() === 1}
		<button class="item-button" onclick={()=>setChain(0)}>
			<img class="img24" src={'/chain/0.svg'} alt="" />
			<div class="item-l">
				All chains
			</div>
			<div class="item-r">
				{#if !generalState.currentChain}
					<CheckIcon class="icon2S" />
				{/if}
			</div>
		</button>
		{#each DefaultChains as chain}
			<button class="item-button" onclick={() =>setChain(chain.chainId)}>
			<img class="img24" src={`/chain/${chain.chainId}.svg`} alt="" />
			<div class="item-l">
				{chain.name}
			</div>
			<div class="item-r">
				{#if chain.chainId === generalState.currentChain?.chainId}
					<CheckIcon class="icon2S" />
				{/if}
			</div>
		</button>
		{/each}
		<div class="label1">Testnets</div>
		{#each DefaultTestnetChains as chain}
			<button class="item-button" onclick={() =>setChain(chain.chainId)}>
			<img class="img24" src={`/chain/${chain.chainId}.svg`} alt="" />
			<div class="item-l">
				{chain.name}
			</div>
			<div class="item-r">
				{#if chain.chainId === generalState.currentChain?.chainId}
					<CheckIcon class="icon2S" />
				{/if}
			</div>
		</button>
		{/each}
	{/if}
</div>

<style lang="postcss">
	.list-container {

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		gap: 0.8rem;
	}
	.img24 {
		border-radius: 50%;
	}
	
	.label1 {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1rem;
		width: 100%;
		margin-left: 2rem;
	}
	.item-l {
		display: flex;
	}

	.item-r {
		position: absolute;
		right: 0px;
		fill: none;
		border: none;
		background: none;
		margin-right: 1rem;
	}
	.item-button {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1rem;
		background: none;
		border: none;
		color: var(--color);
	}

	.item-button:hover {
		background: var(--bg3);
		border-radius: 0.8rem;
	}
</style>
