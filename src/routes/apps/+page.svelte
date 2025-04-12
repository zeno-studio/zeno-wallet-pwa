<script lang="ts">
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { flip } from 'svelte/animate';
	import { Header, Footer } from '$lib/ui/components';
	import { metadata } from '$lib/ui/runes';

	metadata.title = 'Apps';
	metadata.description = 'Apps';

	interface Card {
		id: string;
		color: string;
		icon: string;
	}

	let cards = $state<Card[]>([
		{ id: '1', color: 'from-rose-400 to-red-500', icon: '🎨' },
		{ id: '2', color: 'from-blue-400 to-blue-600', icon: '🌊' },
		{ id: '3', color: 'from-green-400 to-green-600', icon: '🌿' },
		{ id: '4', color: 'from-amber-300 to-yellow-500', icon: '⭐' },
		{ id: '5', color: 'from-purple-400 to-purple-600', icon: '🔮' },
		{ id: '6', color: 'from-pink-400 to-pink-600', icon: '🌸' }
	]);

	function handleDrop(state: DragDropState<Card>) {
		const { draggedItem, sourceContainer, targetContainer } = state;
		if (!targetContainer || sourceContainer === targetContainer) return; // Prevent self-placement

		cards = cards.filter((card: Card) => card.id !== draggedItem.id); // Remove the dragged item
		cards.splice(parseInt(targetContainer), 0, draggedItem); // Insert the dragged item at the new position
	}
</script>

<Header />

<div class="appBody">
	<div class="grid-container">
		{#each cards as card, index (card.id)}
			<div
				use:droppable={{ container: index.toString(), callbacks: { onDrop: handleDrop } }}
				class="container"
				animate:flip={{ duration: 300 }}
			>
				<button
					class="item-button"
					use:draggable={{
						container: index.toString(),
						dragData: card
					}}
				>
					<div class="item-icon">
						<span>{card.icon}</span>
					</div>
				</button>
			</div>
		{/each}
	</div>
</div>
<Footer />

<style lang="postcss">
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(7.6rem, 1fr));
		grid-auto-rows: minmax(7.6rem, auto);
		height: 100%;
		width: 100%;
		gap: 1rem;
	}
	.container {
		aspect-ratio: 1 / 1;
		position: relative;
		padding: 0.25rem;
		border-radius: 0.75rem;
		background: none;
		border-radius: 2rem;
	}

	.item-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		background: var(--bg1);
		border: none;
		border-radius: 2rem;
		&:hover {
			background: var(--bg2);
		}
	}
	.item-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>
