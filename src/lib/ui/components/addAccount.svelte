<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { signer, addEvmAccount,checkPassword, isLocked, type signerResponseType,AddEvmAccountWithPassword, accountState } from '$lib/wallet/runes';
	import { Loading, CloseIcon, EyeIcon, EyeOffIcon } from '$lib/svg';


	let signerResponse =$state<signerResponseType | null>(null);
	signer.onmessage = (event) => {
		signerResponse = event.data;
	};

	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isLoading = $state(false);
	let isValidPs = $state<boolean | null>(null);

	async function handleAddEvmAccount() {
		isLocked();
		setTimeout(() => {
			if (signerResponse?.data === false) {
				addEvmAccount();
			} else {
				const popover = document.getElementById('add');
				if (popover) popover.showPopover();
			}
		}, 300);
	}

	async function checkPasswordAndAdd(ps: string) {
		checkPassword(ps);
		if (signerResponse?.data === true) {
			isValidPs = true;
			handleAddEvmAccountWithPassword(ps);
		} else {
			isValidPs = false;
			setTimeout(() => {
				isValidPs = null;
				password = null;
			}, 3000);
		}
	}

	async function handleAddEvmAccountWithPassword(ps: string) {
		AddEvmAccountWithPassword(ps);
		const popover = document.getElementById('add');
		if (popover) popover.hidePopover();
		password = null;
		passwordShow = false;
		isValidPs = null;
	}
</script>

<button class="bottom-button" onclick={handleAddEvmAccount}> Add new account &#x1F923</button>

<div id="add" popover="manual" class:active={isSmallScreen.current}>
	<button class="close" popovertarget="add" popovertargetaction="hide">
		<CloseIcon class="icon17A" />
	</button>
	<h3>Add New Account</h3>
	<div class="container">
		{#if passwordShow}
			<input
				class="input"
				type="text"
				placeholder="Please input your password"
				bind:value={password}
			/>
		{:else}
			<input
				class="input"
				type="password"
				placeholder="Please input your password"
				bind:value={password}
			/>
		{/if}
		<button class="eye" onclick={() => (passwordShow = !passwordShow)}>
			{#if passwordShow}
				<EyeIcon class="icon17B" />
			{:else}
				<EyeOffIcon class="icon17B" />
			{/if}
		</button>
	</div>

	<div class="form-label">
		{#if isValidPs === false}
			Invalid password
		{:else if isValidPs === true}
			<span> password is valid</span>
		{:else}
			<span> password is empty</span>
		{/if}
		<div>
			{signerResponse?.data}
		</div>
	</div>

	{#if password === null}
		<button class="start"> input your password</button>
	{:else if password !== null}
		<button class="start" onclick={() => checkPasswordAndAdd(password!.toString())}>
			Submit
		</button>
	{:else if isLoading}
		<button class="start"> <Loading class="icon17A" /> </button>
	{/if}
</div>

<style lang="postcss">
	.bottom-button {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
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
		height: 80%;
		width: 384px;
		padding: 16px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
	}
	.active {
		position: fixed;
		top: calc(100vh - 400px);
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 16px;
		margin: 0px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}
	.input {
		padding: 1.4rem;
		font-size: 1.4rem;
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
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-pink);
		box-sizing: border-box;
		width: 80%;
		margin-top: 32px;
		padding: 1rem;
		cursor: pointer;
	}

	.eye {
		width: 24px;
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
