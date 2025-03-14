<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { accountState } from '$lib/wallet/runes';
	import { createEvmAccount, getElement, dbStore, type Account } from '$lib/wallet/common';
	import { WalletIcon, ArrowForward, EditFilled, CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';
	import { passwordStrength } from 'check-password-strength';

	let createSuccess = $state(false);
	let terms = $state(false);
	let password = $state('');
	let password2 = $state('');
	let passwordShow = $state(false);
	let psStrength = $derived(passwordStrength(password).value);
	let accounts = $state<Account[]>();

	function handleCreateEvmAccount(ps: string) {
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			createEvmAccount(1, 0, ps);
			settings.nextEvmAddressIndex++;
			settings.nextAccountIndex++;
			settings.currentAccountIndex = 1;
			localStorage.setItem('settings', JSON.stringify(settings));
			accountState.currentAccountIndex = 1;
			const popover = document.getElementById('create');
		if (popover) {
			popover.hidePopover();
			password = '';
			password2 = '';
			terms = false;
			passwordShow = false;
		}
		}

	}
	
	function handleAddEvmAccount(ps: string) {
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			createEvmAccount(settings.nextAccountIndex, settings.nextEvmAddressIndex, ps);
			settings.nextEvmAddressIndex++;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
		createSuccess = true;
	}

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
	
							<button class="accountList" class:selected={account.accountIndex === accountState.currentAccountIndex}	 >
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
				<button class="bottom-button" popovertarget="create" popovertargetaction="show">
					Create account
				</button>
				<button class="bottom-button2"> Import account </button>
			{/if}
			{#if accountState.currentAccountIndex !== 0}
				<button class="bottom-button"> Add new account </button>
			{/if}
		</div>
	</div>
</div>

<div id="create" popover="manual" class:active={isSmallScreen.current}>
	<button class="close" popovertarget="create" popovertargetaction="hide">
		<CloseIcon class="icon17A" />
	</button>
	<h3>Create New Account</h3>
	<div class="container">
		{#if passwordShow}
			<input
				class="input"
				type="text"
				placeholder="Please input your password"
				bind:value={password}
			/>
		{:else}
			<input
				class="input"
				type="password"
				placeholder="Please input your password"
				bind:value={password}
			/>
		{/if}
		<button class="eye" onclick={() => (passwordShow = !passwordShow)}>
			{#if passwordShow}
				<EyeIcon class="icon17B" />
			{:else}
				<EyeOffIcon class="icon17B" />
			{/if}
		</button>
	</div>

	{#if passwordShow}
		<input
			class="input"
			type="text"
			placeholder="Please input your password"
			bind:value={password2}
		/>
	{:else}
		<input
			class="input"
			type="password"
			placeholder="Please input your password"
			bind:value={password2}
		/>
	{/if}

	<label class="form-label" for="">
		<input type="checkbox" bind:checked={terms} />
		&nbsp I agree to the &nbsp<a href="/#/setting/about/terms"> Terms of Service </a></label
	>
	<div class="form-label">
		Password strength:&nbsp
		{#if psStrength === 'Too weak' && password !== ''}
			<span class="weak">{psStrength}</span>
		{:else if password === ''}
			<span class="weak"></span>
		{:else if psStrength !== '' && psStrength !== 'Too weak'}
			<span class="normal">{psStrength}</span>
		{/if}
	</div>

	{#if password === '' && password2 === ''}
		<button class="start"> Setting your password</button>
	{:else if password !== password2}
		<button class="start"> Password not match</button>
	{:else if password === password2 && !createSuccess && !terms}
		<button class="start"> Please agree to the terms</button>
	{:else if password === password2 && !createSuccess && terms}
		<button class="start" onclick={() => handleCreateEvmAccount(password)}> Submit</button>
	{/if}
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
	.form-label {
		display: flex;
		justify-content: flex-start;
		padding: 0px;
		font-size: 1.2rem;
		color: var(--color-text);
	}

	.bottom-button {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-blue);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
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
	.active {
		position: fixed;
		top: calc(100vh - 400px);
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 16px;
		margin: 0px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}
	.input {
		padding: 1.4rem;
		font-size: 1.4rem;
		width: 80%;
		border-radius: 16px;
		background: var(--color-bg2);
		border: none;
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
	.finish {
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-blue);
		box-sizing: border-box;
		width: 80%;
		margin-top: 32px;
		padding: 1rem;
		cursor: pointer;
	}

	.start {
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-pink);
		box-sizing: border-box;
		width: 80%;
		margin-top: 32px;
		padding: 1rem;
		cursor: pointer;
	}
	.weak {
		padding: 0px 8px;
		border: none;
		border-radius: 8px;
		color: #fff;
		background: red;
		font-weight: 500;
	}
	.normal {
		font-weight: 500;
		padding: 0px 8px;
		border: none;
		border-radius: 8px;
		color: #fff;
		background: var(--color-green);
	}
	.eye {
		width: 24px;
		border: none;
		background: none;
		position: absolute;
		right: 16%;
		&:hover {
			cursor: pointer;
		}
		&:active {
			border: none;
			outline: none;
		}
		&:focus {
			border: none;
			outline: none;
		}
	}
	.container {
		width: 100%;
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
		background: var(--green3)
	}
</style>
