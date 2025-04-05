<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount, type Settings } from '$lib/wallet/common';
	import { CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';
	import { passwordStrength } from 'check-password-strength';
	import { accountState, saveMidPass } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';

	let modalOpen = $state(false);

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

	function close() {
		modalOpen = false;
		password = null;
		password2 = null;
		passwordShow = false;
	}

	async function createAccount(password: string) {
		const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
		try {
			if (createEvmAccount(1, password)) {
				accountState.currentAccountIndex = 1;
				accountState.nextAccountIndex++;
				await accountState.getAccountList();
				settings.currentAccountIndex = 1;
				settings.nextAccountIndex++;
				localStorage.setItem('settings', JSON.stringify(settings));
				saveMidPass(password);
				close();
			}
		} catch (e) {
			console.error('Error when creating account', e);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			modalOpen = false;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			modalOpen = false;
		}
	}

	$effect(() => {
		if (modalOpen) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<button class="bottom-button" onclick={() => modalOpen = true}>
	Create account
</button>


{#if modalOpen}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="backdrop"
		role="dialog"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
	>
		<div
			id="addAccount"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
		>

		<button class="close" onclick={close}>
			<CloseIcon class="icon18A" />
		</button>
		<div class="title">Create New Account</div>
	
		<div class="container">
			{#if passwordShow}
				<input
					id="password"
					class="input"
					type="text"
					placeholder="Please input your password"
					autocomplete="off"
					bind:value={password}
				/>
			{:else}
				<input
					id="password"
					class="input"
					type="password"
					placeholder="Please input your password"
					autocomplete="off"
					bind:value={password}
				/>
			{/if}
			<button class="eye" onclick={() => (passwordShow = !passwordShow)}>
				{#if passwordShow}
					<EyeIcon class="icon18A" />
				{:else}
					<EyeOffIcon class="icon18A" />
				{/if}
			</button>
		</div>
	
		{#if passwordShow}
			<input
				id="password2"
				class="input"
				type="text"
				placeholder="Please input your password"
				autocomplete="off"
				bind:value={password2}
			/>
		{:else}
			<input
				id="password2"
				class="input"
				type="password"
				placeholder="Please input your password"
				autocomplete="off"
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
			<button class="hint"> Setting your password</button>
		{:else if password !== password2}
			<button class="hint"> Password not match</button>
		{:else if password === password2 && !terms}
			<button class="hint"> Please agree to the terms</button>
		{:else if password === password2 && terms && psStrength === 'Too weak'}
			<button class="hint"> Password too weak</button>
		{:else if password === password2 && terms && psStrength !== 'Too weak'}
			<button class="submit" onclick={() => createAccount(password as string)}> Submit</button>
		{/if}
			
		</div>
	</div>
{/if}


<style lang="postcss">
	.modal {
		gap: 1rem;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--color-text);
		height: 70%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
	}
	.modal-m {
		gap: 1rem;
		position: fixed;
		top: calc(100vh - 50rem);
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 2rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
	}
	.title {
		display: flex;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 2rem;
	}
	.label {
		display: flex;
		justify-content: flex-start;
		padding: 0px;
		font-size: 1.2rem;
		color: var(--color-text);
	}

	.bottom-button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-pink);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
		outline: none;
		&:focus {
			outline: none;
		}
		&:active {
			outline: none;
		}
	}

	.input {
		padding: 1.5rem 2rem;
		font-size: 1.5rem;
		width: 80%;
		border-radius: 16px;
		background: var(--color-bg2);
		border: none;
	}

	.hint {
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-pink);
		box-sizing: border-box;
		width: 80%;
		margin-top: 3.2rem;
		padding: 1rem;
		cursor: pointer;
	}
	.submit {
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-blue);
		box-sizing: border-box;
		width: 80%;
		margin-top: 3.2rem;
		padding: 1rem;
		cursor: pointer;
	}
	.weak {
		padding: 0rem 0.8rem;
		border: none;
		border-radius: 0.8rem;
		color: #fff;
		background: red;
		font-weight: 500;
	}
	.normal {
		font-weight: 500;
		padding: 0rem 0.8rem;
		border: none;
		border-radius: 0.8rem;
		color: #fff;
		background: var(--color-green);
	}
	.eye {
		display: flex;
		border: none;
		background: none;
		position: absolute;
		right: 16%;
	}

	.container {
		width: 100%;
	}
</style>
