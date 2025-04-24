<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { Header } from '$lib/ui/components';
	import { ArrowBack } from '$lib/svg';
	import { userlocale } from '$lib/ui/runes';
	import snarkdown from 'snarkdown'
	import {terms_en, terms_zh} from '$lib/ui/locales/terms';


    const getTerms = () => {
        const locale = userlocale.locale;
        const termsMap: Record<string, string> = {
            en: terms_en,
            zh: terms_zh,
            'zh-CN': terms_zh,
            ja: terms_en,
            de: terms_en,
            fr: terms_en,
            es: terms_en,
            ko: terms_en,
            ru: terms_en,
        };
        return snarkdown(termsMap[locale! as string] || terms_en);
    }

</script>

{#if !isSmallScreen.current}
	<Header />
	{:else}
	<div class="top-container">
		<div class="label-top">
			<a class="top-back" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>Terms of use
		</div>
		<div class="setting-dividing2"></div>
	</div>
{/if}



<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	{#if !isSmallScreen.current}

		<div class="label-top">
			<a class="top-back" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>Terms of use
		</div>
		<div class="setting-dividing2"></div>

{/if}
	<!-- Version -->
	<div class="article">{@html getTerms()}</div>
</div>

<style>
	.top-container {
		position: fixed;
		top: 0;
		height: 6rem;
		display: flex;
		flex-direction: column;
		width: 100%;
		background: var(--bg);
	}


	.appBody-d {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 80rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 1rem 1rem 6rem 1rem;
	}
	.article {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 3rem 1rem;
		
	}
</style>
