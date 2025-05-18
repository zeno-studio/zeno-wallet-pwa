<script lang="ts">
	import { EyeIcon, EyeOffIcon, AlertTriangle } from '$lib/svg';
	import { checkPassword,closeSigner} from '$lib/wallet/runes';
	import { getContext } from 'svelte';
	import { resetDB, type signerResponseType,} from '$lib/wallet/common';
	import { type ModalContext } from '$lib/ui/ts';

	const { isModalOpen, closeModal, updatePageTitle, currentPage } =
		getContext<ModalContext>('modal');

	updatePageTitle(1, 'Reset wallet');

	let resetSuccess = $state<boolean | null>(null);
	let isValid = $state<boolean | null>(null);
	let passwordShow = $state(false);
	let password = $state<string | null>(null);

	const handleResetwallet = async (password: string) => {
		const passwordCheckResult = (await checkPassword(password)) as signerResponseType | null;
		if (passwordCheckResult?.data) {
			localStorage.clear();
            closeSigner();
			resetSuccess = await resetDB();
			if (resetSuccess) {
				closeModal();
                window.location.reload();
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
			isValid = null;
			resetSuccess = null;
			password = null;
		}
	});
</script>

<div class="step2">
	<div class="tip">
		<div class="tip-icon">
			<div class="tip-icon-container" style="background-color: var(--accent-orange-back);">
				<AlertTriangle class="icon16O" />
			</div>
		</div>
		<div class="tip-text">
			This operation will clear all data and cannot be restored. Please make sure you have backed up
			your mnemonics.
		</div>
	</div>
	<div class="label2">Input Password:</div>
	<div class="ps-container">
		{#if passwordShow}
			<input
				id="current-password"
				class="input-password"
				type="text"
				autocomplete="off"
				bind:value={password}
			/>
		{:else}
			<input
				id="current-password"
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

	{#if password === null}
		<button class="start"> Input your password</button>
	{:else if isValid === false}
		<button class="start"> invalid current password</button>
	{:else if password}
		<button class="submit" onclick={() => handleResetwallet(password!)}>
			Submit {resetSuccess}</button
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

	.tip {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 5rem 1fr;
		color: var(--text);
		width: 80%;
		padding: 1rem;
		border-radius: 1.6rem;
		background: var(--accent-blue-back);
	}

	.tip-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tip-icon-container {
		height: 3rem;
		width: 3rem;
		border-radius: 1.6rem;
	}
	.tip-text {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.4rem;
		font-weight: 500;
		margin-left: 0.5rem;
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
</style>
