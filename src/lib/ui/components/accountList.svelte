<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditFilled } from '$lib/svg';

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
	}

	$effect(() => {
	console.log(accountState.accountListDetail)
});

</script>
{#key accountState.accountList}
{#await accountState.accountListDetail }
<h5>waiting</h5>
{:then accounts}
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
{/await}

	
{/key}






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
