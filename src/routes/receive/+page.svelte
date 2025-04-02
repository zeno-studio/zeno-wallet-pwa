<script lang="ts">
	import {isSmallScreen,copyText } from '$lib/ui/ts';
	import { CopyIcon} from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { page } from '$app/state';
	import QrCodeWithLogo from 'qrcode-with-logos'

  let qrcode = $state<QrCodeWithLogo | null>(null);
	let copied = $state(false)



	function handleCopy() {
		copyText("address");
		copied = true
		setTimeout(() => {
			copied = false
		}, 2000);
	}



	$effect(() => {
		if (accountState.currentAccount) {
				qrcode = new QrCodeWithLogo({
			  content: accountState.currentAccount.address,
			  width: 500,
			  logo: {
				  src: "/favicon.svg",
				  logoRadius: 8,
				  borderWidth: 0
				},
			  dotsOptions: {
				  type: 'dot',
				  color: '#000000'
				},
			  cornersOptions: {
				  type: 'circle',
				  color: '#000000'
				}
			})
		}
	})







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
			{#await qrcode?.getCanvas() then canvas}
			<img class="qr" src={canvas?.toDataURL()} alt="" />
			<div>
				<div class="name">{accountState.currentAccount?.accountName}</div>	</div>

			<div>
				<button class="share-l" onclick={() => {
					if (navigator.share) {
						navigator.share({
							title: 'Qr Code',
							files: [new File([canvas?.toDataURL() || ''], 'qr.png', { type: 'image/png' })]
						})
					}
				}}>
					Share Qrcode
				</button>

				<button class="share-r" onclick={() => {
					if (navigator.share) {
						navigator.share({
							title: 'Address',
							text: accountState.currentAccount?.address || ''
						})
					}
				}}>
					Share Address
				  </button>
			</div>
			

		  {/await}
				

		</div>	
		
			 
			 {#if copied}
			 <div class="copied" >
				Copied
			</div>
			 {:else }
			 <div class="item-container3">
			 <button class="copy" onclick={handleCopy}>
				<span id="address">{accountState.currentAccount?.address}</span>&nbsp;	
				<CopyIcon class="icon18A" />
			</button>
				</div>
			 {/if}
			
	

			

	</div>
</div>

<style lang="postcss">

.item-container {
		margin-bottom: 0.4rem;
	}
	.appBody {
		padding-top: 4rem;
	}
	.active {
		padding-top: 2rem;
	}
	.share-l{
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
		border-top-left-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;
		border:1px solid var(--color-bg3);
		background:none;
		color: var(--color-text);
		cursor: pointer;
		&:hover {
			background: var(--green4);	
			color: #fff;
		}	
	}
	.share-r{
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
		border-top-right-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		border:1px solid var(--color-bg3);
		background:none;
		color: var(--color-text);
		cursor: pointer;
		&:hover {
			background: var(--green4);
			color: #fff;
		}
	}
	.qr {
		width: 30rem;
		height: 30rem;
		fill: var(--color);
		border-radius: 3rem;
		margin: 2rem;
		border: 1px solid var(--color-bg3);
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
		cursor: pointer;
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
		color: var(--color);
	}


</style>
