<script lang="ts">
	import { userlocale, availableLanguages } from '$lib/ui/runes';
	import { CheckIcon, ArrowBack } from '$lib/svg';
	import { slide } from 'svelte/transition';
	import Check from '$lib/svg/check.svelte';
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
				<CheckIcon class="icon15A" />
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
		padding: 6px;
		background: none;
		border: none;
		color: var(--color);
	}

	.active {
		fill: var(--color-green);
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
		border-radius: 8px;
	}
	
</style>
