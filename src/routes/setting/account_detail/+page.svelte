<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		CopyIcon,
		EditFilled,
		ArrowForward,
		ArrowDown,
		ArrowBack,
		CloseIcon,
		AlertCirCle,
		EditIcon
	} from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';
	import { dbStore, editElement } from '$lib/wallet/common';
	import { slide } from 'svelte/transition';
	import { shortenAddress6 } from '$lib/ui/ts';

	let name = $state('');
	let nameEdit = $state(false);
	let memo = $state('');
	let memoEdit = $state(false);
	let memoShow = $state(false);
	let copied = $state(false);

	function close() {
		const popover = document.getElementById('delete');
		if (popover) {
			popover.hidePopover();
		}
	}

	function saveName() {
		if (!name) return;
		if (!accountState.editingAccount) return;
		accountState.editingAccount.accountName = name;
		const account = $state.snapshot(accountState.editingAccount);
		if (account) {
			editElement(dbStore.Account.name, account);
			accountState.accountList = accountState.accountList.map((a) =>
				a.accountIndex === accountState.editingAccountIndex ? account : a
			);
		}
		nameEdit = false;
	}

	function saveMemo() {
		if (!memo) return;
		if (!accountState.editingAccount) return;
		accountState.editingAccount.memo = memo;
		const account = $state.snapshot(accountState.editingAccount);
		if (account) {
			editElement(dbStore.Account.name, account);
			accountState.accountList = accountState.accountList.map((a) =>
				a.accountIndex === accountState.editingAccountIndex ? account : a
			);
		}
		memoEdit = false;
	}

	function copyAddress() {
		if (!accountState.editingAccount) return;
		navigator.clipboard.writeText(accountState.editingAccount.address);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 3000);
	}

	function deleteAccount() {
		accountState.deleteAccount();
		close();
		goto('/#/setting/account_manage');
	}

	function toggleHideAccount() {
		accountState.hiddenAccounts();
	}

	function generateAvatar(address: string) {
		return toSvg(address, 100);
	}

	const popover = document.getElementById('delete')
	console.log(popover);
</script>

