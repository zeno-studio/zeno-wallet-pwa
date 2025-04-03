<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditIcon } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';

	let isHidden = $state(false);

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
	}

	function generateAvatar(address: string) {
		return toSvg(address, 30);
	}

	function gotoAccount(i: number) {
		goto('#/setting/account_detail');
		accountState.editingAccountIndex = i;
	}
</script>

<div class="container">
	<div class="container2">
		<button class="left" class:pressed={isHidden === false} onclick={() => (isHidden = false)}
			>Active Accounts</button
		>
		<button class="right" class:pressed={isHidden === true} onclick={() => (isHidden = true)}
			>Hidden Accounts</button
		>
	</div>

	{#if !isHidden}
		{#each accountState.accountList as account}
			{#if !account.isHidden}
				<div class="accountList" >
					<button
						class="label-left"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						onclick={() => selectedAccount(account.accountIndex)}
					>
						<div class="avatar">{@html generateAvatar(account.address)}</div>
						<div class="content">
							<span class="label">{account.accountName} </span>
						</div>
					</button>
					<button
						class="label-right"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						onclick={() => gotoAccount(account.accountIndex)}
						><EditIcon class="icon18A" />
					</button>
				</div>
			{/if}
		{/each}
	{/if}

	{#if isHidden}
		{#each accountState.accountList as account}
			{#if account.isHidden}
			<div class="accountList" >
				<button
					class="label-left"
					class:selected={account.accountIndex === accountState.currentAccountIndex}
					onclick={() => selectedAccount(account.accountIndex)}
				>
					<div class="avatar">{@html generateAvatar(account.address)}</div>
					<div class="content">
						<span class="label">{account.accountName} </span>
					</div>
				</button>
				<button
					class="label-right"
					class:selected={account.accountIndex === accountState.currentAccountIndex}
					onclick={() => gotoAccount(account.accountIndex)}
					><EditIcon class="icon18A" />
				</button>
			</div>
			{/if}
		{/each}
	{/if}
</div>

<style lang="postcss">
	.pressed {
		background: var(--green4);
		color: #fff;
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
			background: var(--green4);
			color: #fff;
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
			background: var(--green4);
			color: #fff;
		}
	}
	.container2 {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0rem;
		background: none;
		border: none;
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
		box-sizing: border-box;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
		border: 2px solid var(--color-border);
	}

	.accountList {
		display: grid;
		grid-template-columns: 1fr 5rem;
		padding: 0rem;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: none;
		border: none;
		margin-bottom: 0.8rem;

	}
	.selected {
		background: var(--green4);
	}
	.label {
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
	}
	.label-left {
		display: flex;
		font-size: 1.8rem;
		font-weight: 600;
		padding: 1rem;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		background: var(--color-bg1);
		border: none;
		border-top-left-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--color-bg2);
		}
		&.selected {
			background: var(--green4);
		}
	}
	.label-right {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: var(--color-bg1);
		border: none;
		border-top-right-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--color-bg2);
		}
		&.selected {
			background: var(--green4);
		}
	}
</style>
