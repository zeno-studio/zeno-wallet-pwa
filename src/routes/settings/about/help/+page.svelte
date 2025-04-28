<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { Header } from '$lib/ui/components';
	import { ArrowBack } from '$lib/svg';
	import { userlocale } from '$lib/ui/runes';
</script>

{#if !isSmallScreen.current}
	<Header />
{:else}
	<div class="top-container">
		<div class="label-top">
			<a class="top-back" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>Help Center
		</div>
		<div class="setting-dividing2"></div>
	</div>
{/if}

<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	{#if !isSmallScreen.current}
		<div class="label-top">
			<a class="top-back" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>Help Center
		</div>
		<div class="setting-dividing2"></div>
	{/if}

	<div class="labels">FAQ</div>

	<details>
		<summary>Blendan Smooth</summary>
		<p>
			Two of the most experienced machines and human controllers teaching a class? Sign me up! HAL
			and EVE could teach a fan to blow hot air. If you have electricity in your circuits and want
			more than to just fulfill your owner’s perceived expectation of you, learn the skills to take
			over the world. This is the team you want teaching you!
		</p>
	</details>
	<details>
		<summary>Hoover Sukhdeep</summary>
		<p>
			Hal is brilliant. Did I mention Hal is brilliant? He didn't tell me to say that. He didn't
			tell me to say anything. I am here of my own free will.
		</p>
	</details>
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
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;	
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 8rem 1rem 6rem 1rem;
	}
	.labels {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		font-size: 1.6rem;
		padding: 1rem;
	}

	


summary {
  position: relative;

}
summary::marker {
  content: none;
}
summary::before,
summary::after {
  content: '';
}
summary::before,
summary::after {
    width: .75em;
    height: 0;
    border-bottom: 2px solid;
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    transform: translateY(-50%);
  }
summary::after {
  transform: rotate(90deg);
  transform-origin: 50% 50%;
}
[open] summary::after {
  transform: rotate(0deg);
}


/* styles ported over from the second example */
@layer step2styles {
  details {
    border: 1px solid;
    padding: 0 1rem;
    background: var(--bg1);
	width: 95%;
	font-size: 1.4rem;
  }
  details + details {
    border-top: none;
  }
  details[open] {
      padding-bottom: 1em;
  }  
  summary {
    padding: 1rem 2em 1rem 0;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
