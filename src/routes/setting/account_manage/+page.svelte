<script lang="ts">
	import { CreateAccount, AddAccount } from '$lib/ui/components';
	import { accountState } from '$lib/wallet/runes';
	import { getElement, dbStore, type Account } from '$lib/wallet/common';
	import { EditFilled } from '$lib/svg';

	let accounts = $state<Account[]>();

	async function getAccounts() {
		const data = (await getElement(dbStore.Account.name, 'all')) as Account[] | null;
		if (data) {
			accounts = data;
		}
	}
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->
		{#if accountState.currentAccountIndex === 0}
			<div class="item-container3">
				<h5>Please Create or Import a Account</h5>
			</div>
		{:else}
			{#await getAccounts() then value}
				{#if accounts}
					{#each accounts as account}
						<button
							class="accountList"
							class:selected={account.accountIndex === accountState.currentAccountIndex}
						>
							<div class="item">
								<div class="item-l">
									<div class="avatar">{account.accountIndex}</div>
									<span class="title">{account.accountName} </span>
								</div>
							</div>
							<a class="edit" href="/#/setting/account_detail"><EditFilled class="icon2rem" /></a>
						</button>
					{/each}
				{/if}
			{/await}
		{/if}

		<!-- add/import -->
		{#if accounts}
			<div>{accounts[0].address}</div>
		{/if}

		<div class="bottom">
			{#if accountState.currentAccountIndex === 0}
				<CreateAccount />
				<button class="bottom-button2"> Import account </button>
			{/if}
			{#if accountState.currentAccountIndex !== 0}
				<AddAccount />
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.avatar {
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		margin-left: 1rem;
		border-radius: 20px;
		background-color: var(--color-pink);
		color: #fff;
	}

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

	:popover-open {
		gap: 1rem;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		color: var(--color-text);
		height: 80%;
		width: 384px;
		padding: 16px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
	}
	.bottom {
		gap: 1rem;
		position: fixed;
		bottom: 100px;
		width: 100%;
		height: 48px;
		flex-direction: column;
		max-width: 480px;
	}

	.edit {
		padding: 0px;
		cursor: pointer;
		background: none;
		border: none;
	}
	.accountList {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: var(--color-bg1);
		border-radius: 16px;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 8px;
		border: none;
		&:hover {
			background: var(--green3);
		}
	}
	.selected {
		background: var(--green3);
	}
</style>
