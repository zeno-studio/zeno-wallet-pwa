<script lang="ts">
	import { EyeIcon, EyeOffIcon,AlertTriangle } from '$lib/svg';
	import { restoreMn } from '$lib/wallet/common';
	import {checkPassword} from '$lib/wallet/runes';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
	const { isModalOpen, closeModal, updatePageTitle, currentPage } =
		getContext<ModalContext>('modal');

	updatePageTitle(1, 'Input your password');

	let isValid = $state<boolean | null>(null);
	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let mnArray = $state<string[] | null>(null);

	const GetMn = async (password: string) => {
		const result = await restoreMn(password, 'zeno');
		parseMnemonic(result!);
	};

	const checkPasswordAndProcess= async (password: string) => {
		if (password) {
			const result = await checkPassword(password);
			if (result) {
				isValid = true;
				GetMn(password);
				updatePageTitle(2, 'Recovery phrase');

			} else {
				isValid = false;
				setTimeout(() => {
					isValid = null;
				}, 3000);
			}
		} 
	};

	const parseMnemonic = (mn: string) => {
		const mnemonicArray = mn.trim().split(/\s+/);
		const length = mnemonicArray.length;
		if (length !== 12 && length !== 24) {
			throw new Error(`Invalid mnemonic length: ${length}. Must be 12 or 24 words`);
		}
		return (mnArray = mnemonicArray);
	};

	$effect(() => {
		if (!isModalOpen()) {
			password = null;
			mnArray = null;
			isValid = null;
		}
	});
</script>

{#if currentPage() === 1}
	<div class="modal-body">
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
		{#if password === null }
		<button class="start"> Input your password</button>
	{:else if isValid === false}
		<button class="start"> invalid password</button>
	{:else }
		<button class="submit" onclick={() => checkPasswordAndProcess(password!)}>
			Submit</button
		>
	{/if}
	</div>
{/if}

{#if currentPage() === 2}
	<div class="modal-body">

		<div class="mn-container">
			{#each mnArray! as word, i}
				<div class="mn">
					<span class="mn-index">{i + 1}</span>
					<span class="divider"></span>
					<span class="mn-word">{word}</span>
				</div>
			{/each}
		</div>
		<button class="submit" onclick={closeModal}>Close</button>
	</div>
{/if}

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
		margin-bottom: 3rem;
		margin-top: 3rem;
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
	.mn-container{
		display: grid;
		grid-template-columns:  repeat(auto-fit, minmax(8.6rem, 1fr));
		width: 90%;
		margin: 0;
		gap: 1rem;
	}
	.mn{
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		border: 1px solid var(--border);
		background: var(--bg2);
		border-radius: 1.6rem;
		height: 4rem;
		margin: 0;
		padding: 0;
	}
	.divider{
		width: 1px;
		height: 80%;
		background: var(--border);
	}
	.mn-index{
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--text);
		font-size: 1.4rem;
		font-weight: 500;
		width: 2rem;
		margin-left: 0.5rem;
		margin-right:0.3rem;

	}
	.mn-word{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: var(--text);
		font-size: 1.4rem;
		font-weight: 500;
		margin-left: 0.5rem;
		margin-right:0.5rem;
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

	.modal-body {
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
