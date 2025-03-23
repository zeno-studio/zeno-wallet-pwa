<script lang="ts">
	import { CreateAccount, AddAccount, ImportAccount,AccountList } from '$lib/ui/components';
	import { accountState } from '$lib/wallet/runes';
	import { isSmallScreen } from '$lib/ui/ts';
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->

		{#if accountState.currentAccountIndex === 0}
			<div class="item-container3">
				<h5>Please Create or Import a Account</h5>
			</div>
		{:else}
			<AccountList />
		{/if}

		{#if isSmallScreen.current}
			{#if accountState.currentAccountIndex === 0}
				<div class="bottomB-s">
					<CreateAccount />
				</div>
			{:else if accountState.currentAccountIndex > 0 && accountState.nextAccountIndex < 21}
				<div class="bottomA-s"><AddAccount /></div>
			{/if}
		{/if}

		{#if !isSmallScreen.current}
			{#if accountState.currentAccountIndex === 0}
				<div class="bottomB">
					<CreateAccount />
					<ImportAccount />
				</div>
			{:else if accountState.currentAccountIndex > 0 && accountState.nextAccountIndex < 21}
				<div class="bottomA"><AddAccount /></div>
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">

	.bottomA {
		gap: 1rem;
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 80px;
		flex-direction: column;
		max-width: 480px;
		background-color: var(--color-bg);
		padding-bottom: 16px;
	}

	.bottomA-s {
		box-sizing: border-box;
		gap: 1rem;
		padding: 8px;
		position: fixed;
		bottom:64px;
		width: 100%;
		height: 60px;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		max-width: 480px;
		width: 96%;
		background-color: var(--color-bg);
	}

	.bottomB {
		gap: 1rem;
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 130px;
		flex-direction: column;
		max-width: 480px;
		background-color: var(--color-bg);
		padding-bottom: 16px;
	}

	.bottomB-s {
		box-sizing: border-box;
		gap: 1rem;
		padding: 8px;
		position: fixed;
		bottom:64px;
		width: 100%;
		height:120px;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		max-width: 480px;
		width: 96%;
		background-color: var(--color-bg);
	}


</style>
