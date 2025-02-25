<script lang="ts">
	let activeTab = $state(0);
	
	const tabs = [
		{ id: 0, label: "Tab 1" },
		{ id: 1, label: "Tab 2" },
		{ id: 2, label: "Tab 3" },
		{ id: 3, label: "Tab 4" }
	];
</script>

<div class="item-container">
	<div class="tabs-header">
		{#each tabs as tab}
			<button
				class="tab-button"
				class:active={activeTab === tab.id}
				onclick={() => activeTab = tab.id}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div class="item-container2">
		{#if activeTab === 0}
			<div class="tab-panel">Content for Tab 1</div>
		{:else if activeTab === 1}
			<div class="tab-panel">Content for Tab 2</div>
		{:else if activeTab === 2}
			<div class="tab-panel">Content for Tab 3</div>
		{:else if activeTab === 3}
			<div class="tab-panel">Content for Tab 4</div>
		{/if}
	</div>
</div>

<style>


	.tabs-header {
		display: flex;
		border-bottom: 1px solid #e2e8f0;
		margin-bottom: 1rem;
	}

	.tab-button {
		padding: 0.5rem 1rem;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 1rem;
		color: #64748b;
		border-bottom: 2px solid transparent;
		transition: all 0.2s;
	}

	.tab-button:hover {
		color: #334155;
	}

	.tab-button.active {
		color: #0f172a;
		border-bottom: 2px solid #3b82f6;
	}

	.tab-panel {
		padding: 1rem;
	}
</style>