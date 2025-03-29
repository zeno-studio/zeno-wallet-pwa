<script lang="ts">
	import { Toaster, Tabs,CreateAccount,ImportAccount } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';
	import { ReceiveIcon,CloseIcon, SendFilled, SwapIcon, BuyIcon,PlugFilled } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';

</script>

<Toaster />

<div class="appContainer">
	<div class="appBody">
		<div class="item-container">
			<div class="item">
				<h2>Balance:100$</h2>
			</div>

			<button onclick={() => toastState.add('title', 'message')}>sdf</button>
		</div>

		<div class="item-container2">
			<div class="menu1">
				<a class="text1" href="/#/receive">
					<ReceiveIcon class="icon3rem" />
					Receive
				</a>
				<a class="text1" href="/#/send">
					<SendFilled class="icon3rem" />
					Send
				</a>
				<a class="text1" href="/#/swap">
					<SwapIcon class="icon3rem" />
					Swap
				</a>
				<a class="text1" href="/#/bridge">
					<PlugFilled class="icon3rem" />
					Bridge
				</a>
				<a class="text1" href="/#/buy">
					<BuyIcon class="icon3rem" />
					Buy
				</a>
				
			</div>
		</div>
		
	

		<div class="item-container2">
			{#if accountState.nextAccountIndex===1}
			<div class="menu2">
				<CreateAccount />
				<ImportAccount />
			</div>	
			{/if}
			{#if accountState.nextAccountIndex > 1 && accountState.isBackup === false }
			<div class="backup">
	
				<button class="close" onclick={()=>{accountState.isBackup = true}}>
					<CloseIcon class="icon18A" />
				</button>
				<button class="backup-button">
					Backup Your Recovery Phrase
				</button>
				
			</div>	
			{/if}


			
		</div>

		<Tabs />
	</div>
</div>

<style lang="postcss">
	.menu1 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
		height: 100%;
		width: 100%;
		gap:1rem;
	}

	.text1 {
		aspect-ratio: 1 / 0.8;
		border-radius: 1.6rem;
		border: 0px;
		color: var(--color);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 1rem;
		background: var(--color-bg2);
	}
	.menu2 {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.backup {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding: 1rem;
		background: var(--color-pink);
		border: none;
		border-radius: 1.6rem;
		box-sizing: border-box;
		gap:0px
	}

	.backup-button{
		display: flex;
		justify-content: center;
		width: 100%;
		background: none;
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		border: none;
		cursor: pointer;
	}

</style>
