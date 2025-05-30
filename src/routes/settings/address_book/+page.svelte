<script lang="ts">
	import { accountState, addressBook } from '$lib/wallet/runes';
	import { isSmallScreen, shortenAddress6, getFirstAndLast } from '$lib/ui/ts';
	import { goto } from '$app/navigation';
	import { CloseIcon, DeleteIcon, AlertTriangle, ArrowBack } from '$lib/svg';
	import { toSvg } from 'jdenticon';
	import { type AddressEntry, detectAddressType, type Account } from '$lib/wallet/common';
	import { fade, fly } from 'svelte/transition';
	import { Header } from '$lib/ui/components';
	import { metadata } from '$lib/ui/runes';
	metadata.title = 'Settings';
	metadata.description = 'Settings';
	let modalOpen = $state(false);

	addressBook.getAddressBook();
	let search = $state('');
	let searchedAccounts = $state<Account[]>([]);
	let searchedAddresses = $state<AddressEntry[]>([]);
	let error = $state('');

	function generateAvatar(address: string) {
		return toSvg(address, 30);
	}

	const emptyEntry: AddressEntry = {
		name: '',
		addressType: '',
		address: '',
		ens: undefined,
		memo: undefined,
		avatar: undefined
	};

	let newEntry = $state(emptyEntry);
	let isValidAddress = $derived.by(() => {
		if (newEntry.address === '') return null;
		return detectAddressType(newEntry.address) !== '';
	});

	function gotoAddressEntry(addressEntry: AddressEntry) {
		addressBook.selectedEntry = addressEntry;
		goto('#/settings/address_book/addres_entry');
	}
	function gotoAccountDetail(account: Account) {
		const i = searchedAccounts.findIndex((a) => a.address === account.address);
		const index = searchedAccounts[i].accountIndex;
		addressBook.selectedEntry = searchedAccounts[i];
		accountState.editingAccountIndex = index;
		goto('#/settings/account_detail');
	}

	function deleteAddressEntry(addressEntry: AddressEntry) {
		const entry = $state.snapshot(addressEntry);
		addressBook.removeAddressEntry(entry);
	}

	function close() {
		modalOpen = false;
		newEntry = emptyEntry;
		isValidAddress = null;
		error = '';
	}
	function submit() {
		newEntry.addressType = detectAddressType(newEntry.address);
		const Entry = $state.snapshot(newEntry);
		try {
			addressBook.addAddressEntry(Entry);
		} catch (e: any) {
			error = e.message;
			return;
		}
		close();
	}

	$effect(() => {
		if (search) {
			const filteredAccounts = accountState.accountList.filter((account) =>
				account.name.toLowerCase().includes(search.toLowerCase())
			);

			const filteredAddresses = addressBook.addressBook.filter((addressEntry) =>
				addressEntry.name.toLowerCase().includes(search.toLowerCase())
			);
			searchedAccounts = filteredAccounts;
			searchedAddresses = filteredAddresses;
		} else {
			searchedAccounts = accountState.accountList;
			searchedAddresses = addressBook.addressBook;
		}
	});

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

