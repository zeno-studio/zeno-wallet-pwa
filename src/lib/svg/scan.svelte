<script>
	let {
		color = 'currentColor',
		size = 24,
		strokeWidth = 2,
		classes = ''
	} = $props();
</script>

<div class={classes} >
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke={color}
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="scan-icon"
	>
<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>
</div>
<style>
	.scan-icon {
		color : var(--color-text);
		overflow: visible;
		transition: all 0.2s ease-in;
	}

    .scan-icon:hover{
        color : var(--color-cyan);
		transform: scale(1.1);
    }
</style>
