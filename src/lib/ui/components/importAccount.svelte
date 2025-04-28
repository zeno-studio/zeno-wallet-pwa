<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		createEvmAccount,
		createPolkadotAccount,
		isValidMn,
		type Settings
	} from '$lib/wallet/common';
	import { EyeIcon, EyeOffIcon, CloseIcon, AlertTriangle, ArrowBack } from '$lib/svg';
	import { accountState, saveMidPass } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';
	import { checkPasswordStrength } from '$lib/ui/ts';
	import { Gesture } from '@use-gesture/vanilla';

	let modalOpen = $state(false);
	let type = $state('EVM');
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

	let modalBody = $state<HTMLElement | null>(null);
	let y = $state(0);

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
		type = 'EVM';
		modalBody = null;
		y = 0;
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
			navigator.clipboard.writeText('');//clear clipboard
		});
		setTimeout(() => {
			pasted = false;
		}, 3000);
	}

	async function importAccount(ps: string, mn: string) {
		const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
		if (type === 'EVM') {
			try {
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
		if (type === 'POLKADOT') {
			try {
				if (createPolkadotAccount(101, ps, 'sr25519', mn)) {
					accountState.nextPolkadotIndex++;
					accountState.currentAccountIndex = 101;
					await accountState.getAccountList();
					settings.currentAccountIndex = 101;
					settings.nextPolkadotIndex++;
					localStorage.setItem('settings', JSON.stringify(settings));
					saveMidPass(ps);
					close();
				}
			} catch (e) {
				console.error('Error when importing account', e);
			}
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
	$effect(() => {
		if (modalBody && modalOpen) {
			const gesture = new Gesture(modalBody, {
				onDrag: ({ movement: [, my], velocity: [, vy], direction: [, dy] }) => {
					if (my > 0) y = my;
					if (my > 200 && vy > 0.5 && dy > 0) {
						modalOpen = false;
						y = 0;
					}
				},
				onDragEnd: () => {
					if (modalOpen && y > 0) y = 0;
				}
			});
			return () => gesture.destroy();
		}
	});
</script>

<button class="bottom-button" onclick={() => (modalOpen = true)}> Import account </button>

{#if modalOpen}

	<div
		class="backdrop"
		role="dialog"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		tabindex="-1"
	>
		<div
			bind:this={modalBody}
			id="importAccount"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			style="transform: translateY({y}px)"
		>
		{#if isSmallScreen.current}
			<div class="drag-bar"></div>
		{/if}
			<!-- step 1 notification-->
			{#if !notice}
				<div class="step1" in:fly={{ duration: 300, x: -100 }}>
					{#if !isSmallScreen.current}
					<div class="top">
						<button class="close-btn" onclick={close}><CloseIcon class="icon2A" /></button>
					</div>
				{/if}

					<div class="title">Notifications</div>

					<div class="tip">
						<div class="tip-icon">
							<div class="tip-icon-container" style="background-color: var(--accent-orange-back);">
								<AlertTriangle class="icon16O" />
							</div>
						</div>
						<div class="tip-text">
							To copy-paste or type your recovery phrase on-screen may risk exposing it.
						</div>
					</div>
					<div class="tip">
						<div class="tip-icon">
							<div class="tip-icon-container" style="background-color: var(--accent-orange-back);">
								<AlertTriangle class="icon16O" />
							</div>
						</div>
						<div class="tip-text">
							If you've used a Zeno account before, consider importing your keystore for a safer option.
						</div>
					</div>

					<div class="label-m" style="margin: 2rem;font-weight: 600;">Choose Account Type</div>
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

			{#if !mnValid && notice}
				<div class="step1" in:fly={{ duration: 300, x: 100 }}>

					{#if isSmallScreen.current}
						<div class="top">	
							<button class="back-btn" onclick={() => (notice = false)}>
								<ArrowBack class="icon2A" />
							</button>
						</div>
					{:else}
						<div class="top">
							<button class="back-btn" onclick={() => (notice = false)}>
								<ArrowBack class="icon2A" />
							</button>
							<button class="close-btn" onclick={close}><CloseIcon class="icon2A" /></button>
						</div>
					{/if}
					<div class="title">Import Recovery Phrase</div>

					<span class="tip3">
						Restore an existing wallet with your 12 or 24-word recovery phrase
					</span>
					<textarea
						id="mn"
						class="input-mn"
						placeholder="Use space to separate words"
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
							<AlertTriangle class="icon16O" />
							&nbsp Invalid recovery phrase
						</div>
					{/if}

					<button class="start" onclick={() => validMn(mn)}>Submit</button>
				</div>
			{/if}

			<!-- step 3 ps-->
			{#if mnValid && notice}
				<div class="step2" in:fly={{ duration: 300, x: 100 }}>
					{#if isSmallScreen.current}
						<div class="top">	
							<button class="back-btn" onclick={() => (mnValid = null)}>
								<ArrowBack class="icon2A" />
							</button>
						</div>
					{:else}
						<div class="top">
							<button class="back-btn" onclick={() => (mnValid = null)}>
								<ArrowBack class="icon2A" />
							</button>
							<button class="close-btn" onclick={close}><CloseIcon class="icon2A" /></button>
						</div>
					{/if}
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
								<EyeIcon class="icon2A" />
							{:else}
								<EyeOffIcon class="icon2A" />
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

					<div class="label2">
						<label class="container">
							<input bind:checked={terms} type="checkbox" />
							<div class="checkmark"></div>
						</label>
						I agree to the<a href="/#/setting/about/terms"> Terms of Service </a>
					</div>
					<div class="label2">
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
	.label2 {
		display: flex;
		justify-content: flex-start;
		font-size: 1.3rem;
		font-weight: 600;
		width: 70%;
	}

	.alert {
		display: flex;
		background: none;
		border: none;
		font-size: 1.4rem;
		font-weight: 500;
		color: var(--accent-orange);
	}
	
	.modal {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 99%;
		width: 38.4rem;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
		touch-action: none;
	}
	.modal-m {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 1rem;
		height: 100vh;
		width: 100vw;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		border: 1px solid var(--bg3);
		touch-action: none;

	}

	.bottom-button {
		display: flex;
		justify-content: center;
		align-items: center;
		color:var(--color);
		font-size: 1.6rem;
		font-weight: 600;
		height: 4.8rem;
		border-radius: 1.6rem;
		background: var(--bg3);
		border: 1px solid var(--bg4);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}

	.start {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color:var(--color);
		font-size: 1.6rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--bg2);
		box-sizing: border-box;
		width: 80%;
		padding: 2rem;			
		margin-top: 2rem;
		border: 1px solid var(--border);
		cursor: pointer;
		&:hover {
			background: var(--bg3);
		}
	}
	.submit {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.6rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--primary);
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
		background: var(--accent-yellow);
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

	.tip{
		display:grid;
		grid-template-columns: 5rem 1fr;
		color: var(--text);
		width: 80%;
		padding: 1rem;
		border-radius: 1.6rem;
		background: var(--accent-blue-back);
	}

	.tip-icon{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tip-icon-container{
		height: 3rem;
		width: 3rem;
		border-radius: 1.6rem;
	}
	.tip-text{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.4rem;
		font-weight: 500;
		margin-left: 0.5rem;
	}


	.tip3 {
		font-size: 1.3rem;
		color: var(--text);
		text-align: center;
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
		border: 2px dashed var(--accent-yellow);
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
		font-size: 1.4rem;
		font-weight: 500;
		width: 80%;
		height: 20rem;
		border-radius: 1.6rem;
		background: var(--bg3);
		border: 1.5px solid var(--border);
		resize: none;
		overflow-wrap: break-word;
		text-align: left;
		line-height: 1.8;
		&:focus {
			border: 1.5px solid var(--accent-blue);
			color: var(--color);
		}
		&:active {
			border: 1.5px solid var(--accent-blue);
			color: var(--color);
		}
	}

	.paste {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.3rem;
		border-radius: 1.6rem;
		background: var(--accent-blue);
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
		background: var(--primary);
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
	.drag-bar {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 0.5rem;
		background: rgb(160, 160, 160);
		border-radius: 1rem;
		margin-top: -1rem;
		margin-bottom: 2rem;
	}
	.top {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}
	.back-btn {
		display: flex;
		position: absolute;
		left: 0;
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
	.close-btn {
		display: flex;
		position: absolute;
		right: 0;
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
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
		border: 2px solid var(--success);
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
