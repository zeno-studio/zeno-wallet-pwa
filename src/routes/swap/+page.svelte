<script lang="ts">
	import encodeQR from 'qr';
	import {isSmallScreen } from '$lib/ui/ts';
	import { SettingFilled } from '$lib/svg';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let address = '0xeDf074bd2c3FC10A296E7C9c52BfD80ab5d2A9E9';
	const addressSvg = encodeQR(address, 'svg');
	onMount(() => {
		console.log(
			document.getElementById('delete')
		);
	});
</script>

<div class="appContainer" >
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
					<SettingFilled class="icon18A" />
				</div>
			</div>
		</div>
		<div class="item-container">
			
		
		</div>
	</div>
</div>

<button id="delete" >Delete Account</button>

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
		padding-top: 4rem;
	}
	.active {
		padding-top: 2rem;
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
