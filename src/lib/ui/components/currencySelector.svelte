<script lang="ts">
	import { DefaultFiats,DefaultCurrencies } from '$lib/wallet/common';
	import { chainState } from '$lib/wallet/runes';
	import { CheckIcon } from '$lib/svg';

</script>

<div class="container">
	<div class="label1">Fiat</div>
	{#each [...DefaultFiats] as fiat}
		<button class="item-button" onclick={() => chainState.setFiat(fiat.name)}>
			<img class="img24" src={`/fiat/${fiat.name}.svg`} alt="" />
			<div class="item-l">
				{fiat.name}
			</div>
			<div class="item-r" class:active={fiat.name === chainState.currentFiat}>
				<CheckIcon class="icon2A" />
			</div>
		</button>
	{/each}

	<div class="label1">Crypto Currency</div>
	{#each [...DefaultCurrencies] as currency}
		<button class="item-button" onclick={() => chainState.setCurrency(currency)}>
			<img class="img24" src={`/token/${currency}.svg`} alt="" />
			<div class="item-l">
				{currency}
			</div>
			<div class="item-r" class:active={currency === chainState.currentCurrency}>
				<CheckIcon class="icon2A" />
			</div>
		</button>
	{/each}
</div>

<style lang="postcss">
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

	.active {
		fill: var(--success);
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		width: 100%;
		background: none;
		margin-bottom: 1px;
	}
	.item-button:hover {
		background: var(--bg3);
		border-radius: 0.8rem;
	}
</style>
