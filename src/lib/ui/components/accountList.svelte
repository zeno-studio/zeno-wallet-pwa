<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditFilled } from '$lib/svg';

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
	}



</script>

<div class="container">


{#each accountState.accountList as account }

<button	 class="accountList"
	class:selected={account.accountIndex === accountState.currentAccountIndex}
	onclick={() => selectedAccount(account.accountIndex)}
>
	<div class="item">				<div class="item-l">
			<div class="avatar">{account.accountIndex}</div>
			<div class="content">
				<span class="label">{account.accountName} </span>
			</div>
		</div>
	</div>
	<a class="edit" href="/#/setting/account_detail"><EditFilled class="icon25rem" /></a>
</button>
{/each}






</div>









<style lang="postcss">
	.container {
		margin-bottom: 64px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
	.avatar {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		margin-left: 1rem;
		margin-right: 1rem;
		border-radius: 50%;
		padding: 0px;
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
			background: var(--color-bg3);
		}
	}
	.selected {
		background: var(--green4);
	}
	.label {
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
	}
</style>
