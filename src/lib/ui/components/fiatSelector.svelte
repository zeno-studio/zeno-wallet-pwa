<script lang="ts">
    import { DefaultFiats } from '$lib/wallet/common';
    import { chainState } from '$lib/wallet/runes';
    import { CheckIcon} from '$lib/svg';
</script>

<div class="container">
    {#each [...DefaultFiats] as fiat}
        <button class="item-button" onclick={() => chainState.setFiat(fiat.name)}>
            <img class="img24" src={fiat.iconPath} alt="">
            <div class="item-l">
                {fiat.name}
			</div>
            <div class="item-r" class:active={fiat.name === chainState.currentFiat}>
				<CheckIcon class="icon18A" />
			</div>
        </button>
    {/each}
</div>


<style lang="postcss">
	.item-button {
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 1.6rem;
		font-weight: 600;
		padding: 0.6rem;
		background: none;
		border: none;
		color: var(--color);
	}

	.active {
		fill: var(--green4);
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
		background: var(--color-bg2);
		border-radius: 0.8rem;
	}
</style>
