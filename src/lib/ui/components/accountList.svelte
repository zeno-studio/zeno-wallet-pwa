<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditIcon } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';
	import { shortenAddress6 } from '$lib/ui/ts';

	let tab = $state<'active' | 'hidden'>('active');

	function selectedAccount(i: number) {
		accountState.setCurrentAccountIndex(i);
	}

	function generateAvatar(address: string) {
		return toSvg(address, 30);
	}

	function gotoAccount(i: number) {
		goto('#/settings/account_detail');
		accountState.editingAccountIndex = i;
	}
</script>

<div class="list-container">
	<div class="container">
		<div class="tabs">
			<input type="radio" id="radio-1" name="tabs" bind:group={tab} value="active" />
			<label class="tab" for="radio-1">Active Accounts</label>
			<input type="radio" id="radio-2" name="tabs" bind:group={tab} value="hidden" />
			<label class="tab" for="radio-2">Hidden Accounts</label>
			<span class="glider"></span>
		</div>
	</div>

	{#if tab === 'active'}
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
						<div class="avatar">
							{@html generateAvatar(account.address)}
							{#if account.addressType === 'POLKADOT'}
								<img class="chain-logo" src="/token/dot.svg" alt="" />
							{/if}
						</div>
						<div class="content">
							<span class="label">{account.name} </span>
							<span class="address">{shortenAddress6(account.address)} </span>
						</div>
						<button
							class="entry-right"
							class:selected={account.accountIndex === accountState.currentAccountIndex}
							onclick={(e) => {
								e.stopPropagation();
								gotoAccount(account.accountIndex);
							}}
							><EditIcon class="icon18A" />
						</button>
					</div>
				</div>
			{/if}
		{/each}
	{/if}

	{#if tab === 'hidden'}
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
						<div class="avatar">
							{@html generateAvatar(account.address)}

							{#if account.addressType === 'POLKADOT'}
								<img class="chain-logo" src="/token/dot.svg" alt="" />
							{/if}
						</div>
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
	.chain-logo {
		position: absolute;
		box-sizing: border-box;
		width: 1.5rem;
		height: 1.5rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}
	.entry {
		padding: 0.4rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: var(--bg1);
		border: none;
		border-radius: 1.6rem;
		cursor: pointer;
		&:active {
			background: var(--bg2);
			color: var(--color);
			transform: translateY(1px);
		}
	}
	.entry-right {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 1rem;
		border: none;
		background: none;
		cursor: pointer;
		margin-right: 1rem;
	}

	.list-container {
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
		color: var(--text);
	}
	.avatar {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
		border: 2px solid var(--border);
	}

	.accountList {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
		width: 100%;
		background: none;
		border: none;
	}
	.selected {
		background: var(--green3);
	}
	.label {
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color);
	}

	/* tab */
	.tabs {
		display: flex;
		position: relative;
		background-color: var(--bg2);
		padding: 0.4rem;
		border-radius: 1.6rem;
		border: 1px solid var(--border);
		width: 30rem;
		margin: 0 auto;
	}

	.tabs * {
		z-index: 2;
	}

	.container input[type='radio'] {
		display: none;
	}
	.container input[type='radio']:checked + label {
		color: var(--color);
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3.6rem;
		width: 15rem;
		font-size: 1.3rem;
		color: var(--text);
		font-weight: 700;
		border-radius: 1.6rem;
		cursor: pointer;
		transition: color 0.15s ease-in;
	}

	.container input[id='radio-1']:checked ~ .glider {
		transform: translateX(0);
	}

	.container input[id='radio-2']:checked ~ .glider {
		transform: translateX(100%);
	}

	.glider {
		position: absolute;
		display: flex;
		left: 0.4rem;
		height: 3.6rem;
		width: 15rem;
		background-color: var(--bg);
		z-index: 1;
		border-radius: 1.2rem;
		transition: 0.25s ease-out;
	}
</style>
