<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditFilled } from '$lib/svg';
	import { goto } from '$app/navigation';

	let isHidden = $state(false);

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
	}
</script>

<div class="container">
	<div class="container2">
	<button class="left" class:pressed ={isHidden===false} onclick={() => isHidden = false}>Active Accounts</button>
	<button class="right" class:pressed ={isHidden===true} onclick={() => isHidden = true}>Hidden Accounts</button>
</div>


	{#if !isHidden}
	{#each accountState.accountList as account}
		{#if !account.isHidden}
		<div
			class="accountList"
			class:selected={account.accountIndex === accountState.currentAccountIndex}
			onclick={() => selectedAccount(account.accountIndex)}
		>
			<div class="item">
				<div class="item-l">
					<div class="avatar">{account.accountIndex}</div>
					<div class="content">
						<span class="label">{account.accountName} </span>
					</div>
				</div>
			</div>
			<button class="edit" onclick={() => goto(`#/setting/account_detail`)}><EditFilled class="icon24rem" /></button>
		</div>
		{/if}
	{/each}
	{/if}

	{#if isHidden}
	{#each accountState.accountList as account}
		{#if account.isHidden}
		<div
			class="accountList"
			class:selected={account.accountIndex === accountState.currentAccountIndex}
			onclick={() => selectedAccount(account.accountIndex)}
		>
			<div class="item">
				<div class="item-l">
					<div class="avatar">{account.accountIndex}</div>
					<div class="content">
						<span class="label">{account.accountName} </span>
					</div>
				</div>
			</div>
			<button class="edit" onclick={() => goto(`#/setting/account_detail`)}><EditFilled class="icon24rem" /></button>
		</div>
		{/if}
	{/each}
	{/if}

</div>

<style lang="postcss">
	.pressed {
		background: var(--color-bg2);
	}
	.left {
		background: var(--color-bg1);
		border-bottom-left-radius: 1.6rem;	
		border-top-left-radius: 1.6rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text);
		border: none;
		padding: 1rem 2rem;
		&:hover {
			background: var(--color-bg2);
			color: var(--color);
			transform: translateY(1px);
		}
		&.pressed {
			background: var(--color-bg2);
		}
	}
	.right {
		background: var(--color-bg1);
		border-bottom-right-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text);
		border: none;
		padding: 1rem 2rem;
		&:hover {
			background: var(--color-bg2);
			color: var(--color);
			transform: translateY(1px);
		}
		&.pressed {
			background: var(--color-bg2);
		}
	}
	.container2 {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0rem;
	background: none;
	border:none;
	margin-bottom: 1rem;
	}
	.container {
		margin-bottom: 6.4rem;
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
		width: 4rem;
		height: 4rem;
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
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
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
