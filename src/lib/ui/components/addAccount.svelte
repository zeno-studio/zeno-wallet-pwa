<script lang="ts">
	import { checkPassword, handleAddEvmAccount } from '$lib/wallet/runes';
	import { EyeIcon, EyeOffIcon } from '$lib/svg';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
	import { type signerResponseType } from '$lib/wallet/common';

	const { isModalOpen, closeModal, updatePageTitle } = getContext<ModalContext>('modal');

	updatePageTitle(1, 'Add New Account');

	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isValidPs = $state<boolean | null>(null);

	const checkPasswordAndAdd = async (ps: string) => {
		const result = (await checkPassword(ps)) as signerResponseType | null;
		if (result?.data === true) {
			isValidPs = true;
			handleAddEvmAccount();
			closeModal();
		} else {
			isValidPs = false;
			setTimeout(() => {
				isValidPs = null;
			}, 3000);
		}
	};

	$effect(() => {
		if (!isModalOpen()) {
			isValidPs = null;
			password = null;
			passwordShow = false;
		}
	});
</script>

<div class="container">
	{#if passwordShow}
		<input
			id="password"
			class="input-password"
			type="text"
			placeholder="Password"
			autocomplete="off"
			bind:value={password}
		/>
	{:else}
		<input
			id="password"
			class="input-password"
			type="password"
			placeholder="Password"
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

<div class="form-label">
	{#if isValidPs === false}
		Invalid password
	{:else}
		<span> </span>
	{/if}
</div>

{#if password === null}
	<button class="start"> input your password</button>
{:else if password !== null}
	<button class="start" onclick={async () => await checkPasswordAndAdd(password!)}> Submit </button>
{/if}

<style lang="postcss">
	.container {
		display: flex;
		align-items: center;
		width: 96%;
		padding: 0.8rem;
	}

	.start {
		display: flex;
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
		margin-top: 3.2rem;
		padding: 1rem;
		cursor: pointer;
	
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
