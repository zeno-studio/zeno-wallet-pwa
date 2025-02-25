<script lang="ts">
	import { Toaster,Tabs  } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';
	import { ReceiveIcon, SendFilled, SwapIcon, BuyIcon } from '$lib/svg';

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
		
		<div class="item-container">
			<div class="menu1">
				<div>
					<button class="button1">
						<div>
							<ReceiveIcon class="icon24" />
						</div>
						<div class="text1">Receive</div>
					</button>
				</div>
				<div>
					<button class="button1">
						<div>
							<SendFilled class="icon24" />
						</div>
						<div class="text1">Send</div>
					</button>
				</div>

				<div>
					<button class="button1">
						<div>
							<SwapIcon class="icon24" />
						</div>
						<div class="text1">Swap</div>
					</button>
				</div>
				<div>
					<button class="button1">
						<div>
							<BuyIcon class="icon24" />
						</div>
						<div class="text1">Buy</div>
					</button>
				</div>
			</div>
		</div>

		<div class="item-container2">
			<div class="menu2">
				<button class="button2">Create Account</button>
				<button class="button2">Import Account</button>
			</div>
		</div>

		<Tabs />

		
	</div>
</div>

<style lang="postcss">
	.menu1 {
		width: 100%;
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 12px;
	}
	.button1 {
		min-width: 60px;
		flex-direction: column;
		border-radius: 12px;
		border: 0px;
		padding: 4px 0px;
	}
	.text1 {
		font-size: 1rem;
	}
	.menu2 {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.button2 {
		min-width: 160px;
		flex-direction: column;
		border-radius: 12px;
		border: 0px;
		padding: 12px 0px;
	}

</style>
