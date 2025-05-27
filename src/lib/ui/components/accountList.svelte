<script lang="ts">
	import { accountState } from '$lib/wallet/runes';
	import { EditIcon } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';
	import { shortenAddress6 } from '$lib/ui/ts';

	let tab = $state<'active' | 'hidden'>('active');

	const selectedAccount = (i: number) => {
		accountState.setCurrentAccountIndex(i);
	}

	const generateAvatar = (address: string)  =>{
		return toSvg(address, 34);
	}

	const gotoAccount=(i: number) => {
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
					<div
						class="entry"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						onclick={() => selectedAccount(account.accountIndex)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								selectedAccount(account.accountIndex);
							}
						}}
						role="button"
						tabindex="0"
					>
						<div class="avatar">
							{@html generateAvatar(account.address)}
						</div>
						<div class="content">
							<div
								class="label-m"
								class:selected2={account.accountIndex === accountState.currentAccountIndex}
								style="font-weight: 600;"
								>{account.name}
							</div>
							<div class="address" class:selected2={account.accountIndex === accountState.currentAccountIndex}>{shortenAddress6(account.address)} </div>
						</div>
						<button
							class="entry-right"
							onclick={(e) => {
								e.stopPropagation();
								gotoAccount(account.accountIndex);
							}}
							aria-label="edit account"
							tabindex="0"
							><EditIcon class="icon2A" />
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
					<div
						class="entry"
						class:selected={account.accountIndex === accountState.currentAccountIndex}
						onclick={() => selectedAccount(account.accountIndex)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								selectedAccount(account.accountIndex);
							}
						}}
						role="button"
						tabindex="0"
					>
						<div class="avatar">
							{@html generateAvatar(account.address)}

						</div>
						<div class="content">
							<div class="label-m" style="font-weight: 600;"
								class:selected2={account.accountIndex === accountState.currentAccountIndex}>{account.name}
							</div>
							<div class="address" class:selected2={account.accountIndex === accountState.currentAccountIndex}>{shortenAddress6(account.address)} </div>
						</div>
						<button
							class="entry-right"
							onclick={(e) => {
								e.stopPropagation();
								gotoAccount(account.accountIndex);
							}}
							><EditIcon class="icon2" />
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
		width: 1.8rem;
		height: 1.8rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		margin: 0;
		background-color: var(--primary);
	}
	.entry {
		padding: 0.4rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		height: 6.8rem;
		flex-direction: row;
		background: var(--bg1);
		border: none;
		border-radius: 1.6rem;
		cursor: pointer;
		outline: none;
	
		&:active {
			transform: translateY(1px);
		}
	}
	.entry-right {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 1rem;
		width: 3.5rem;
		height: 3.5rem;
		border: none;
		background: none;
		cursor: pointer;
		margin-right: 1rem;
		border-radius: 50%;
		background: var(--bg);
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
		font-weight: 500;
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
		background:var(--bg3);
		border:2px solid var(--accent-blue)
	}
	.selected2 {
		color: var(--color);
	}

	/* tab */
	.tabs {
		display: flex;
		position: relative;
		background-color: none;
		padding: 0.2rem;
		width: 30rem;
		margin: 0 auto;
		border-radius: 2.2rem;
		background: var(--bg4);
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
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.1s ease-in;
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
		left: 0.2rem;
		height: 3.6rem;
		width: 15rem;
		background-color: var(--bg);
		z-index: 1;
		border-radius: 2rem;
		transition: 0.25s ease-out;
	}
</style>
