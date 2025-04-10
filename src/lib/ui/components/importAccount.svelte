<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount, isValidMn, type Settings } from '$lib/wallet/common';
	import { EyeIcon, EyeOffIcon, CloseIcon, AlertTriangle, ArrowBack,HelpFilled } from '$lib/svg';
	import { accountState, saveMidPass } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';
	import { checkPasswordStrength } from '$lib/ui/ts';
	import { goto } from '$app/navigation';

	let modalOpen = $state(false);
	let notice = $state(false);
	let pasted = $state(false);
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

	let mn = $state<string | null>(null);
	let mnValid = $state<boolean | null>(null);

	function close() {
		modalOpen = false;
		password = null;
		password2 = null;
		passwordShow = false;
		mn = null;
		mnValid = null;
		notice = false;
		terms = false;
	}

	function validMn(mn: string | null) {
		if (!mn) {
			mnValid = false;
			setTimeout(() => {
				mnValid = null;
			}, 3000);
		} else {
			const cleaned = mn.replace(/\s+/g, ' ')?.trim();
			const words = cleaned.split(' ');
			const validWords = words.filter(
				(word) => word.length >= 3 && word.length <= 8 && /^[a-zA-Z]+$/.test(word)
			);
			if (validWords.length !== 12 && validWords.length !== 24) {
				mnValid = false;
				setTimeout(() => {
					mnValid = null;
				}, 3000);
			} else {
				const validString = validWords.join(' ');
				if (isValidMn(validString)) {
					mnValid = true;
					mn = validString;
				} else {
					mnValid = false;
					setTimeout(() => {
						mnValid = null;
					}, 3000);
				}
			}
		}
	}

	function pasteMn() {
		navigator.clipboard.readText().then((text) => {
			mn = text;
			pasted = true;
		});
		setTimeout(() => {
			pasted = false;
		}, 3000);
	}

	async function importAccount(ps: string, mn: string) {
		try {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			if (createEvmAccount(1, ps, mn)) {
				accountState.nextAccountIndex++;
				accountState.currentAccountIndex = 1;
				await accountState.getAccountList();
				settings.currentAccountIndex = 1;
				settings.nextAccountIndex++;
				localStorage.setItem('settings', JSON.stringify(settings));
				saveMidPass(ps);
				close();
			}
		} catch (e) {
			console.error('Error when importing account', e);
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

<button class="bottom-button" onclick={() => (modalOpen = true)}> Import account </button>

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
			id="importAccount"
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
						<span class="alert3"><AlertTriangle class="icon18R" /></span>
						<span>
							Copying and pasting the recovery phrase, or typing on the screen may reveal your
							secrets. If you have had a Zeno account before, it is recommended to use the keystore
							import method</span
						>
						<span>
							<button class="paste" onclick={() => goto('/#/setting')}>
								switch to keystore importer
							</button>
						</span>
					</div>
					<div class="tip2">
						<span class="alert3"><AlertTriangle class="icon18R" /></span>
						<span> 
							Zeno Wallet does not store your password,
							If you forget your password, we cannot help you recover it.
							Your asset is on-chain and safe, but you will not be able to control it. </span>
					</div>

					<button class="start" onclick={() => (notice = true)}>Continue</button>
				</div>
			{/if}

			<!-- step 2 mn-->

			{#if !mnValid && notice}
				<div class="step1" in:fly={{ duration: 300, x: 100 }}>
					<div class="top">
						<button class="button-empty" onclick={() => (notice = false)}>
							<ArrowBack class="icon18A" />
						</button>
						<button class="top-right" onclick={close}>
							<CloseIcon class="icon18A" />
						</button>
					</div>
					<div class="title">Import Recovery Phrase</div>

					<span class="tip">
						Restore an existing wallet with your 12 or 24-word recovery phrase
					</span>
					<textarea
						id="mn"
						class="input-mn"
						placeholder="write your recovery phrase,use space to separate words,or you can click the paste button below"
						bind:value={mn}
					></textarea>

					<div class="paste-container">
						<button class={{ paste: !pasted, pasted: pasted }} onclick={pasteMn}>
							{#if pasted}
								Pasted
							{:else}
								Paste
							{/if}
						</button>
					</div>

					{#if mnValid === false}
						<div class="alert">
							<AlertTriangle class="icon18R" />
							&nbsp Invalid recovery phrase
						</div>
					{/if}

					<button class="start" onclick={() => validMn(mn)}>Submit</button>
				</div>
			{/if}

			<!-- step 3 ps-->
			{#if mnValid && notice}
				<div class="step2" in:fly={{ duration: 300, x: 100 }}>
					<div class="top">
						<button class="button-empty" onclick={() => (mnValid = null)}>
							<ArrowBack class="icon18A" />
						</button>
						<button class="top-right" onclick={close}>
							<CloseIcon class="icon18A" />
						</button>
					</div>
					<div class="title">Set Your Password</div>

					<div class="lable2">Your password:</div>
					<div class="ps-container">
						{#if passwordShow}
							<input
								id="password"
								class="input"
								type="text"
								autocomplete="off"
								bind:value={password}
							/>
						{:else}
							<input
								id="password"
								class="input"
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

					<div class="lable2">Repeat your password:</div>
					{#if passwordShow}
						<input
							id="password2"
							class="input"
							type="text"
							autocomplete="off"
							bind:value={password2}
						/>
					{:else}
						<input
							id="password2"
							class="input"
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
						<button class="start"> Set your password </button>
					{:else if password !== password2}
						<button class="start"> Password not match</button>
					{:else if password === password2 && !terms && psStrength !== 'weak'}
						<button class="start"> Please agree to the terms</button>
					{:else if password === password2 && psStrength === 'weak'}
						<button class="start"> Password too weak</button>
					{:else if password === password2 && terms && psStrength !== 'weak'}
						<button class="submit" onclick={() => importAccount(password as string, mn as string)}>
							Submit
						</button>
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
	.lable2 {
		display: flex;
		justify-content: flex-start;
		font-size: 1.3rem;
		font-weight: 600;
		width: 70%;
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
	.alert3 {
		display: flex;
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
	.alert-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 65%;
		font-size: 1.3rem;
	}
	.alert {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 1.5rem;
		font-weight: 600;
	}
	.important {
		font-weight: 600;
		color: var(--alert);
		margin-right: 1rem;
	}
	.modal {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--color-text);
		height: 85%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
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
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
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
		background: var(--storm900);
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
		padding: 1rem 2rem;
		font-size: 1.5rem;
		width: 80%;
		border-radius: 2rem;
		background: var(--color-bg2);
		border: 1px solid var(--color-border);
		&:focus {
			outline: none;
			border: 1px solid var(--color-bg3);
			color: var(--color);
		}
		&:active {
			outline: none;
			border: 1px solid var(--color-bg3);
			color: var(--color);
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
		background: var(--storm700);
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
		background: var(--color-pink);
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
		background: var(--alert);
		margin-left: 1rem;
	}
	.strong {
		font-weight: 500;
		padding: 0rem 0.8rem;
		border: none;
		border-radius: 0.8rem;
		color: #fff;
		background: var(--green4);
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
	.tip {
		font-size: 1.3rem;
		color: var(--color-text);
		text-align: center;
		width: 70%;
	}
	.tip2 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		color: var(--color-text);
		font-size: 1.3rem;
		font-weight: 500;
		width: 70%;
		border: 2px dashed var(--alert);
		border-radius: 1.6rem;
		padding: 1rem;
		width: 70%;
	}
	.input-mn {
		display: block;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-wrap;
		padding: 1rem;
		font-size: 1.5rem;
		font-weight: 500;
		width: 80%;
		height: 10rem;
		border-radius: 1.6rem;
		background: var(--color-bg2);
		border: 1px solid var(--color-border);
		resize: none;
		overflow-wrap: break-word;
		text-align: left;
		line-height: 1.6;
		&:focus {
			outline: none;
			border: 1px solid var(--color-bg3);
			color: var(--color);
		}
		&:active {
			outline: none;
			border: 1px solid var(--color-bg3);
			color: var(--color);
		}
	}

	.paste {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.3rem;
		border-radius: 1.6rem;
		background: var(--storm700);
		border: none;
		cursor: pointer;
		padding: 0.4rem 1rem;
		color: #fff;
	}

	.pasted {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.3rem;
		border-radius: 1.6rem;
		background: var(--color-pink);
		border: none;
		cursor: pointer;
		padding: 0.4rem 1rem;
		color: #fff;
	}
	.paste-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 80%;
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
		border: 1px solid var(--color-bg3);
		border-radius: 0.6rem;
		box-shadow:
			0px 0px 1px rgba(0, 0, 0, 0.3),
			0px 1px 1px rgba(0, 5);
	}

	.container input:checked ~ .checkmark {
		background-color: var(--green4);
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
