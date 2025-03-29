<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount, isValidMn } from '$lib/wallet/common';
	import { EyeIcon, EyeOffIcon, CloseIcon, AlertTriangle, PasteIcon } from '$lib/svg';
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

	let mn = $state<string | null>(null);
	let mnValid = $state<boolean | null>(null);

	function close() {
		const popover = document.getElementById('import');
		if (popover) {
			popover.hidePopover();
		}
		const mnInput = document.getElementById('mn') as HTMLInputElement;
		if (mnInput) {
			mnInput.value = '';
		}
		const passwordInput = document.getElementById('password') as HTMLInputElement;
		if (passwordInput) {
			passwordInput.value = '';
		}
		const passwordInput2 = document.getElementById('password2') as HTMLInputElement;
		if (passwordInput2) {
			passwordInput2.value = '';
		}
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

	async function handleImportEvmAccount(ps: string, mn: string) {
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			createEvmAccount(1, 0, ps,mn);
			accountState.nextAccountIndex++;
			accountState.currentAccountIndex = 1;
			accountState.nextEvmAddressIndex++;
			await accountState.getAccountList();
			settings.nextEvmAddressIndex++;
			settings.nextAccountIndex++;
			settings.currentAccountIndex = 1;
			localStorage.setItem('settings', JSON.stringify(settings));
			saveMidPass(ps);
			close() 
		}
	}

</script>

<button class="bottom-button" popovertarget="import" popovertargetaction="show">
	Import account
</button>

<div id="import" popover="manual" class={{ active: isSmallScreen.current }}>
	<button class="close" onclick={close}>
		<CloseIcon class="icon18A" />
	</button>

	<div class="step1">
		{#if !mnValid}
			<div class="title">Import Recovery Phrase</div>
			<span class="tip"> Restore an existing wallet with your 12 or 24-word recovery phrase</span>
			<textarea
			    id ="mn"
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
						<EyeIcon class="icon18B" />
					{:else}
						<EyeOffIcon class="icon18B" />
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
				<button class="start"> Set your password </button>
			{:else if password !== password2}
				<button class="start"> Password not match</button>
			{:else if password === password2 && !terms}
				<button class="start"> Please agree to the terms</button>
			{:else if password === password2 && terms && psStrength === 'Too weak'}
				<button class="start"> Password too weak</button>
			{:else if password === password2 && terms && psStrength !== 'Too weak'}
				<button class="ok" onclick={() => handleImportEvmAccount(password as string,mn as string)}>
					Submit
				</button>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
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
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-purple);
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
		width: 38.4rem;
		padding: 1.6rem;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
	}
	.active {
		position: fixed;
		top: calc(100vh - 50rem);
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 1.6rem;
		margin: 0px;
		background: var(--color-bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
		z-index: 1001;
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
	.ok {
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
		border: 1px solid var(--color-border);
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
	.container {
		width: 100%;
	}
</style>
