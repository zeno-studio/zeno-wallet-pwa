<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { fade, fly } from 'svelte/transition';
	import { Gesture } from '@use-gesture/vanilla';
	import { CloseIcon } from '$lib/svg';

	type Mode = 'full' | 'half';

	let { modalName = $bindable(), mode, content } = $props();

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

	function closeModal() {
		modalName = false;
		y = 0;
	}

	$effect(() => {
		if (modalBody && modalName) {
			const gesture = new Gesture(modalBody, {
				onDrag: ({ movement: [, my], velocity: [, vy], direction: [, dy] }) => {
					if (my > 0) y = my;
					if (my > 200 && vy > 0.5 && dy > 0) {
						modalName = false;
						y = 0;
					}
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
			class={{
				"modal": !isSmallScreen.current && mode === 'full',
				'modal-m': isSmallScreen.current && mode === 'full',
				"modal2": !isSmallScreen.current && mode === 'half',
				'modal-m2': isSmallScreen.current && mode === 'half'
			}}
			role="dialog"
			aria-modal="true"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			tabindex="-1"
			style="transform: translateY({y}px)"
		>
			{#if isSmallScreen.current}
				<div class="drag-bar"></div>
			{:else}
				<div class="close-container">
					<button class="close-btn" onclick={closeModal}><CloseIcon class="icon2A" /></button>
				</div>
			{/if}
			{@render content()}
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 99%;
		width: 38.4rem;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--border);
		touch-action: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}
	.modal2 {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 80%;
		width: 38.4rem;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--border);
		touch-action: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}
	.modal-m {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 1rem;
		height: 100vh;
		width: 100vw;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		border: 1px solid var(--border);
		touch-action: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}
	.modal-m2 {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		bottom: 0;
		width: 100vw;
		padding: 2rem 2rem 12rem 2rem;
		background: var(--bg1);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		border: 1px solid var(--border);
		touch-action: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.drag-bar {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 0.5rem;
		background: rgb(160, 160, 160);
		border-radius: 1rem;
		margin-top: -1rem;
		margin-bottom: 2rem;
	}
	.close-container {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		margin-bottom: 2rem;
	}
	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
</style>
