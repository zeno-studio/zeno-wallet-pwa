<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { fade, fly } from 'svelte/transition';
	import { Gesture } from '@use-gesture/vanilla';
	import { CloseIcon, ArrowBack } from '$lib/svg';
	import { setContext } from 'svelte';


	type Mode = 'full' | 'half';

	interface PageHistory {
		page: number;
		title: string;
	}

	let {
		modalName = $bindable(),
		mode,
		children
	} = $props<{
		modalName: boolean;
		mode: Mode;
		children: () => any;
	}>();
	let page = $state(1);
	let title = $state("");
	let history = $state<PageHistory[]>([]); // 初始化历史栈
	let modalBody = $state<HTMLElement | null>(null);
	let y = $state(0);

	

	const closeModal=() =>{
		modalName = false;
		page = 1;
		title = '';
		history = []; // 重置历史栈
		y = 0;
	}

	const updatePageTitle=(newPage: number, newTitle: string)=> {
		page = newPage;
		title = newTitle;
		history = [...history, { page: newPage, title: newTitle }];
	}

    setContext('modal', {
		isModalOpen: () => modalName,
        currentPage:() => page,
		closeModal,
		updatePageTitle
	});

	const goBack=()=> {
		if (history.length > 1) {
			history = history.slice(0, -1);
			const lastEntry = history[history.length - 1];
			page = lastEntry.page;
			title = lastEntry.title;
		}
	}

	const handleBackdropClick=(event: MouseEvent)=> {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	$effect(() => {
		if (modalName && !isSmallScreen.current) {
			const handleKeydown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					closeModal();
				}
			};
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});

	$effect(() => {
		if (modalBody && modalName && isSmallScreen.current) {
			const gesture = new Gesture(modalBody, {
				onDrag: ({ movement: [, my], velocity: [, vy], direction: [, dy] }) => {
					if (my > 0) y = my;
					if (my > 200 && vy > 0.5 && dy > 0) {
						closeModal();
					}
				},
				onDragEnd: () => {
					if (modalName && y > 0) y = 0;
				}
			});
			return () => gesture.destroy();
		}
	});
</script>

{#if modalName}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="backdrop"
		role="dialog"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		tabindex="-1"
	>
		<div
			bind:this={modalBody}
			class={{
				modal: !isSmallScreen.current && mode === 'full',
				'modal-m': isSmallScreen.current && mode === 'full',
				modal2: !isSmallScreen.current && mode === 'half',
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
				<div class="top">
					{#if page > 1}
						<button class="back-btn" onclick={goBack}>
							<ArrowBack class="icon2A" />
						</button>
					{/if}
					<div class="model-tilte" >{title}</div>
				</div>
			{:else}
				<div class="top">
					{#if page > 1}
						<button class="back-btn" onclick={goBack}>
							<ArrowBack class="icon2A" />
						</button>
					{/if}
					<div class="model-tilte">{title}</div>
					<button class="close-btn" onclick={closeModal}>
						<CloseIcon class="icon2A" />
					</button>
				</div>
			{/if}
			{@render children()}
		</div>
	</div>
{/if}

<style lang="postcss">
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

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

	.model-tilte{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.8rem;
	font-weight: 700;

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

	.top {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		margin-top: 1rem;
		margin-bottom: 3rem;
	}

	.back-btn {
		display: flex;
		position: absolute;
		left: 0;
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
	.close-btn {
		display: flex;
		position: absolute;
		right: 0;
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
</style>
