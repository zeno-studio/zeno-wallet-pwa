<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { EyeIcon, EyeOffIcon, ArrowForward, CloseIcon } from '$lib/svg';
	import { checkPasswordStrength } from '$lib/ui/ts';
	import { checkPassword, changePassword, type signerResponseType } from '$lib/wallet/runes';
	import { fade} from 'svelte/transition';
	import { Gesture } from '@use-gesture/vanilla';

	let modalOpen = $state(false);
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
	let modalBody = $state<HTMLElement | null>(null);
	let y = $state(0);

	function close() {
		modalOpen = false;
		password = null;
		password2 = null;
		passwordShow = false;
		currentPassword = null;
		modalBody = null;
		isValid = null;
		y = 0;
	}

	async function checkPasswordAndChange(currentPassword: string, newPassword: string) {
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
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	$effect(() => {
		if (modalBody && modalOpen) {
			const gesture = new Gesture(modalBody, {
				onDrag: ({ movement: [, my], velocity: [, vy], direction: [, dy] }) => {
					if (my > 0) y = my;
					if (my > 200 && vy > 0.5 && dy > 0) {
						modalOpen = false;
						y = 0;
					}
				},
				onDragEnd: () => {
					if (modalOpen && y > 0) y = 0;
				}
			});
			return () => gesture.destroy();
		}
	});

	$effect(() => {
		if (modalOpen) {
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<button class="setting1" onclick={() => (modalOpen = true)}>
    <div class="item">
        <div class="entry">Change Password</div>
        <div class="item-r"><ArrowForward class="icon2A" /></div>
    </div>
</button>

{#if modalOpen}
	<div
		class="backdrop"
		role="dialog"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		tabindex="-1"
	>
		<div
			bind:this={modalBody}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			style="transform: translateY({y}px)"
		>
			{#if isSmallScreen.current}
				<div class="drag-bar"></div>
			{:else}
				<div class="top">
					<button class="close-btn" onclick={close}><CloseIcon class="icon2A" /></button>
				</div>
			{/if}

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
						At least 8 characters long, containing at least 1 uppercase letter, 1 numeric digit, and
						1 special character.
					</div>
				{/if}

				{#if currentPassword === null || password === null || password2 === null}
					<button class="start"> Setting your password</button>
				{:else if password !== password2}
					<button class="start"> Password not match</button>
				{:else if isValid===false}
					<button class="start"> invalid current password</button>
				{:else if password === password2 && psStrength === 'weak'}
					<button class="start"> Password too weak</button>
				{:else if password === password2 && psStrength !== 'weak' && currentPassword !== null}
					<button class="submit" onclick={() => checkPasswordAndChange(currentPassword!, password!)}> Submit</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
    	.item {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 0px;
		background: none;
		border: none;
		color: var(--color);
	}
	.item-r {
		position: absolute;
		right: 0px;
		fill: none;
		border: none;
		background: none;
	}
	.entry{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 500;
		width: 100%;
		margin-left: 1rem;
		color: var(--color);
	}

	.setting1 {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;
		height: 6rem;
		&:hover {
			background: var(--bg3);
		}
	}
	
	

	.modal {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		color: var(--text);
		height: 99%;
		width: 38.4rem;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
		touch-action: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}
	.modal-m {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		top: 1rem;
		height: 100vh;
		width: 100vw;
		padding: 2rem 2rem 8rem 2rem;
		background: var(--bg1);
		border-top-left-radius: 1.6rem;
		border-top-right-radius: 1.6rem;
		border: 1px solid var(--bg3);
		touch-action: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.top {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}
    .close-btn {
		display: flex;
		position: absolute;
		right: 0;
		margin: 0;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}
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
