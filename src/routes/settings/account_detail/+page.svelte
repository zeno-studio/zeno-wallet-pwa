<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		CopyIcon,
		EditFilled,
		ArrowForward,
		ArrowDown,
		ArrowBack,
		AlertBox,
		EditIcon
	} from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { toSvg } from 'jdenticon';
	import { goto } from '$app/navigation';
	import { DB, editElement } from '$lib/wallet/common';
	import { slide } from 'svelte/transition';
	import { shortenAddress6 } from '$lib/ui/ts';
	import { Header } from '$lib/ui/components';
	import { metadata } from '$lib/ui/runes';
	import { Modal } from '$lib/ui/components';

	metadata.title = 'Settings';
	metadata.description = 'Settings';
	let modalOpen = $state(false);

	let name = $state('');
	let nameEdit = $state(false);
	let memo = $state('');
	let memoEdit = $state(false);
	let memoShow = $state(false);
	let copied = $state(false);

	function saveName() {
		if (!name) return;
		if (!accountState.editingAccount) return;
		accountState.editingAccount.name = name;
		const account = $state.snapshot(accountState.editingAccount);
		if (account) {
			editElement(DB.Account.name, account);
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
			editElement(DB.Account.name, account);
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
		goto('/#/settings/account_manage');
	}

	function toggleHideAccount() {
		accountState.hiddenAccounts();
	}

	function generateAvatar(address: string) {
		return toSvg(address, 100);
	}
</script>

{#if !isSmallScreen.current}
	<Header />
{/if}
<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	<div class="label-top">
		<a class="top-back" href="/#/settings/account_manage">
			<ArrowBack class="icon2A" />
		</a>Account Information
	</div>
	<div class="setting-dividing2"></div>

	<div class="item-container2">
		<div class="avatar">
			{#if accountState.editingAccountIndex === 0}
				0
			{:else}
				{@html generateAvatar(accountState.editingAccount?.address ?? '')}
			{/if}
			<div class="edit">
				<EditFilled class="icon3" />
			</div>
		</div>
	</div>
	<div class="address-container">
		<span class="address"
			>[{accountState.editingAccount?.addressType}]:{shortenAddress6(
				accountState.editingAccount?.address ?? ''
			)}</span
		>

		{#if copied}
			<div class="copied">Copied</div>
		{:else}
			<button class="copyicon" onclick={copyAddress}>
				<CopyIcon class="icon2A" />
			</button>
		{/if}
	</div>

	<div class="setting">
		<!--name -->
		{#if accountState.editingAccountIndex === 0}
			<div class="setting-entry">
				<span class="label-m" style="color: var(--text)"> Please select an account</span>
			</div>
		{:else}
			<div class="setting-entry">
				{#if nameEdit}
					<input class="input-name" maxlength="20" type="text" bind:value={name} />
				{:else}
					<span class="label-m" style="color: var(--text)">
						Account Name:
						<span class="label-name">{accountState.editingAccount?.name}</span>
					</span>
				{/if}

				{#if nameEdit}
					<div class="item-r">
						<button class="save" onclick={saveName}>Save</button>
					</div>
				{:else}
				<div class="item-r">
					<button class="edit-btn" onclick={() => (nameEdit = true)}
						><EditIcon class="icon2A" /></button
					>
				</div>
				{/if}
			</div>
		{/if}
		<div class="setting-dividing"></div>
		<!--index -->
		<div class="setting-entry">
			<span class="label-m" style="color: var(--text)">
				Account Index:
				<span class="label-name">{accountState.editingAccountIndex}</span>
			</span>
		</div>
		<div class="setting-dividing"></div>
		<!--memo -->
		<div class="setting-entry">
			<span class="label-m" style="color: var(--text)">Memo</span>

			{#if memoShow}
				<button class="item-r" onclick={() => (memoShow = !memoShow)}
					><ArrowDown class="icon2A" /></button
				>
			{:else}
				<button class="item-r" onclick={() => (memoShow = !memoShow)}
					><ArrowForward class="icon2A" /></button
				>
			{/if}
		</div>

		{#if memoShow}
			<div class="wrap" transition:slide>
				{#if !memoEdit}
				<div class="memo-content">
					{accountState.editingAccount?.memo}
					<button class="memo-edit" onclick={() => (memoEdit = true)}>
						<EditIcon class="icon2A" />
					</button>
				</div>
				{:else}
					<div class="memo-wrap">
						<textarea class="memo-input" maxlength="100" bind:value={memo}></textarea>
						<button class="memo-save" onclick={saveMemo}>Save</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!--hidden -->
	<div class="setting">
		<div class="setting-entry">
			<span class="label-m" style="color: var(--text)">Hidden Account</span>

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

	<div class="setting">
		<button class="delete" onclick={() => (modalOpen = true)}>Remove Account</button>
	</div>
</div>

{#snippet removeAccount()}
	<div class="title">Remove Account</div>
	<div class="alert-wrap">
		<AlertBox class="icon16Y" />
	</div>
	<div class="tip2">
		If you want to recover this account later, you should save the account index. This account's
		index is:
	</div>
	<h1>{accountState.editingAccountIndex}</h1>
	<div class="container">
		<button class="cancel" onclick={() => (modalOpen = false)}>Cancel</button>
		<button class="action" onclick={deleteAccount}>Delete</button>
	</div>
{/snippet}

<Modal bind:modalName={modalOpen} mode="half" content={removeAccount} />

<style lang="postcss">
	.appBody-d {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 1rem 1rem 0rem 1rem;
	}

	.tip2 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		color: var(--text);
		font-size: 1.5rem;
		font-weight: 500;
		width: 70%;
		border: 2px dashed var(--accent-yellow);
		border-radius: 1.6rem;
		padding: 1rem;
		width: 70%;
	}

	.item-container2 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding: 0px;
		margin-bottom: 1rem;
	}

	.item-r {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: absolute;
		right: 0;
		padding: 0;
		margin: 0;
		border: none;
		background: none;
	}
	.edit-btn {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 0px;
		height: 3rem;
		width: 3rem;
		padding: 0.4rem;
		margin: 0;
		border-radius: 50%;
		box-sizing: border-box;
		border: none;
		background: var(--bg3);
	}

	.alert-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		background: var(--accent-yellow-back);
		border-radius: 50%;
	}
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
		font-size: 1.4rem;
		font-weight: 500;
		color: #fff;
		background: var(--success);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0.8rem;
		border-radius: 1.3rem;
		width: auto;
		height: 1.8rem;
		border: none;
		cursor: pointer;
	}
	.address {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text);
		margin-right: 0.8rem;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background: none;
		border: none;
		margin-bottom: 1rem;
	}
	.top-back {
		position: absolute;
		left: 1rem;
		display: flex;
		align-items: center;
		border: none;
		background: none;
	}
	.save {
		padding: 0.4rem 0.8rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: #fff;
		background: var(--success);
		border: none;
		border-radius: 1.3rem;
		cursor: pointer;
	}
	.input-name {
		width: 30rem;
		padding: 1rem 1rem 1rem 2rem;
		border: 1px solid var(--border);
		font-size: 1.4rem;
		background: var(--bg3);
		border-radius: 2rem;
		box-sizing: border-box;
		&:active,
		&:focus {
			border: 1px solid var(--accent-blue);
			outline: none;
		}
	}
	.memo-input {
		font-size: 1.4rem;
		position: relative;
		width: 100%;
		height: 12rem;
		padding: 1rem;
		background: var(--bg3);
		border: 1px solid var(--border);
		border-radius: 1.6rem;
		box-sizing: border-box;
		resize: none;
	}
	.memo-save {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		padding: 0.4rem 1rem;
		font-size: 1.5rem;
		color: #fff;
		background: var(--success);
		border: none;
		border-radius: 1.3rem;
		cursor: pointer;
	}
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 80%;
		gap: 1rem;
	}

	.memo-content {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 1rem;
		font-size: 1.4rem;
		font-weight: 500;
		height: 12rem;
		width: 100%;
		background: var(--bg);
		border-radius: 1.6rem;
		box-sizing: border-box;
		border: 1px solid transparent;
	}
	.label-name {
		font-size: 1.6rem;
		font-weight: 600;
		margin-left: 1rem;
		color: var(--color);
	}

	.memo-wrap {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.memo-edit {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		height: 3rem;
		width: 3rem;
		background: var(--bg1);
		bottom: 1rem;
		right: 1rem;
		padding: 0.4rem;
		border-radius: 50%;
		box-sizing: border-box;
		border: none;
	}

	.delete {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6rem;
		font-weight: 500;
		width: 100%;
		color: red;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: 1.6rem;
		height: 5rem;
		padding: 0rem;
	}

	.avatar {
		flex-shrink: 0;
		position: relative;
		width: 12rem;
		height: 12rem;
		background: #fff;
		border: 3px solid var(--bg1);
	}
	.cancel {
		color: var(--text);
		font-size: 1.6rem;
		font-weight: 500;
		border: none;
		border-radius: 1.6rem;
		background: var(--bg1);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}
	.action {
		color: #fff;
		font-size: 1.6rem;
		font-weight: 500;
		border: none;
		border-radius: 1.6rem;
		background: var(--primary);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}

	.edit {
		position: absolute;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		background: var(--bg1);
		border: 1px solid var(--bg3);
	}

	.setting {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: var(--bg1);
		border-radius: 1.6rem;
		padding: 0rem 1.5rem 0rem 2rem;
		cursor: pointer;
		border: none;
		margin-bottom: 0.8rem;
	}

	.setting-entry {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 0;
		background: none;
		border: none;
		color: var(--color);
		margin: 1.2rem 0 1.2rem 0;
		cursor: pointer;
	}
	.setting-dividing {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		height: 1px;
		background: var(--bg);
		border-radius: 1.6rem;
		padding: 0;
		margin: 0rem;
		border: none;
	}

	.setting-dividing2 {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		height: 1px;
		background: var(--border);
		border-radius: 1.6rem;
		padding: 0;
		margin-bottom: 2rem;
		border: none;
	}

	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 5rem;
		height: 3rem;
	}

	.toggle-switch .toggle-input {
		display: none;
	}

	.toggle-switch .toggle-label {
		position: absolute;
		top: 0;
		left: 0;
		width: 5rem;
		height: 3rem;
		background-color: var(--bg3);
		border-radius: 3rem;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.toggle-switch .toggle-label::before {
		content: '';
		position: absolute;
		width: 2.6rem;
		height: 2.6rem;
		border-radius: 50%;
		top: 0.2rem;
		left: 0.2rem;
		background-color: var(--bg1);
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s;
	}

	.toggle-switch .toggle-input:checked + .toggle-label {
		background-color: var(--success);
	}

	.toggle-switch .toggle-input:checked + .toggle-label::before {
		transform: translateX(2rem);
	}
</style>
