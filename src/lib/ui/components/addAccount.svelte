<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		checkIsLocked,
		addEvmAccount,
		addPolkadotAccount,
		checkPassword,
		type signerResponseType,
		addEvmAccountWithPassword,
		addPolkadotAccountWithPassword
	} from '$lib/wallet/runes';
	import { CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { fade, fly } from 'svelte/transition';

	let modalList = $state<'' | 'nopass' | 'pass'>('');
	let type = $state('EVM');
	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isValidPs = $state<boolean | null>(null);
	let exceed = $state<number[]>([0, 0, 0]);

	function close() {
		isValidPs = null;
		password = null;
		passwordShow = false;
		modalList = '';
	}

	async function checkModalList() {
		if (accountState.accountList.length > 19) {
			exceed[0] = 1;
			return;
		}
		if (accountState.nextAccountIndex > 100) {
			exceed[1] = 1;
			return;
		}
		if (accountState.nextPolkadotIndex > 200) {
			exceed[2] = 1;
			return;
		}
		const result = (await checkIsLocked()) as signerResponseType | null;
		if (result?.data === false) {
			modalList = 'nopass';
		}

		if (result?.data === true) {
			modalList = 'pass';
		}
	}

	async function handleAddAccount() {
		if (type === 'EVM') {
			addEvmAccount();
		} else if (type === 'POLKADOT') {
			addPolkadotAccount('sr25519');
		}
		close();
	}

	async function checkPasswordAndAdd(ps: string) {
		const result = (await checkPassword(ps)) as signerResponseType | null;
		if (result?.data === true) {
			isValidPs = true;
			if (type === 'EVM') {
				addEvmAccountWithPassword(ps);
			}
			if (type === 'POLKADOT') {
				addPolkadotAccountWithPassword(ps, 'sr25519');
			}
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
			modalList = '';
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			modalList = '';
		}
	}

	$effect(() => {
		if (modalList === 'pass' || modalList === 'nopass') {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<button
	onclick={async () => await checkModalList()}
	class={{
		'gray-button': exceed[0] === 1 || exceed[1] === 1 || exceed[2] === 1,
		'bottom-button': exceed[0] === 0 && exceed[1] === 0 && exceed[2] === 0
	}}
>
	{#if exceed[0] === 1}
		You can only keep 20 accounts
	{/if}
	{#if exceed[1] === 1}
		Too many times to add Ethereum account
	{/if}
	{#if exceed[2] === 1}
		Too many times to add Polkadot account
	{/if}
	{#if exceed[0] === 0 && exceed[1] === 0 && exceed[2] === 0}
		Add new account
	{/if}
</button>

{#if modalList === 'pass'}


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
			<div class="top1">
				<button class="close" onclick={close}>
					<CloseIcon class="icon2A" />
				</button>
			</div>
			<div class="title">Add New Account</div>
			<div class="container">
				{#if passwordShow}
					<input
						id="password"
						class="input-password"
						type="text"
						placeholder="Please input your password"
						autocomplete="off"
						bind:value={password}
					/>
				{:else}
					<input
						id="password"
						class="input-password"
						type="password"
						placeholder="Please input your password"
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

{#if modalList === 'nopass'}


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
			<div class="top1">
				<button class="close" onclick={close}>
					<CloseIcon class="icon2A" />
				</button>
			</div>
			<div class="title">Add New Account</div>

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
			<button class="start" onclick={handleAddAccount}>Submit</button>
		</div>
	</div>
{/if}

<style lang="postcss">
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
	:global(.backdrop) {
		position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.25);
	backdrop-filter: blur( 1rem );
	z-index: 1000;
  }
	.modal {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 70%;
		width: 38.4rem;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
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
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}
	.gray-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--storm3);
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
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--pink);
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
