<script lang="ts">
	import { Toaster, Tabs } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';
	import { ReceiveIcon, SendFilled, SwapIcon, BuyIcon,PlugFilled} from '$lib/svg';
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
				<a class="text1" href="/#/swap">
					<PlugFilled class="icon3rem" />
					Bridge
				</a>
				<a class="text1" href="/#/swap">
					<BuyIcon class="icon3rem" />
					Buy
				</a>
			</div>
		</div>

		<div class="item-container2">
			<div class="menu2">
				<button class="button2">Create Account</button>
				<button class="button3">Import Account</button>
			</div>
		</div>

		<Tabs />
	</div>
</div>

<style lang="postcss">
	.menu1 {
		width: 100%;
		display: flex;
		justify-content: space-around;

	}
	.text1 {
		width: 54px;
		height: 54px;
		border-radius: 12px;
		border: 0px;
		padding: 4px;
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
		gap: 12px;
	}
	.button2 {
		color: #fff;
		min-width: 160px;
		flex-direction: column;
		border-radius: 12px;
		border: 0px;
		padding: 12px 0px;
		background: var(--color-blue);
	}
	.button3 {
		color: #fff;
		min-width: 160px;
		flex-direction: column;
		border-radius: 12px;
		border: 0px;
		padding: 12px 0px;
		background: var(--color-pink);
	}
</style>
