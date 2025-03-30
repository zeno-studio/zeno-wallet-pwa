<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		checkIsLocked,
		addEvmAccount,
		checkPassword,
		type signerResponseType,
		AddEvmAccountWithPassword
	} from '$lib/wallet/runes';
	import { CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';

	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isValidPs = $state<boolean | null>(null);
	let exceed1 = $state(false);
	let exceed2 = $state(false);
	
		function close() {
		const popover = document.getElementById('add');
		if (popover) {
			popover.hidePopover();
		}
		const passwordInput = document.getElementById('password') as HTMLInputElement;
		if (passwordInput) {
			passwordInput.value = '';
		}
		isValidPs = null
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
			const popover = document.getElementById('add');
			if (popover) popover.showPopover();
	}
}

	async function checkPasswordAndAdd(ps: string) {
		const result = (await checkPassword(ps)) as signerResponseType | null;
		if (result?.data === true) {
			isValidPs = true;
			AddEvmAccountWithPassword(ps);
			close()
		} else {
			isValidPs = false;
			setTimeout(() => {
				isValidPs = null;
			}, 3000);
		}
	}
</script>

<button onclick={async () => await handleAddEvmAccount()}
	class={{'red': (exceed1 || exceed2), 'bottom-button':(!exceed1 && !exceed2)}}
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

<div id="add" popover="manual" class:active={isSmallScreen.current}>
	<button class="close" onclick={close}>
		<CloseIcon class="icon18A" />
	</button>
	<div class="title">Add New Account</div>
	<div class="container">
		{#if passwordShow}
			<input
				id ="password"
				class="input"
				type="text"
				placeholder="Please input your password"
				autocomplete="off"
				bind:value={password}
			/>
		{:else}
			<input
				id ="password"
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

<style lang="postcss">
	.red {
		background: var(--color-pink);
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
	.title{
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
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-blue);
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
		height: 70%;
		width: 38.4rem;
		padding: 1.6rem;
		background: var(--color-bg1);
		border-radius: 2rem;
		border: 1px solid var(--color-border);
		overflow: hidden;
	}
	.active {
		position: fixed;
		top: calc(100vh - 400px);
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
