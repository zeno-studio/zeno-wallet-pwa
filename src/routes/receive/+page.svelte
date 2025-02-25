<script lang="ts">
	import { type AccountInfo } from '$lib/wallet/common';
	import encodeQR from '@paulmillr/qr';
	import {isSmallScreen,copyText } from '$lib/ui/ts';
	import { SettingFilled,CopiedIcon } from '$lib/svg';
	import { page } from '$app/state';

	let address = '0xeDf074bd2c3FC10A296E7C9c52BfD80ab5d2A9E9';
	const addressSvg = encodeQR(address, 'svg');
	function handleCopy() {
		copyText('address');
		document.querySelector('.copyIcon').style.color = 'var(--color-green)';
		setTimeout(() => {
			document.querySelector('.copyIcon').style.color = 'var(--color-text)';
		}, 2000);
	}
function shareAddress() {
	const shareData = {
		title: 'My Address',
		text: `Check out this address: ${address}`,
		url: window.location.href
	};
	
	try {
		if (navigator.share) {
			navigator.share(shareData).then(() => {
				console.log('Address shared successfully');
			}).catch((error) => {
				console.error('Error sharing address:', error);
			});
		} else {
			alert('Share feature is not supported in your browser.');
		}
	} catch (error) {
		console.error('Error during sharing:', error);
	}
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
			<span class="addressLabel">Address: &nbsp</span>
			 <span id="address">{address}</span>
			
					<button class="copy" onclick={handleCopy}>
						<CopiedIcon class="copyIcon" />
					</button>
			
			</div>
		</div>

			<button class="button-full" onclick={shareAddress}>share</button>

	</div>
</div>

<style>
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
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
	}
	.addressLabel {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-text);
	}
	.copy {
		background: none;
		border: none;
	}


</style>