{#if !isSmallScreen.current}
	<Header />
{/if}
<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	{#if isSmallScreen.current}
		<div class="label-top">

			Manage Accounts
			<a class="arrowBack" href="/#/settings">
				<ArrowBack class="icon2A"/>
			</a>
		</div>
		{/if}
	
	<div class="search">
		<input class="input-search" type="text" bind:value={search} placeholder="Search" />
	</div>
	{#each searchedAccounts as account}
		{#if !account.isHidden}
			<button class="addressList1" onclick={() => gotoAccountDetail(account)}>
				<div class="avatar">{@html generateAvatar(account.address)}

				</div>
				<div class="content">
					<span class="label-name">{account.name} </span>
					<span class="address">{shortenAddress6(account.address)} </span>
				</div>
			</button>
		{/if}
	{/each}

	{#each searchedAddresses as addressEntry}
		<div class="addressList2">
			<button class="label-left" onclick={() => gotoAddressEntry(addressEntry)}>
				<div class="avatar2">{getFirstAndLast(addressEntry.name)}
					{#if addressEntry.addressType === 'POLKADOT'}
						<img class="chain-logo" src="/token/DOT.svg" alt="" />
					{/if}
				</div>
				<div class="content">
					<span class="label-name">{addressEntry.name} </span>
					<span class="address"
						>{shortenAddress6(addressEntry.address)}
					</span>
				</div>
			</button>
			<button class="label-right" onclick={() => deleteAddressEntry(addressEntry)}
				><DeleteIcon class="icon2A" />
			</button>
		</div>
	{/each}

	<div class={{ 'bottom-d': !isSmallScreen.current, 'bottom-m': isSmallScreen.current }}>
		<button class="bottom-button" onclick={() => (modalOpen = true)}> Add new address </button>
	</div>
</div>

{#if modalOpen}

	<div
		class="backdrop"
		role="dialog"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
	>
		<div
			id="importAccount"
			in:fly={{ duration: 200, y: 50 }}
			out:fade={{ duration: 120 }}
			class={{ modal: !isSmallScreen.current, 'modal-m': isSmallScreen.current }}
		>
			<button class="close" onclick={close}>
				<CloseIcon class="icon2A" />
			</button>
			<div class="title">Add Address Entry</div>
			<div class="form">
				<label class="label" for="name">Name</label>
				<input
					id="name"
					class="input"
					type="text"
					placeholder="Please input name"
					maxlength="20"
					autocomplete="off"
					bind:value={newEntry.name}
				/>
				<label class="label" for="address">Address</label>
				<input
					id="address"
					class="input"
					type="text"
					placeholder="Please input address"
					autocomplete="off"
					bind:value={newEntry.address}
				/>
				<label class="label" for="memo">Memo</label>
				<textarea
					id="memo"
					maxlength="100"
					class="input-memo"
					placeholder="Please input memo"
					autocomplete="off"
					bind:value={newEntry.memo}
				></textarea>
			</div>

			<div class="form-label">
				{#if isValidAddress === false}
					<AlertTriangle class="icon16Y" /> <span class="alert">Invalid Address</span>
				{:else if error}
					<AlertTriangle class="icon16Y" /> <span class="alert">{error}</span>
				{/if}
			</div>

			{#if newEntry.address === '' || newEntry.name === '' || isValidAddress === false}
				<div class="container">
					<button class="cancel" onclick={close}>Cancel</button>
					<button class="action">Input</button>
				</div>
			{:else}
				<div class="container">
					<button class="cancel" onclick={close}>Cancel</button>
					<button class="action" onclick={submit}>Submit</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
			.chain-logo {
		position: absolute;
		box-sizing: border-box;
		width: 1.5rem;
		height: 1.5rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}
	.appBody-d {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.appBody {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 1rem 1rem 0rem 1rem;
	}
	.modal {
		gap: 1rem;
		box-sizing: border-box;
		flex-direction: column;
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
		gap: 1rem;
		position: fixed;
		top: calc(100vh - 50rem);
		box-sizing: border-box;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		padding: 2rem;
		background: var(--bg1);
		border-radius: 1.6rem;
		border: 1px solid var(--bg3);
	}
	.bottom-d {
		gap: 1rem;
		position: fixed;
		bottom: 2rem;
		width: 100%;
		height: 6rem;
		flex-direction: column;
		max-width: 48rem;
		background-color: var(--bg);
	}
	.alert {
		color: var(--accent-yellow);
		display: flex;
		align-items: center;
		margin: 1rem;
	}
	.bottom-m {
		box-sizing: border-box;
		gap: 1rem;
		padding: 0.8rem;
		position: fixed;
		bottom: 2rem;
		width: 100%;
		height: 6rem;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		max-width: 48rem;
		width: 95%;
		background-color: var(--bg);
	}
	.search {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
		margin-bottom: 0.8rem;
		width: 60%;
		border: none;
		margin-right: auto;
	}
	.input-search {
		width: 100%;
		padding: 1rem 2rem;
		border: 1px solid var(--bg3);
		border-radius: 2rem;
		background: var(--bg1);
		color: var(--text);
		font-size: 1.4rem;
		height: 100%;
		outline: none;
		transition: all 0.3s ease;
		&:focus {
			border-color: var(--hover2);
		}
	}
	.addressList1 {
		display: flex;
		padding: 0.5rem 1rem;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 4.8rem;
		flex-direction: row;
		background: none;
		border: none;
		background: var(--bg1);
		color: var(--text);
		border-radius: 1.6rem;
		margin-bottom: 0.8rem;
		cursor: pointer;
		&:hover {
			background: var(--storm2);
			color: var(--color);
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
	.label {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
		font-weight: 600;
		width: 80%;
		color: var(--color);
	}
	.label-name {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 0px;
		padding: 0px;
		font-size: 1.5rem;
		font-weight: 600;
		width: 100%;
		color: var(--color);
	}
	.address {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 0px;
		padding: 0px;
		font-size: 1.2rem;
		width: 100%;
		color: var(--text);
	}
	.avatar {
		position: relative;
		flex-shrink: 0;
		font-size: 1.2rem;
		font-weight: 600;
		width: 3rem;
		height: 3rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		background: #fff;
		padding: 0px;
		border: 1px solid var(--bg3);
	}
	.avatar2 {
		position: relative;
		flex-shrink: 0;
		font-size: 1.2rem;
		font-weight: 600;
		width: 3rem;
		height: 3rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		background-color: var(--primary);
		color: #fff;
		padding: 0px;
		border: 1px solid var(--bg3);
	}

	.addressList2 {
		display: grid;
		grid-template-columns: 1fr 5rem;
		padding: 0rem;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: none;
		border: none;
		margin-bottom: 0.8rem;
		border-radius: 1.6rem;
	}

	.bottom-button {
		color: #fff;
		font-size: 1.8rem;
		font-weight: 600;
		height: 4.8rem;
		border: none;
		border-radius: 1.6rem;
		background: var(--storm3);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}

	.label-left {
		display: flex;
		font-size: 1.8rem;
		font-weight: 600;
		padding: 1rem;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		background: var(--bg1);
		border: none;
		height: 4.8rem;
		border-top-left-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;
		color: var(--color);
		&:hover {
			background: var(--success);
		}
	}
	.label-right {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: var(--bg1);
		border: none;
		border-top-right-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		height: 4.8rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--success);
		}
	}

	.title {
		display: flex;
		font-size: 2rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 1rem;
	}
	.form {
		display: flex;
		align-items: center;
		flex-direction: column;
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
		background: var(--secondary);
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
		color: var(--text);
		height: 90%;
		width: 38.4rem;
		padding: 1.6rem;
		background: var(--bg1);
		border-radius: 2rem;
		border: 1px solid var(--bg3);
		overflow: hidden;
	}

	.input {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		width: 80%;
		border-radius: 1.6rem;
		background: var(--bg1);
		border: none;
	}

	.input-memo {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		height: 10rem;
		width: 80%;
		border-radius: 1.6rem;
		background: var(--bg1);
		border: none;
		resize: none;
	}

	.cancel {
		color: var(--text);
		font-size: 1.7rem;
		font-weight: 600;
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
		font-size: 1.7rem;
		font-weight: 600;
		border: none;
		border-radius: 1.6rem;
		background: var(--primary);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 80%;
		gap: 1rem;
	}
</style>
