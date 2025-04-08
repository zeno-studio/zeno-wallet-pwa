<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount, isValidMn, type Settings } from '$lib/wallet/common';
	import { EyeIcon, EyeOffIcon, CloseIcon, AlertTriangle, PasteIcon } from '$lib/svg';
	import { accountState, saveMidPass } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';
	import { checkPasswordStrength } from '$lib/ui/ts';

	let modalOpen = $state(false);
	let terms = $state(false);
	let password = $state<string | null>(null);
	let password2 = $state<string | null>(null);
	let passwordShow = $state(false);
	let psStrength = $derived.by(() => {
		if (password) {
			return checkPasswordStrength(password).strength;
		} else {
			return 'empty';
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
		});
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
			<button class="close" onclick={close}>
				<CloseIcon class="icon18A" />
			</button>

			<div class="step1">
				{#if !mnValid}
					<div class="title">Import Recovery Phrase</div>
					<span class="tip">
						Restore an existing wallet with your 12 or 24-word recovery phrase</span
					>
					<textarea
						id="mn"
						class="input-mn"
						placeholder="write your recovery phrase,use space to separate words,or you can click the paste button below"
						bind:value={mn}
					></textarea>

					<div class="paste-container">
						<button class="paste" onclick={pasteMn}>
							<PasteIcon class="icon18P" />
						</button>
					</div>

					{#if mnValid === false}
						<div class="alert">
							<AlertTriangle class="icon18P" />
							&nbsp Invalid recovery phrase
						</div>
					{/if}

					<button class="start" onclick={() => validMn(mn)}>Submit</button>
				{/if}
			</div>

			{#if mnValid === true}
				<div class="step2">
					<div class="title">Set Your Password</div>
					<div class="ps-container">
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
							placeholder="Input your password again"
							autocomplete="off"
							bind:value={password2}
						/>
					{:else}
						<input
							id="password2"
							class="input"
							type="password"
							placeholder="Input your password again"
							autocomplete="off"
							bind:value={password2}
						/>
					{/if}

					<div class="label">
						<label class="container">
							<input bind:checked={terms} type="checkbox">
							<div class="checkmark"></div>
						  </label>
						I agree to the<a href="/#/setting/about/terms"> Terms of Service </a>
					</div>
					<div class="label">
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
						<div class="tips">
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
					{:else if password === password2  && psStrength === 'weak'}
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
	a{
		margin-left: 1rem;
		font-weight: 600;
		color: var(--color);
		&:hover {
			text-decoration: underline;
		}
	}
	.modal {
		display: flex;
		gap: 1rem;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--color-text);
		height: 80%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
	}
	.modal-m {
		display: flex;
		gap: 1rem;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 5rem;
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
		padding: 1.5rem 2rem;
		font-size: 1.5rem;
		width: 80%;
		border-radius: 16px;
		background: var(--color-bg2);
		border: none;
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
		margin-top: 3.2rem;
		padding: 1rem;
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
	.tips{
		display: flex;
		color: var(--color-text);
		font-size: 1.2rem;
		font-weight: 500;
		width: 60%;
		border: 2px dashed var(--alert);
		border-radius: 1.6rem;
		padding: 1.5rem 2rem;
	}

	.step1 {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	.step2 {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}
	.tip {
		font-size: 1.2rem;
		color: var(--color-text);
		text-align: center;
		width: 70%;
	}
	.input-mn {
		display: block;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-wrap;
		padding: 1.5rem;
		font-size: 1.5rem;
		width: 80%;
		height: 12rem;
		border-radius: 1.6rem;
		background: var(--color-bg2);
		border: 1px solid var(--color-bg3);
		resize: none;
		overflow-wrap: break-word;
		text-align: left;
		line-height: 1.6;
	}

	.paste {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.4rem;
		border-radius: 1rem;
		background: var(--green2);
		border: none;
		cursor: pointer;
		height: 3.2rem;
		width: 3.2rem;
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
 font-size: 1.2rem;
 user-select: none;
 margin-right: 1rem;
}

/* Create a custom checkbox */
.checkmark {
 position: relative;
 top: 0;
 left: 0;
 height: 1.3em;
 width: 1.3em;
 background: none;
 border: 1px solid var(--color-bg3);
 border-radius: 0.6rem;
 box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.30), 0px 1px 1px rgba(0,5);
}


.container input:checked ~ .checkmark {
 background-color: var(--green4);
}

.checkmark:after {
 content: "";
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
