<script lang="ts">
	import { AlertBox } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	import { goto } from '$app/navigation';
	import { type ModalContext } from '$lib/ui/ts';
	import { getContext } from 'svelte';
	const { closeModal, updatePageTitle } = getContext<ModalContext>('modal');

	updatePageTitle(1, 'Remove Account');

	const deleteAccount = () => {
		accountState.deleteAccount();
		closeModal();
		goto('/#/settings/account_manage');
	};
</script>

<div class="tip">
	<div class="tip-icon">
		<div class="tip-icon-container" style="background-color: var(--accent-orange-back);">
			<AlertBox class="icon16O" />
		</div>
	</div>
	<div class="tip-text">
		If you want to recover this account later, you should save the account index.
	</div>
</div>

<div class="index-warp">
	Account Index: <span class="index">{accountState.editingAccountIndex}</span>
</div>
<div class="container">
	<button class="cancel" onclick={closeModal}>Cancel</button>
	<button class="action" onclick={deleteAccount}>Delete</button>
</div>

<style lang="postcss">
	.index-warp {
		display: flex;
		font-size: 1.6rem;
		margin: 2rem;
	}

	.index {
		font-size: 2.4rem;
		font-weight: 700;
		margin-left: 1rem;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 80%;
		gap: 1rem;
	}
	.cancel {
		color: var(--text);
		font-size: 1.6rem;
		font-weight: 500;
		border: 1px solid var(--border);
		border-radius: 1.6rem;
		background: var(--bg2);
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
	.tip {
		display: grid;
		grid-template-columns: 5rem 1fr;
		color: var(--text);
		width: 80%;
		padding: 1rem;
		border-radius: 1.6rem;
		background: var(--accent-blue-back);
	}

	.tip-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tip-icon-container {
		height: 3rem;
		width: 3rem;
		border-radius: 1.6rem;
	}
	.tip-text {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.4rem;
		font-weight: 500;
		margin-left: 0.5rem;
	}
</style>
