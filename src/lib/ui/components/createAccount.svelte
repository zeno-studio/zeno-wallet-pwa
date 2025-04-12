<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount, createPolkadotAccount, type Settings } from '$lib/wallet/common';
	import { CloseIcon, EyeIcon, EyeOffIcon, AlertTriangle, ArrowBack, HelpFilled } from '$lib/svg';
	import { checkPasswordStrength } from '$lib/ui/ts';
	import { accountState, saveMidPass } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';

	let modalOpen = $state(false);
	let type = $state('EVM');
	let notice = $state(false);
	let terms = $state(false);
	let password = $state<string | null>(null);
	let password2 = $state<string | null>(null);
	let passwordShow = $state(false);
	let psStrength = $derived.by(() => {
		if (password) {
			return checkPasswordStrength(password).strength;
		} else {
			return '';
		}
	});

	function close() {
		modalOpen = false;
		password = null;
		password2 = null;
		passwordShow = false;
		notice = false;
		terms = false;
	}

	async function createEvm(password: string) {
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

	async function createPolkadot(password: string) {
		const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
		try {
			if (createPolkadotAccount(101, password, 'sr25519')) {
				accountState.currentAccountIndex = 101;
				accountState.nextPolkadotIndex++;
				await accountState.getAccountList();
				settings.currentAccountIndex = 101;
				settings.nextPolkadotIndex++;
				localStorage.setItem('settings', JSON.stringify(settings));
			}
		} catch (e) {
			console.error('Error when creating account', e);
		}
	}

	function handleCreate() {
		if (type === 'EVM') {
			createEvm(password!);
		} else if (type === 'POLKADOT') {
			createPolkadot(password!);
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

<button class="bottom-button" onclick={() => (modalOpen = true)}> Create account </button>

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
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
		>
			<!-- step 1 notification-->
			{#if !notice}
				<div class="step1" in:fly={{ duration: 300, x: -100 }}>
					<div class="top1">
						<button class="close" onclick={close}>
							<CloseIcon class="icon18A" />
						</button>
					</div>
					<div class="title">Notifications</div>

					<div class="tip2">
						<span class="alert3"><HelpFilled class="icon18G" /></span>
						<span>
							Zeno wallet does not store your password. If you forget it, you will lose access to
							your funds, and we cannot recover it for you. Use a strong password and store it
							securely (e.g., in a password manager). Always back up your recovery phrase—it's the
							only way to restore your wallet if your password is lost.
						</span>
					</div>
					<div class="label-l-margin">Choose Account Type</div>
					<div class="radio">
						<label class="radio-label">
							<input type="radio" bind:group={type} value="EVM" />
							ETHEREUM
						</label>

						<label class="radio-label">
							<input type="radio" bind:group={type} value="POLKADOT" />
							POLKADOT
						</label>
					</div>
					<button class="start" onclick={() => (notice = true)}>Continue</button>
				</div>
			{/if}

			<!-- step 2 mn-->
			{#if notice}
				<div class="step2" in:fly={{ duration: 300, x: 100 }}>
					<div class="top">
						<button class="button-empty" onclick={() => (notice = false)}>
							<ArrowBack class="icon18A" />
						</button>
						<button class="top-right" onclick={close}>
							<CloseIcon class="icon18A" />
						</button>
					</div>
					<div class="title">Set Your Password</div>

					<div class="label2">Your password:</div>
					<div class="ps-container">
						{#if passwordShow}
							<input
								id="password"
								class="input-password"
								type="text"
								autocomplete="off"
								bind:value={password}
							/>
						{:else}
							<input
								id="password"
								class="input-password"
								type="password"
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

					<div class="label2">Repeat your password:</div>
					{#if passwordShow}
						<input
							id="password2"
							class="input-password"
							type="text"
							autocomplete="off"
							bind:value={password2}
						/>
					{:else}
						<input
							id="password2"
							class="input-password"
							type="password"
							autocomplete="off"
							bind:value={password2}
						/>
					{/if}

					<div class="label-s">
						<label class="container">
							<input bind:checked={terms} type="checkbox" />
							<div class="checkmark"></div>
						</label>
						I agree to the<a href="/#/setting/about/terms"> Terms of Service </a>
					</div>
					<div class="label-s">
						Password strength:
						{#if psStrength === 'weak'}
							<span class="weak">{psStrength}</span>
						{:else if password === null || psStrength === ''}
							<span class="weak"></span>
						{:else if psStrength === 'medium'}
							<span class="medium">{psStrength}</span>
						{:else if psStrength === 'strong'}
							<span class="strong">{psStrength}</span>
						{/if}
					</div>
					{#if psStrength === 'weak' && password === password2}
						<div class="tip2">
							At least 8 characters long, containing at least 1 uppercase letter, 1 numeric digit,
							and 1 special character.
						</div>
					{/if}

					{#if password === null && password2 === null}
						<button class="start"> Setting your password</button>
					{:else if password !== password2}
						<button class="start"> Password not match</button>
					{:else if password === password2 && !terms && psStrength !== 'weak'}
						<button class="start"> Please agree to the terms</button>
					{:else if password === password2 && psStrength === 'weak'}
						<button class="start"> Password too weak</button>
					{:else if password === password2 && terms && psStrength !== 'weak'}
						<button class="submit" onclick={handleCreate}> Submit</button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	a {
		margin-left: 1rem;
		font-weight: 600;
		color: var(--color);
		&:hover {
			text-decoration: underline;
		}
	}
	.radio {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 70%;
	}
	.radio-label {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		font-size: 1.3rem;
		font-weight: 600;
	}
	.top1 {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		background: none;
		border: none;
	}

	.top {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		background: none;
		border: none;
	}
	.top-right {
		position: absolute;
		right: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
	.button-empty {
		background: none;
		border: none;
		cursor: pointer;
	}

	
	.modal {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 85%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--border);
	}
	.modal-m {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 2rem;
		height: 100vh;
		width: 100vw;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--border);
	}

	.label2 {
		display: flex;
		justify-content: flex-start;
		font-size: 1.3rem;
		font-weight: 600;
		width: 70%;
	}

	.tip2 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		color: var(--text);
		font-size: 1.3rem;
		font-weight: 500;
		width: 70%;
		border: 2px dashed var(--warning);
		border-radius: 1.6rem;
		padding: 1rem;
		width: 70%;
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
		background: var(--pink);
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

	.start {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--storm3);
		box-sizing: border-box;
		width: 80%;
		padding: 2rem;
		margin-top: 2rem;
		cursor: pointer;
	}
	.submit {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--pink);
		box-sizing: border-box;
		width: 80%;
		margin-top: 2rem;
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
		margin-left: 1rem;
	}
	.medium {
		font-weight: 500;
		padding: 0rem 0.8rem;
		border: none;
		border-radius: 0.8rem;
		color: #fff;
		background: var(--warning);
		margin-left: 1rem;
	}
	.strong {
		font-weight: 500;
		padding: 0rem 0.8rem;
		border: none;
		border-radius: 0.8rem;
		color: #fff;
		background: var(--success);
		margin-left: 1rem;
	}

	.step1 {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	.step2 {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	

	
	.eye {
		display: flex;
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
	.ps-container {
		width: 100%;
	}

	/* Create a custom checkbox */
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.container {
		display: block;
		position: relative;
		cursor: pointer;
		font-size: 1.3rem;
		user-select: none;
		margin-right: 1rem;
	}

	.checkmark {
		position: relative;
		top: 0;
		left: 0;
		height: 1.3em;
		width: 1.3em;
		background: none;
		border: 1px solid var(--bg3);
		border-radius: 0.6rem;
		box-shadow:
			0px 0px 1px rgba(0, 0, 0, 0.3),
			0px 1px 1px rgba(0, 5);
	}

	.container input:checked ~ .checkmark {
		background-color: var(--success);
	}

	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	.container input:checked ~ .checkmark:after {
		display: block;
	}

	.container .checkmark:after {
		left: 0.45em;
		top: 0.25em;
		width: 0.25em;
		height: 0.5em;
		border: solid white;
		border-width: 0 0.15em 0.15em 0;
		transform: rotate(45deg);
	}
</style>
