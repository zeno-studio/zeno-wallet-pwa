<script lang="ts">
	import { CreateAccount, AddAccount } from '$lib/ui/components';
	import { accountState } from '$lib/wallet/runes';
	import { getElement, dbStore, type Account } from '$lib/wallet/common';
	import { EditFilled } from '$lib/svg';

	let accounts = $derived.by(async () =>{
		if (accountState.currentAccountIndex === 0 ) return null;
		else return (await getElement(dbStore.Account.name, 'all')) as Account[];
	});
		
	$effect(() => {
		console.log(accounts);
	});



	function selectedAccount(index: number) {
		accountState.setCurrentAccountIndex(index);
	}
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->
		{#if accountState.currentAccountIndex === 0 }
			<div class="item-container3">
				<h5>Please Create or Import a Account</h5>
			</div>
		{:else }
			{#await accounts then accounts}
				{#if accounts}
					{#each accounts as account}
						<button
							class="accountList"
							class:selected={account.accountIndex === accountState.currentAccountIndex}
							onclick={() => selectedAccount(account.accountIndex)}
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
					{:else }
			
						<h5>No Account</h5>
				{/if}

			{/await}

		{/if}

		<!-- add/import -->
			<div>{accountState.nextAccountIndex}</div>
			
		
		{#await accountState.currentAccount then account}
			{#if account}
				<div>{account.address}</div>
			{/if}
		{/await}


	
			{#if accountState.currentAccountIndex === 0}
			<div class="bottom2"><CreateAccount />
				<button class="bottom-button2"> Import account </button>
			</div>
				
			{/if}

			{#if accountState.currentAccountIndex !== 0}
			<div class="bottom">	<AddAccount /></div>
			
			{/if}
	
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
