<script lang="ts">

	import encodeQR from 'qr';
	import {isSmallScreen,copyText } from '$lib/ui/ts';
	import { CopyIcon,CopiedIcon,ContractIcon } from '$lib/svg';
	import { page } from '$app/state';

	let address = '0xeDf074bd2c3FC10A296E7C9c52BfD80ab5d2A9E9';
	const addressSvg = encodeQR(address, 'svg');
	let copied = $state(false)
	function handleCopy() {
		copyText('address');
		copied = true
		setTimeout(() => {
			copied = false
		}, 2000);
	}




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

			</div>
		</div>
		<div class="item-container">
			<div class="item">
				<div class="qr">{@html addressSvg}</div>
			</div>
		</div>
		<div class="item-container">
			<div class="item">
			 <span id="address">{address}</span>

			 {#if copied}
			 <button class="copy" >
				<CopiedIcon class="icon18G" />
			</button>
			 {:else }
			 <button class="copy" onclick={handleCopy}>
				<CopyIcon class="icon18A" />
			</button>
			 {/if}
			
			</div>
		</div>

			

	</div>
</div>

<style lang="postcss">
	.item-container {
		margin-bottom: 4px;
	}
	.appBody {
		padding-top: 64px;
	}
	.active {
		padding-top: 20px;
	}
	.qr {
		padding: 20px;
		width: 200px;
		height: 200px;
		fill: var(--color);
		stroke: none;
		background: var(--color-bg);
		border-radius: 16px;
		margin: 20px;
		border: 1px solid var(--color-border);
	}
	a {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.active1 {
		background: var(--color-bg2);
		color: var(--color);
	}
	#address {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-text);
	}
	.copy {
		display: flex;
		justify-content: center;
		background: none;
		border: none;
	}


</style>
