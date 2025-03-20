<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { getElement, dbStore, type Account } from '$lib/wallet/common';
	import { EditFilled } from '$lib/svg';


	function selectedAccount(index: number) {
		accountState.setCurrentAccountIndex(index);
	}



	let accounts = $derived.by(async () => {
		const data = await getElement(dbStore.Account.name, 'all') as Account[];
		return {data, Index: accountState.currentAccountIndex};
	});


</script>

{#await accounts then accounts}
	{#if accounts.data}
		{#each accounts.data as account}
			<button
				class="accountList"
				class:selected={account.accountIndex === accounts.Index}
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
	{:else}
		<h5>No Account</h5>
	{/if}
{/await}


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
