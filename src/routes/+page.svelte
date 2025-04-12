<script lang="ts">
	import { Tabs, CreateAccount, ImportAccount,Footer,Header } from '$lib/ui/components';
	import { ReceiveIcon, CloseIcon, SendFilled, SwapIcon, BuyIcon, PlugFilled } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { metadata } from '$lib/ui/runes';

metadata.title = 'Assets';
metadata.description = 'Assets';

</script>


<Header />
<div class="appBody">
	<div class="item-container">
		<div class="item">
			<h2>Balance:100$</h2>
		</div>	
	</div>



	<div class="item-container2">
		<div class="menu1">
			<a class="text1" href="/#/receive">
				<ReceiveIcon class="icon3" />
				Receive
			</a>
			<a class="text1" href="/#/send">
				<SendFilled class="icon3" />
				Send
			</a>
			<a class="text1" href="/#/swap">
				<SwapIcon class="icon3" />
				Swap
			</a>
			<a class="text1" href="/#/bridge">
				<PlugFilled class="icon3" />
				Bridge
			</a>
			<a class="text1" href="/#/buy">
				<BuyIcon class="icon3" />
				Buy
			</a>
		</div>
	</div>

	<div class="item-container2">
		{#if accountState.accountList.length === 0}
			<div class="menu2">
				<CreateAccount />
				<ImportAccount />
			</div>
		{/if}
		{#if accountState.nextAccountIndex > 1 && accountState.isBackup === false}
			<div class="backup">
				<button
					class="close"
					onclick={() => {
						accountState.isBackup = true;
					}}
				>
					<CloseIcon class="icon18A" />
				</button>
				<button class="backup-button"> Backup Your Recovery Phrase </button>
			</div>
		{/if}
	</div>
	<Tabs />
</div>
<Footer />
<style lang="postcss">
	.appBody {
	flex-direction: column;
	height: 100%;
	width: 95%;
	max-width: 48rem;
	padding: 6.4rem 1rem 0rem 1rem;
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
	.menu1 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
		height: 100%;
		width: 100%;
		gap: 1rem;
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
		background: var(--bg2);
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
		background: var(--pink);
		border: none;
		border-radius: 1.6rem;
		box-sizing: border-box;
		gap: 0px;
	}

	.backup-button {
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
