<script lang="ts">
	import { CreateAccount, AddAccount, AccountList } from '$lib/ui/components';
	import { accountState } from '$lib/wallet/runes';
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->

		{#if accountState.currentAccountIndex === 0}
			<div class="item-container3">
				<h5>Please Create or Import a Account</h5>
			</div>
		{:else}

		<AccountList />

		{/if}

	
		{#if accountState.currentAccountIndex === 0}
			<div class="bottom2">
				<CreateAccount />
				<button class="bottom-button2"> Import account </button>
			</div>
		{:else if accountState.currentAccountIndex > 0 && accountState.nextAccountIndex < 21}
			<div class="bottom"><AddAccount /></div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.bottom-button2 {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-purple);
		box-sizing: border-box;
		width: 100%;
		justify-content: center;
		padding: 1rem;
		cursor: pointer;
	}

	.bottom {
		gap: 1rem;
		position: fixed;
		bottom: 64px;
		width: 100%;
		height: 80px;
		flex-direction: column;
		max-width: 480px;
		background-color: var(--color-bg);
	}

	.bottom2 {
		gap: 1rem;
		position: fixed;
		bottom: 64px;
		width: 100%;
		height: 120px;
		flex-direction: column;
		max-width: 480px;
		background-color: var(--color-bg);
	}
</style>
