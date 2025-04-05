<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		checkIsLocked,
		addEvmAccount,
		checkPassword,
		type signerResponseType,
		addEvmAccountWithPassword
	} from '$lib/wallet/runes';
	import { CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';

	let modalOpen = $state(false);
	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isValidPs = $state<boolean | null>(null);
	let exceed1 = $state(false);
	let exceed2 = $state(false);

	function close() {
		modalOpen = false;
		isValidPs = null;
		password = null;
		passwordShow = false;
	}

	async function handleAddEvmAccount() {
		if (accountState.accountList.length > 11) {
			exceed1 = true;
			return;
		}
		if (accountState.nextAccountIndex > 100) {
			exceed2 = true;
			return;
		}
		const result = (await checkIsLocked()) as signerResponseType | null;
		if (result?.data === false) {
			addEvmAccount();
		} else {
			modalOpen = true;
		}
	}

	async function checkPasswordAndAdd(ps: string) {
		const result = (await checkPassword(ps)) as signerResponseType | null;
		if (result?.data === true) {
			isValidPs = true;
			addEvmAccountWithPassword(ps);
			close();
		} else {
			isValidPs = false;
			setTimeout(() => {
				isValidPs = null;
			}, 3000);
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

<button
	onclick={async () => await handleAddEvmAccount()}
	class={{ "gray-button": exceed1 || exceed2, 'bottom-button': !exceed1 && !exceed2 }}
>
	{#if exceed1}
		You can only keep 12 accounts
	{/if}
	{#if exceed2}
		Too many times to add account
	{/if}
	{#if !exceed1 && !exceed2}
		Add new account
	{/if}
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
			<div class="title">Add New Account</div>
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
				<button class="start" onclick={async () => await checkPasswordAndAdd(password as string)}>
					Submit
				</button>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	

	.modal {
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
	.gray-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--storm700);
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}
	.title {
		display: flex;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 2rem;
	}
	.container {
		display: flex;
		align-items: center;
		width: 96%;
		padding: 0.8rem;
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
