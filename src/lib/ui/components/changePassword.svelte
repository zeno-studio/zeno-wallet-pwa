<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { EyeIcon, EyeOffIcon, ArrowForward, CloseIcon } from '$lib/svg';
	import { checkPasswordStrength } from '$lib/ui/ts';
	import { checkPassword, changePassword, type signerResponseType } from '$lib/wallet/runes';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
	const { isModalOpen, closeModal, updatePageTitle, currentPage } =
		getContext<ModalContext>('modal');

	updatePageTitle(1, 'Change Password');

	let currentPassword = $state<string | null>(null);
	let isValid = $state<boolean | null>(null);
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

	const checkPasswordAndChange = async (currentPassword: string, newPassword: string) => {
		const result = (await checkPassword(currentPassword)) as signerResponseType | null;
		if (result?.data === true) {
			const result2 = (await changePassword(
				currentPassword,
				newPassword
			)) as signerResponseType | null;
			if (result2?.data === true) {
				close();
			}
		} else {
			isValid = false;
			setTimeout(() => {
				isValid = null;
			}, 3000);
		}
	};

	$effect(() => {
		if (!isModalOpen()) {
			password = null;
			password2 = null;
			passwordShow = false;
			currentPassword = null;
			isValid = null;
		}
	});
</script>

<div class="step2">
	<div class="title">Change Password</div>

	<div class="label2">Current Password:</div>
	<div class="ps-container">
		{#if passwordShow}
			<input
				id="current-password"
				class="input-password"
				type="text"
				autocomplete="off"
				bind:value={currentPassword}
			/>
		{:else}
			<input
				id="current-password"
				class="input-password"
				type="password"
				autocomplete="off"
				bind:value={currentPassword}
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

	<div class="label2">New Password:</div>
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

	<div class="label2">Confirm New Password:</div>
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
			At least 8 characters long, containing at least 1 uppercase letter, 1 numeric digit, and 1
			special character.
		</div>
	{/if}

	{#if currentPassword === null || password === null || password2 === null}
		<button class="start"> Setting your password</button>
	{:else if password !== password2}
		<button class="start"> Password not match</button>
	{:else if isValid === false}
		<button class="start"> invalid current password</button>
	{:else if password === password2 && psStrength === 'weak'}
		<button class="start"> Password too weak</button>
	{:else if password === password2 && psStrength !== 'weak' && currentPassword !== null}
		<button class="submit" onclick={() => checkPasswordAndChange(currentPassword!, password!)}>
			Submit</button
		>
	{/if}
</div>

<style lang="postcss">
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
		border: 2px dashed var(--accent-yellow);
		border-radius: 1.6rem;
		padding: 1rem;
		width: 70%;
	}

	.start {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: var(--color);
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
		font-size: 1.7rem;
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

	.step2 {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
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
</style>
