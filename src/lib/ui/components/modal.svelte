<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { fade, fly } from 'svelte/transition';
	import { Gesture } from '@use-gesture/vanilla';

	let { modalName = $bindable(),children }=$props()


	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			modalName = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			modalName = false;
		}
	}

	let modalBody = $state<HTMLElement | null>(null);
	let y = $state(0);

	function toggleModal() {
    modalName = !modalName;
    y = 0; 
  }


	$effect(() => {
		if (modalBody && modalName) {
			const gesture = new Gesture(modalBody, {
				onDrag: ({ movement: [, my], velocity: [, vy], direction: [, dy] }) => {
					if (my > 0) y = my;
					if (my > 200 && vy > 0.5 && dy > 0) {modalName = false; y = 0;}
				},
				onDragEnd: () => {
					if (modalName && y > 0) y = 0;
				}
			});
			return () => gesture.destroy();
		}
	});


	$effect(() => {
		if (modalName) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>



{#if isSmallScreen.current}
	{#if modalName}
		<div
			class="backdrop"
			role="dialog"
			transition:fade={{ duration: 200 }}
			onclick={handleBackdropClick}
			onkeydown={handleKeydown}
			tabindex="-1"
		>
			<div
				bind:this={modalBody}
				class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
				role="dialog"
				aria-modal="true"
				in:fly={{ duration: 200, y: 50 }}
				out:fade={{ duration: 120 }}
				tabindex="-1"
				style="transform: translateY({y}px)"
			>
				<div class="drag-bar"></div>
				{@render children()}
			</div>
		</div>
	{/if}
{/if}

<style lang="postcss">
	.modal {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 85%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}
	.modal-m {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		height: 100vh;
		width: 100vw;
		padding: 2rem;
		background: var(--bg1);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}

	.drag-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 0.5rem;
		background: rgb(160, 160, 160);
		border-radius: 1rem;
		margin-top: -1rem;
		margin-bottom: 2rem;
	}
	
</style>
