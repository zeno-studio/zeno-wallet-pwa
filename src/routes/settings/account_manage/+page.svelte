<script lang="ts">
	import { CreateAccount, AddAccount, ImportAccount,AccountList } from '$lib/ui/components';
	import { accountState } from '$lib/wallet/runes';
	import { isSmallScreen } from '$lib/ui/ts';
	import { Header } from '$lib/ui/components';
	import { metadata } from '$lib/ui/runes';
	import { ArrowBack } from '$lib/svg';

	metadata.title = 'Settings';
	metadata.description = 'Settings';
</script>
{#if !isSmallScreen.current}
<Header />
{/if}

	<div class={{"appBody": isSmallScreen.current, "appBody-d": !isSmallScreen.current}}>
		<!-- currentAccount -->
		{#if isSmallScreen.current}
		<div class="label-top">

			Manage Accounts
			<a class="arrowBack" href="/#/settings">
				<ArrowBack class="icon2A"/>
			</a>
		</div>
		{/if}

		{#if accountState.accountList.length === 0}
			<div class="none-account">
				<h5>Please Create or Import an Account</h5>
			</div>
		{:else}
			<div class="Account-container">
				<AccountList />
			</div>

		{/if}

		{#if isSmallScreen.current}
			{#if accountState.accountList.length === 0}
				<div class="bottomB-s">
					<CreateAccount />
					<ImportAccount />
				</div>
			{:else if accountState.accountList.length >0}
				<div class="bottomA-s"><AddAccount /></div>
			{/if}
		{/if}

		{#if !isSmallScreen.current}
			{#if accountState.accountList.length === 0}
				<div class="bottomB">
					<CreateAccount />
					<ImportAccount />
				</div>
			{:else if accountState.accountList.length >0}
				<div class="bottomA"><AddAccount /></div>
			{/if}
		{/if}
	</div>



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
	.none-account {
		box-sizing: border-box;
		width: 100%;
		flex-direction: column;
		background: none;
		border-radius: 1.6rem;
		padding: 1rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border: 1px solid var(--hover2)
	}
	
	.Account-container{
		width: 100%;
		height: 100%;
		margin-bottom: 9rem;
	}

	.bottomA {
		gap: 1rem;
		position: fixed;
		bottom: 2rem;
		width: 100%;
		height: 6rem;
		flex-direction: column;
		max-width: 48rem;
		background-color: var(--bg);
		box-sizing: border-box;
	}

	.bottomA-s {
		box-sizing: border-box;
		gap: 1rem;
		position: fixed;
		bottom:2rem;
		width: 100%;
		height: 6rem;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		max-width: 48rem;
		width: 95%;
		background-color: var(--bg);
	}

	.bottomB {
		gap: 1rem;
		position: fixed;
		bottom: 2rem;
		width: 100%;
		height: 12rem;
		flex-direction: column;
		max-width: 48rem;
		background-color: var(--bg);
	}

	.bottomB-s {
		box-sizing: border-box;
		gap: 1rem;
		position: fixed;
		bottom:2rem;
		width: 100%;
		height:12rem;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		max-width: 48rem;
		width: 95%;
		background-color: var(--bg);
	}

</style>
