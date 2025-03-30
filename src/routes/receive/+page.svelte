<script lang="ts">

	import encodeQR from 'qr';
	import {isSmallScreen,copyText } from '$lib/ui/ts';
	import { CopyIcon} from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { page } from '$app/state';

	let address = $state('');
	let addressSvg = $state('');
	let copied = $state(false)
	let accountName = $state('');


	$effect(() => {
		if (accountState.currentAccount) {
			address = accountState.currentAccount.address;
			addressSvg = encodeQR(address, 'svg', { ecc: 'high' });
			accountName = accountState.currentAccount.accountName;
		}
	})
	function handleCopy() {
		copyText("address");
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
				<div class="qr">{@html addressSvg}</div>

		</div>
		
		<div class="item-container">

			<div class="name">{accountName}</div>	
	</div>
			 
			 {#if copied}
			 <div class="copied" >
				Copied
			</div>
			 {:else }
			 <div class="item-container3">
			 <button class="copy" onclick={handleCopy}>
				<span id="address">{address}</span>&nbsp;	
				<CopyIcon class="icon18A" />
			</button>
				</div>
			 {/if}
			
	

			

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
		background: var(--color-bg);
		border-radius: 1.6rem;
		margin: 2rem;
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

	.copied {
		font-size: 1.6rem;
		font-weight: 600;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: center;
		background: var(--color-blue);
		border: none;
		border-radius: 1.6rem;
		color: #fff;
		padding: 0.5rem;
	}
	.name {
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--color-text);
	}


</style>
