<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { page } from '$app/state';
	import { Header } from '$lib/ui/components';
</script>

<Header />
<div class="appBody" class:active={isSmallScreen.current}>
	<div class="item-container2">
		<div class="item">
			<div class="item-l">
				<button class="button-label" class:active1={page.route.id == '/receive'}>
					<a href="/#/receive" class:active1={page.route.id == '/receive'} aria-label="Settings"
						>Receive</a
					>
				</button>
				<button class="button-label" class:active1={page.route.id == '/send'}>
					<a href="/#/send" class:active1={page.route.id == '/send'} aria-label="Settings">Send</a>
				</button>
				<button class="button-label" class:active1={page.route.id == '/swap'}>
					<a href="/#/swap" class:active1={page.route.id == '/swap'} aria-label="Settings">Swap</a>
				</button>
				<button class="button-label" class:active1={page.route.id == '/buy'}>
					<a href="/#/buy" class:active1={page.route.id == '/buy'} aria-label="Settings">Buy</a>
				</button>
			</div>
		</div>
	</div>
	<div class="item-container"></div>
</div>

<style>
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 10.4rem 1rem 0rem 1rem;
	}
	.active {
		padding: 8.4rem 1rem 0rem 1rem;

	}
	.item-container {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.item-container2 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding: 0px;
		margin-bottom: 1rem;
	}
	.item {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		font-size: 1.5rem;
		font-weight: 500;
		padding: 0px;
		background: none;
		border: none;
		color: var(--color);
	}

	.item-l {
		display: flex;
	}

	.button-label {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 7rem;
		height: 3.5rem;
		margin-right: 0.4rem;
		border-radius: 1.6rem;
		border: none;
		background: none;
		cursor: pointer;
	}

	a {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.active1 {
		background: var(--bg1);
		color: var(--color);
	}
</style>
