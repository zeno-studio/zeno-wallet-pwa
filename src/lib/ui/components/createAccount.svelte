<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount } from '$lib/wallet/common';
	import { Loading, CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';
	import { passwordStrength } from 'check-password-strength';
	import { accountState, saveMidPass } from '$lib/wallet/runes';

	let terms = $state(false);
	let password = $state<string | null>(null);
	let password2 = $state<string | null>(null);
	let passwordShow = $state(false);
	let psStrength = $derived.by(() => {
		if (password) {
			return passwordStrength(password).value;
		} else {
			return 'empty';
		}
	});
	let isLoading = $state(false);

	async function handleCreateEvmAccount(ps: string) {
		isLoading = true;
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			createEvmAccount(1, 0, ps);
			accountState.currentAccountIndex = 1;
			accountState.nextAccountIndex++;
			accountState.nextEvmAddressIndex++;
			await accountState.getAccountList();
			settings.currentAccountIndex = 1;
			settings.nextAccountIndex++;
			settings.nextEvmAddressIndex++;
			settings.vaultList.push('default');
			localStorage.setItem('settings', JSON.stringify(settings));

			saveMidPass(ps);
			const popover = document.getElementById('create');
			if (popover) {
				popover.hidePopover();
			}
		}
		password = null;
		password2 = null;
		terms = false;
		passwordShow = false;
		isLoading = false;
	}
</script>

<button class="bottom-button2" popovertarget="create" popovertargetaction="show">
	Create account
</button>

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

	<div class="label">
		<input type="checkbox" bind:checked={terms} />
		&nbsp I agree to the &nbsp<a href="/#/setting/about/terms"> Terms of Service </a>
	</div>
	<div class="label">
		Password strength:&nbsp
		{#if psStrength === 'Too weak' && password !== null}
			<span class="weak">{psStrength}</span>
		{:else if password === null}
			<span class="weak"></span>
		{:else if psStrength !== 'empty' && psStrength !== 'Too weak'}
			<span class="normal">{psStrength}</span>
		{/if}
	</div>

	{#if password === null && password2 === null}
		<button class="start"> Setting your password &#x1F923</button>
	{:else if password !== password2}
		<button class="start"> Password not match</button>
	{:else if password === password2 && !terms}
		<button class="start"> Please agree to the terms</button>
	{:else if password === password2 && terms && psStrength === 'Too weak'}
		<button class="start"> Password too weak</button>
	{:else if password === password2 && terms && psStrength !== 'Too weak'}
		<button class="ok" onclick={() => handleCreateEvmAccount(password as string)}> Submit</button>
	{:else if isLoading}
		<button class="start"> <Loading class="icon17A" /> </button>
	{/if}
</div>


<style lang="postcss">
	.label {
		display: flex;
		justify-content: flex-start;
		padding: 0px;
		font-size: 1.2rem;
		color: var(--color-text);
	}

	.bottom-button2 {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-pink);
		box-sizing: border-box;
		width: 100%;
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
		height: 75%;
		width: 384px;
		padding: 16px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
	}
	.active {
		position: fixed;
		top: calc(100vh - 500px);
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
	.ok {
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
</style>
