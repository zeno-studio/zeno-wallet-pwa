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


		<div class="article">
			<details name="accordion" open>
				<summary>Item 1</summary>
				<div class="details-content-wrapper">
				  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum id similique omnis quod dignissimos saepe quas mollitia.</p>
				  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum id similique omnis quod dignissimos saepe quas mollitia.</p>
				</div>
			  </details>
			  <details name="accordion">
				<summary>Item 2</summary>
				<div class="details-content-wrapper">
				  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum id similique omnis quod dignissimos saepe quas mollitia.</p>
				</div>
			  </details>
			  <details name="accordion">
				<summary>Item 3</summary>
				<div class="details-content-wrapper">
				  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				  <p>Dolor, aliquam. Veritatis consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum id similique omnis quod dignissimos saepe quas mollitia.</p>
				  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>
			  </details>
		
		</div>
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

details {
  background: white;
  
}

summary {
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  height: 3rem;
  padding: 0 0.5rem;
  
  /* Roll our own marker */
  display: flex;
  justify-content: space-between;

  &::marker {
    content: "";
  }
  &::after {
    content: "+";
  }
  [open] &::after {
    content: "-";
  }

  &:hover {
    color: #666;
  }
}

.details-content-wrapper {
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  /* We need margin-trim … */
  :first-child { margin-top: 0; }
  :last-child { margin-bottom: 0; }
}

::details-content {
  transition: all 0.5s ease, content-visibility 0.5s ease allow-discrete; /* Rely on the special animation powers of content-visibility */
  height: 0;
  overflow: clip; /* Clip off contents while animating */
}

@supports (interpolate-size: allow-keywords) {
  :root {
    interpolate-size: allow-keywords;
  }

  [open]::details-content {
    height: auto;
    padding-bottom: 0.5em;
  }
}
@supports not (interpolate-size: allow-keywords) {
  [open]::details-content {
    height: 150px; /* Arbitrarily chosen height */
    overflow-y: scroll; /* In case the contents should be taller than 150px */
  }
}

</style>

