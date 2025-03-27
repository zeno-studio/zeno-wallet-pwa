<script lang="ts">
	import { page } from '$app/state';
	import { MediaQuery } from 'svelte/reactivity';
	import { userlocale,translation} from '$lib/ui/runes';
	const isSmallScreen= new MediaQuery("(max-width: 768px)");

let t =$state(new Map());

const text = ["Asset", "Apps", "Setting"];

const translate = $derived.by(async () => {
	t = await translation(text, userlocale.locale as string);
	return t
});


$effect(() => {
	translate
	});
</script>

<div class="navLeft">
	{#if !isSmallScreen.current}
		<a href="/" class={{active:page.route.id == '/'}}>{t.get("Asset")}</a>
		<a href="/#/apps" class={{active:page.route.id == '/apps'}}>{t.get("Apps")}</a>
		<a href="/#/nft" class={{active:page.route.id == '/nft'}}>NFT</a>
		<a href="/#/setting" class={{active:page.route.id == '/setting'}}>{t.get("Setting")} </a>
	{/if}
</div>

<style lang="postcss">
	.navLeft {
		height: 36px;
		display: flex;
		justify-content: flex-start;
		width: 100%;
		align-items: center;
		box-sizing: border-box;
		vertical-align: baseline;
		margin-right: auto;
	}

	a {
		font-size: 1.75rem;
		font-weight: 600;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.active {
		color: var(--color);
	}
</style>
