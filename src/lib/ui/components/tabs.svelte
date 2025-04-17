<script lang="ts">
	let tab = $state<"token" | "nft" | "activity">("token");
</script>

<div class="tab-container">
	<div class="container">
		<div class="tabs">
			<input type="radio" id="radio-1" name="tabs" bind:group={tab} value="token" />
			<label class="tab" for="radio-1">Token</label>
			<input type="radio" id="radio-2" name="tabs" bind:group={tab} value="nft" />
			<label class="tab" for="radio-2">NFT</label>
			<input type="radio" id="radio-3" name="tabs" bind:group={tab} value="activity" />
			<label class="tab" for="radio-3">Activity</label>
			<span class="glider"></span>
		</div>
	</div>
</div>

<div class="item-container2">
	{#if tab === "token"}
		<div class="tab-panel">Content for Tab 1</div>
	{:else if tab === "nft"}
		<div class="tab-panel">Content for Tab 2</div>
	{:else if tab === "activity"}
		<div class="tab-panel">Content for Tab 3</div>
	{/if}
</div>

<style>
.tab-container {
	flex-direction: row;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	width: 100%;
	background: none;
	padding: 0;
	margin-bottom: 1rem;
}

	.tab-panel {
		padding: 1rem;
	}

	/* tab */
	.tabs {
		display: flex;
		position: relative;
		background-color: none;
		padding: 0;
		width: 30rem;
		margin: 0 auto;
	}

	.tabs * {
		z-index: 2;
	}

	.container input[type='radio'] {
		display: none;
	}
	.container input[type='radio']:checked + label {
		color: #000;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3.6rem;
		width: 10rem;
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.1s ease-in;
	}

	.container input[id='radio-1']:checked ~ .glider {
		transform: translateX(0);
	}

	.container input[id='radio-2']:checked ~ .glider {
		transform: translateX(100%);
	}
	.container input[id='radio-3']:checked ~ .glider {
		transform: translateX(200%);
	}

	.glider {
		position: absolute;
		display: flex;
		left: 0;
		height: 3.6rem;
		width: 10rem;
		background-color: var(--storm1);
		z-index: 1;
		border-radius: 2rem;
		transition: 0.25s ease-out;
	}
</style>