<div class="appContainer">
	<div class="appBody">
		<div class="item-container2">
			<a class="back" href="/#/setting/account_manage">
				<ArrowBack class="icon2A" />
			</a>
		</div>
		<div class="item-container2">
			<div class="avatar">
				{#if accountState.editingAccountIndex === 0}
					0
				{:else}
					{@html generateAvatar(accountState.editingAccount?.address ?? '')}
				{/if}
				<div class="edit">
					<EditFilled class="icon3rem" />
				</div>
			</div>
		</div>
		<div class="address-container">
			<span class="address">{shortenAddress6(accountState.editingAccount?.address ?? '')}</span>

			{#if copied}
				<div class="copied">Copied</div>
			{:else}
				<button class="copyicon" onclick={copyAddress}>
					<CopyIcon class="icon18A" />
				</button>
			{/if}
		</div>
		<!--name -->

		{#if accountState.editingAccountIndex === 0}
			<div class="setting-top">
				<div class="item">
					<div class="item-l">
						<span class="label2">Please select an account</span>
					</div>
				</div>
			</div>
		{:else}
			<div class="setting-top">
				<div class="item">
					<div class="item-l">
						{#if nameEdit}
							<input class="input-name" maxlength="20" type="text" bind:value={name} />
						{:else}
							<span class="label2"
								>Account Name:
								<span class="label-name">{accountState.editingAccount?.accountName}</span>
							</span>
						{/if}
					</div>
					{#if nameEdit}
						<div class="item-r">
							<button class="save" onclick={saveName}>Save</button>
						</div>
					{:else}
						<button class="item-r" onclick={() => (nameEdit = true)}
							><EditIcon class="icon18A" /></button
						>
					{/if}
				</div>
			</div>
		{/if}

		<!--index -->
		<div class="setting-medium">
			<div class="item">
				<div class="item-l">
					<span class="label2">Account Index:
						<span class="label-name">{accountState.editingAccountIndex}</span>
					</span>
				</div>
			</div>
		</div>
		<!--memo -->
		<div class="memo">
			<div class="item">
				<div class="item-l">
					<span class="label2">Memo</span>
				</div>

				{#if memoShow}
					<button class="item-r" onclick={() => (memoShow = !memoShow)}
						><ArrowDown class="icon18A" /></button
					>
				{:else}
					<button class="item-r" onclick={() => (memoShow = !memoShow)}
						><ArrowForward class="icon18A" /></button
					>
				{/if}
			</div>

			{#if memoShow}
				<div class="wrap" transition:slide>
					{#if memoEdit}
						<div class="memo-wrap">
							<textarea class="memo-input" maxlength="100" bind:value={memo}></textarea>
							<div class="memo-edit">
								<button class="memo-save" onclick={saveMemo}>Save</button>
							</div>
						</div>
					{:else}
						<div class="memo-content">
							{accountState.editingAccount?.memo}
							<button class="memo-edit" onclick={() => (memoEdit = true)}>
								<EditIcon class="icon18A" />
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!--hidden -->
		<div class="setting1">
			<div class="item">
				<div class="item-l">
					<span class="label2">Hidden Account</span>
				</div>

				<div class="item-r">
					<div class="toggle-switch">
						<input
							class="toggle-input"
							id="hideAccount"
							type="checkbox"
							checked={accountState.editingAccount?.isHidden}
							onclick={toggleHideAccount}
						/>
						<label class="toggle-label" for="hideAccount"></label>
					</div>
				</div>
			</div>
		</div>

		<button class="delete" popovertarget="delete" popovertargetaction="show">Delete Account</button>
	</div>
</div>

<div id="delete" popover="manual" class:active={isSmallScreen.current}>
	<button class="close" onclick={close}>
		<CloseIcon class="icon18A" />
	</button>
	<div class="label3">Delete Account</div>
	<div>
		<AlertCirCle class="icon3rem" />
	</div>
	<div class="alert">
		If you want to recover this account later, you should save the account index. This account's
		index is:
	</div>
	<div class="label3">{accountState.editingAccountIndex}</div>
	<div class="container">
		<button class="cancel" onclick={close}>Cancel</button>
		<button class="action" onclick={deleteAccount}>Delete</button>
	</div>
</div>

<style lang="postcss">
	.address-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		padding: 1rem;
		height: 4rem;
	}
	.copyicon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
	}
	.copied {
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
		background: var(--green4);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0.8rem;
		border-radius: 1.2rem;
		width: auto;
		height: 1.8rem;
		border: none;
		cursor: pointer;
	}
	.address {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text);
		margin-right: 0.8rem;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background: none;
		border: none;
	}
	.back {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border: none;
		background: none;
		width: 100%;
	}
	.save {
		padding: 0.4rem 0.8rem;
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
		background: var(--color-pink);
		border: none;
		border-radius: 1.2rem;
		cursor: pointer;
	}
	.input-name {
		width: 30rem;
		padding: 1rem;
		border: 1px solid var(--color-bg3);
		background: var(--color-bg2);
		border-radius: 1.6rem;
		box-sizing: border-box;
	}
	.memo-input {
		font-size: 1.2rem;
		margin-top: 1rem;
		position: relative;
		width: 100%;
		height: 12rem;
		padding: 1rem;
		background: var(--color-bg2);
		border: 1px solid var(--color-bg3);
		border-radius: 1.6rem;
		box-sizing: border-box;
		resize: none;
	}
	.memo-save {
		position: absolute;
		bottom: 0rem;
		right: 0rem;
		padding: 0.4rem 1rem;
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
		background: var(--color-pink);
		border: none;
		border-radius: 1.2rem;
		cursor: pointer;
	}
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 80%;
		gap: 1rem;
	}
	.memo {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: var(--color-bg1);
		border-bottom-left-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		padding: 1.2rem 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: none;

	}
	.memo-content {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 1rem;
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: 500;
		height: 12rem;
		width: 100%;
		background: var(--color-bg);
		border-radius: 1.6rem;
		box-sizing: border-box;
		border: 1px solid transparent;
	}
	.label-name{
		font-size: 1.5rem;
	font-weight: 600;
	margin-left: 1rem;
	}

	.memo-wrap {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.memo-edit {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		background: none;
		border-radius: 1.6rem;
		box-sizing: border-box;
		border: 1px solid transparent;
	}
	.alert {
		width: 75%;
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--color-text);
	}
	.delete {
		display: flex;
		justify-content: flex-start;
		font-size: 1.5rem;
		font-weight: 600;
		width: 100%;
		color: var(--color-pink);
		background: var(--color-bg1);
		border: none;
		padding: 1.5rem 2rem;
		cursor: pointer;
		height: 5rem;
		margin-bottom: 0.8rem;
		border-radius: 1.6rem;
		&:hover {
			background: var(--color-bg2);
		}
	}

	.item-container2 {
		margin-bottom: 2rem;
	}
	.item-l {
		margin-left: 1rem;
	}
	.avatar {
		aspect-ratio: 1 / 1;
		position: relative;
		width: 12rem;
		height: 12rem;
		background: var(--color-bg1);
		border: 2px solid var(--color-border);
	}
	.cancel {
		color: var(--color-text);
		font-size: 1.7rem;
		font-weight: 600;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-bg2);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}
	.action {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		border: none;
		border-radius: 1.6rem;
		background: var(--color-pink);
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

	.edit {
		position: absolute;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		background: var(--color-bg2);
		border: 1px solid var(--color-border);
	}
	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 40px;
		height: 24px;
	}

	.toggle-switch .toggle-input {
		display: none;
	}

	.toggle-switch .toggle-label {
		position: absolute;
		top: 0;
		left: 0;
		width: 40px;
		height: 24px;
		background-color: var(--color-bg3);
		border-radius: 34px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.toggle-switch .toggle-label::before {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		top: 2px;
		left: 2px;
		background-color: var(--color-bg1);
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s;
	}

	.toggle-switch .toggle-input:checked + .toggle-label {
		background-color: var(--green4);
	}

	.toggle-switch .toggle-input:checked + .toggle-label::before {
		transform: translateX(16px);
	}
</style>
