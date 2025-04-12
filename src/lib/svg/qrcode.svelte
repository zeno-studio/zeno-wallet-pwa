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
	><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
</div>
<style>
	.scan-icon {
		color : var(--text);
		overflow: visible;
		transition: all 0.2s ease-in;
	}

    .scan-icon:hover{
        color : var(--color-cyan);
		transform: scale(1.1);
    }
</style>
