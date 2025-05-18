<script lang="ts">
	import { EyeIcon, EyeOffIcon, AlertTriangle,CheckIcon} from '$lib/svg';
	import {
		getElement,
		DB,
		type Vault,
		type Settings,
		type signerResponseType
	} from '$lib/wallet/common';
	import { setTimer, disableAutoLock, checkIsLocked, checkPassword,generalState } from '$lib/wallet/runes';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';

	const { isModalOpen, closeModal, updatePageTitle, currentPage } =
		getContext<ModalContext>('modal');

	const timers = [
		{ label: 'Disable remember password', value: 0 },
		{ label: '5 minute', value: 5 },
		{ label: '10 minute', value: 10 },
		{ label: '15 minute', value: 15 },
		{ label: '30 minute', value: 30 },
		{ label: '1 hour', value: 60 },
	];

	let isLocked = $state<boolean | null>(null);
	let password = $state<string | null>(null);
	let passwordShow = $state(false);
	let isValidPs = $state<boolean | null>(null);

	const initPage = async () => {
		const res = (await checkIsLocked()) as signerResponseType | null;
		if (res?.data === true) {
			updatePageTitle(1, 'Input your password');
			isLocked = res.data;
		}
		if (res?.data === false) {
			updatePageTitle(1, 'Set auto-lock timer');
			isLocked = res.data;
		}
	};

	initPage();

	const check = async (password: string) => {
		const res = (await checkPassword(password)) as signerResponseType;
		if (res?.success === true) {
			isValidPs = true;
			updatePageTitle(2, 'Set auto-lock timer');
		} else {
			isValidPs = false;
			setTimeout(() => {
				isValidPs = null;
			}, 2000);
		}
	};

	const handleDisableAutoLock = async (password?: string) => {
		let res: signerResponseType | null = null;
		if (password) {
			const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
			res = (await disableAutoLock(password, vault.salt)) as signerResponseType;
		}else {
			res = (await disableAutoLock()) as signerResponseType;
		}
		if (res?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			settings.autoLock = false;
			generalState.isAutoLock = false;
			localStorage.setItem('settings', JSON.stringify(settings));
		}
	};

	const handleSetTimer = async (time: number,password?: string) => {
		let res: signerResponseType | null = null;
		if (password) {
			const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
			res = (await setTimer(time, password, vault.salt)) as signerResponseType;
		} else {
			res = (await setTimer(time)) as signerResponseType;
		}
		if (res?.success === true) {
			const settings = JSON.parse(localStorage.getItem('settings')!) as Settings;
			settings.autoLockTimer = time;
			settings.autoLock = true;
			generalState.isAutoLock = true;
			generalState.autoLockTimer = time;
			localStorage.setItem('settings', JSON.stringify(settings));
		} else {
			throw new Error('Error when setting timer');
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

{#if isLocked === true}
	{#if currentPage() === 1}
		<div class="step2">
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
			{:else if isValidPs === false}
				<button class="start"> invalid current password</button>
			{:else if password}
				<button class="submit" onclick={() => check(password!)}> Submit </button>
			{/if}
		</div>
	{/if}
	{#if currentPage() === 2}
		<div class="container">
			{#each timers as timer}
				<button
					class="item-button"
					onclick={() => handleSetTimer(timer.value, password!)}
				>
					<div class="item-l">
						{timer.label}
					</div>

					<div class="item-r" >
						{#if timer.value === generalState.autoLockTimer}
							<CheckIcon class="icon2A" />
						{/if}
					</div>
				</button>
			{/each}
			<button
					class="item-button"
					onclick={() => handleDisableAutoLock(password!)}
				>
					<div class="item-l">
						Disable auto-lock
					</div>

					<div class="item-r" >
						{#if  generalState.isAutoLock === false}
							<CheckIcon class="icon2A" />
						{/if}
					</div>
				</button>
		</div>
	{/if}
{:else if isLocked === false}
	{#if currentPage() === 1}
		<div class="container">
			{#each timers as timer}
				<button
					class="item-button"
					onclick={() => handleSetTimer(timer.value)}
				>
					<div class="item-l">
						{timer.label}
					</div>

					<div class="item-r" >
						{#if timer.value === generalState.autoLockTimer}
							<CheckIcon class="icon2S" />
						{/if}
					</div>
				</button>
			{/each}
			<button
					class="item-button"
					onclick={() => handleDisableAutoLock()}
				>
					<div class="item-l">
						Disable auto-lock
					</div>

					<div class="item-r" >
						{#if  generalState.isAutoLock === false}
							<CheckIcon class="icon2S" />
						{/if}
					</div>
				</button>
		</div>
	{/if}
{/if}

<style lang="postcss">

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

	.item-l {
		display: flex;
	}

	.item-r {
		position: absolute;
		right: 0px;
		fill: none;
		border: none;
		background: none;
		margin-right: 1rem;
	}
	.item-button {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1rem;
		background: none;
		border: none;
		color: var(--color);
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		width: 100%;
		background: none;
		margin-bottom: 1px;
	}
	.item-button:hover {
		background: var(--bg2);
		border-radius: 0.8rem;
	}
</style>
