<script lang="ts">
	import { userlocale, availableLanguages } from '$lib/ui/runes';
	import { LanguageIcon, ArrowDown, CheckIcon} from '$lib/svg';
	import { slide } from 'svelte/transition';
	const langs = [...availableLanguages.keys()];
	function setLanguage(lang: string) {
		userlocale.setLocale(lang);
	}
	let drawer = false;
</script>

<div class="setting-medium">
	<button class="item-button" aria-label="Select Language" onclick={() => (drawer = !drawer)}>
		<div class="item-l">
			<LanguageIcon class="icon2rem" /> Select Language
		</div>
		<div class="item-r">
			<ArrowDown class="icon2rem" />
		</div>
	</button>
</div>
{#if drawer}
	<div class="setting-medium" transition:slide>
		{#each langs as lang}
			<button class="item-button" onclick={() => setLanguage(lang)}>
				<div class="item-l">
					{availableLanguages.get(lang)}
				</div>

				<div class="item-r" class:active={lang === userlocale.Locale}>
					<CheckIcon class="icon2rem" />
				</div>
			</button>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.item-button {
	display: flex;
	flex-direction: row;
	width: 100%;
	font-size: 1.6rem;
	font-weight: 600;
	padding: 6px 0px;
	background: none;
	border: none;
	color:var(--color)
}

	.active {
		stroke:var(--color-text);
	}
	.setting-medium {
	box-sizing: border-box;
	width: 100%;
	flex-direction: column;
	background: var(--color-bg1);
	padding: 1rem;
	cursor: pointer;
	margin-bottom: 8px;
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;

	font-size: 2rem;
	font-weight: 500;
	border: none;
}

.setting-medium:hover {
	background: var(--color-bg2);
}

</style>
