<script lang="ts">
	import {isSmallScreen } from '$lib/ui/ts';
	import { SettingFilled } from '$lib/svg';
	import { page } from '$app/state';


</script>

<div class="appContainer">
	<div class="appBody" class:active={isSmallScreen.current}>
		<div class="item-container2">
			<div class="item">
				<div class="item-l">
					<button class="button-label" class:active1={page.route.id == '/receive'}>
						<a href="/#/receive" class:active1={page.route.id == '/receive'} aria-label="Setting"
							>Receive</a
						>
					</button>
					<button class="button-label" class:active1={page.route.id == '/send'}>
						<a href="/#/send" class:active1={page.route.id == '/send'} aria-label="Setting">Send</a>
					</button>
					<button class="button-label" class:active1={page.route.id == '/swap'}>
						<a href="/#/swap" class:active1={page.route.id == '/swap'} aria-label="Setting">Swap</a>
					</button>
					<button class="button-label" class:active1={page.route.id == '/buy'}>
						<a href="/#/buy" class:active1={page.route.id == '/buy'} aria-label="Setting">Buy</a>
					</button>
				</div>
				<div class="item-r">
					<SettingFilled class="icon2rem" />
				</div>
			</div>
		</div>
		<div class="item-container">
		</div>
	</div>
</div>

<style>
		
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
	.appBody {
		padding-top: 48px;
	}
	.active {
		padding-top: 20px;
	}
	a {
		font-size: 1.3rem;
		font-weight: 600;
	}


	.active1 {
		background: var(--color-bg2);
		color: var(--color);
	}
</style>
