<script lang="ts">
	import { userlocale, availableLanguages } from '$lib/ui/runes';
	import { CheckIcon} from '$lib/svg';
	import { slide } from 'svelte/transition';
	const langs = [...availableLanguages.keys()];
	function setLanguage(lang: string) {
		userlocale.setLocale(lang);
	}
</script>

<div class="container" transition:slide>
	{#each langs as lang}
		<button class="item-button" onclick={() => setLanguage(lang)}>
			<div class="item-l">
				{availableLanguages.get(lang)}
			</div>

			<div class="item-r" class:active={lang === userlocale.locale}>
				<CheckIcon class="icon18A" />
			</div>
		</button>
	{/each}
</div>

<style lang="postcss">
	.item-l {
	display: flex;
}

.item-r {
	position: absolute;
	right: 0px;
	fill: none;
	border: none;
	background: none;
}
	.item-button {
		position: relative;
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
