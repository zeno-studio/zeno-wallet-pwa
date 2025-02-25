<script lang="ts">
	import { toastState, type Toast } from '$lib/ui/runes';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';


	type Props = {
		toast: Toast;
	};
</script>

<div class="">
	{#each toastState.toasts as toast (toast.id)}
		<div
			class="toast"
			animate:flip={{ duration: 200 }}
			in:fly={{ duration: 200, x: 20 }}
			out:fade={{ duration: 120 }}
		>
			<span>{toast.title}</span>
			<span>{toast.message}</span>
			<button onclick={() => toastState.remove(toast.id)}>
				<span>Close toast</span>
			</button>
		</div>
	{/each}
</div>

<style>



</style>
