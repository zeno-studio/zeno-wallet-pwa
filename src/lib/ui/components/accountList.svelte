<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditIcon } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';
	import { shortenAddress6 } from '$lib/ui/ts';

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
			<div class="accountList">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="entry"
					class:selected={account.accountIndex === accountState.currentAccountIndex}
					onclick={() => selectedAccount(account.accountIndex)}
				>
					<div class="avatar">{@html generateAvatar(account.address)}</div>
					<div class="content">
						<span class="label">{account.name} </span>
						<span class="address">{shortenAddress6(account.address)} </span>
					</div>
					<button
						class="entry-right"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						onclick={() => gotoAccount(account.accountIndex)}
						><EditIcon class="icon18A" />
					</button>
				</div>
			</div>
			{/if}
		{/each}
	{/if}

	{#if isHidden}
		{#each accountState.accountList as account}
			{#if account.isHidden}
				<div class="accountList">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="entry"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						onclick={() => selectedAccount(account.accountIndex)}
					>
						<div class="avatar">{@html generateAvatar(account.address)}</div>
						<div class="content">
							<span class="label">{account.name} </span>
							<span class="address">{shortenAddress6(account.address)} </span>
						</div>
						<button
							class="entry-right"
							class:selected={account.accountIndex === accountState.currentAccountIndex}
							onclick={() => gotoAccount(account.accountIndex)}
							><EditIcon class="icon18A" />
						</button>
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style lang="postcss">
	.entry {
		position: relative;
		display: flex;
		align-items: center;
		padding: 1rem;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: var(--color-bg1);
		border: none;
		border-radius: 1.6rem;
		cursor: pointer;
		&:active {
			background: var(--color-bg2);
			color: var(--color);
			transform: translateY(1px);
		}

	}
	.entry-right{
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 1rem;
		border: none;
		background: none;
		cursor: pointer;
	}
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
	}
	.container {
		margin-bottom: 6.4rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		gap: 0.8rem;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
	.address {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-text);
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
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
		box-sizing: border-box;
		width: 100%;
		background: none;
		border: none;
	}
	.selected {
		background: var(--storm400);
	}
	.label {
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color);
	}
	
</style>
