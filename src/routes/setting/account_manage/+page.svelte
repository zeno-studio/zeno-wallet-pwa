<script lang="ts">
	import { CreateAccount, AddAccount, AccountList } from '$lib/ui/components';
	import { accountState } from '$lib/wallet/runes';
	$effect(() => {
		console.log(accountState.currentAccountIndex);
	});
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->

		{#if accountState.currentAccountIndex === 0}
			<div class="item-container3">
				<h5>Please Create or Import a Account</h5>
			</div>
		{:else}
		{#key accountState.currentAccountIndex}
		<AccountList />
		{/key}
		{/if}

		<!-- add/import -->
			<div>{accountState.currentAccountIndex}</div>

		{#await accountState.currentAccount then account}
			{#if account}
				<div>{account.address}</div>
			{/if}
		{/await}

		{#if accountState.currentAccountIndex === 0}
			<div class="bottom2">
				<CreateAccount />
				<button class="bottom-button2"> Import account </button>
			</div>
		{/if}

		{#if accountState.currentAccountIndex !== 0}
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
