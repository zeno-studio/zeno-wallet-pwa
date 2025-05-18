<script lang="ts">
	import {
		checkPassword,
		addEvmAccount,
		addPolkadotAccount,
		accountState
	} from '$lib/wallet/runes';
	import { EyeIcon, EyeOffIcon } from '$lib/svg';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
	import {
		getElement,
		DB,
		type signerResponseType,
		type Vault,
		type Settings,
		type Account,
		type KeyringType
	} from '$lib/wallet/common';

	const { isModalOpen, closeModal, updatePageTitle } = getContext<ModalContext>('modal');

	updatePageTitle(1, 'Add New Account');

	let { needpass } = $props();
	let type = $state('EVM');
	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isValidPs = $state<boolean | null>(null);

	const handleAddAccount = async () => {
		if (type === 'EVM') {
			handleAddEvmAccount();
		} else if (type === 'POLKADOT') {
			handleAddPolkadotAccount('sr25519');
		}
		closeModal();
	};

	export const handleAddEvmAccount = async (password?: string) => {
		let res: signerResponseType | null = null;
		if (password) {
			const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
			res = (await addEvmAccount(password, vault.salt)) as signerResponseType | null;
		} else {
			res = (await addEvmAccount()) as signerResponseType | null;
		}

		if (res?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			const newAccount = res.data as Account;
			accountState.accountList = [...accountState.accountList, newAccount];
			accountState.currentAccountIndex = settings.nextAccountIndex;
			accountState.nextAccountIndex++;
			settings.currentAccountIndex = settings.nextAccountIndex;
			settings.nextAccountIndex++;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	};

	const handleAddPolkadotAccount = async (type: KeyringType,password?: string) => {
		let res: signerResponseType | null = null;
		if (password) {
			const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
			res = (await addPolkadotAccount(type,password,vault.salt)) as signerResponseType | null;
		} else {
			res = (await addPolkadotAccount(type)) as signerResponseType | null;
		}
		
		try {
			if (res?.success === true) {
				const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
				const newAccount = res.data as Account;
				accountState.accountList = [...accountState.accountList, newAccount];
				accountState.currentAccountIndex = settings.nextPolkadotIndex;
				accountState.nextPolkadotIndex++;
				settings.currentAccountIndex = settings.nextPolkadotIndex;
				settings.nextPolkadotIndex++;
				localStorage.setItem('settings', JSON.stringify(settings));
			}
		} catch (e) {
			console.error('Error when adding new account', e);
		}
	};

	const checkPasswordAndAdd = async (ps: string) => {
		const result = (await checkPassword(ps)) as signerResponseType | null;
		if (result?.data === true) {
			isValidPs = true;
			if (type === 'EVM') {
				handleAddEvmAccount(ps);
			}
			if (type === 'POLKADOT') {
				handleAddPolkadotAccount('sr25519',ps);
			}
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

{#if needpass === 'need'}
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

	{#if password === null}
		<button class="start"> input your password</button>
	{:else if password !== null}
		<button class="start" onclick={async () => await checkPasswordAndAdd(password!)}>
			Submit
		</button>
	{/if}
{/if}

{#if needpass === 'neednot'}
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
	<button class="start" onclick={handleAddAccount}>Submit</button>
{/if}

<style lang="postcss">
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
