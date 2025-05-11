<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { Header, Modal,ChangePassword,ResetWallet } from '$lib/ui/components';
	import { ArrowForward, ArrowBack } from '$lib/svg';
	import { accountState, checkIsLocked, type signerResponseType } from '$lib/wallet/runes';
	
	let needpass = $state<'' | 'neednot' | 'need'>('');
	let restoreModal = $state(false);
	let changePsModal = $state(false);
	let autolockModal = $state(false);
	let resetWalletModal = $state(false);

	const checkRestoreModal = async () => {
		const result = (await checkIsLocked()) as signerResponseType | null;
		if (result?.data === false) {
			needpass = 'neednot';
			restoreModal = true;
		}

		if (result?.data === true) {
			needpass = 'need';
			restoreModal = true;
		}
	};
 

</script>



{#if !isSmallScreen.current}
<Header />
{/if}
<div class={{ "appBody": isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
		<div class="label-top">
			<a class="top-back" href="/#/settings">
				<ArrowBack class="icon2A" />
			</a>Security & Privacy
		</div>
		<div class="setting-dividing2"></div>    <div class="label1"></div>

		<!-- Privacy policy -->
		<button class="setting1" onclick={()=>changePsModal=true} >
			<div class="item">
				<div class="entry">Change Password</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</button>

		<a class="setting1" href="/#/settings/security/export_keystore">
			<div class="item">
				<div class="entry">Export Keystore</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
		<!-- Import Keystore -->
		<a class="setting1" href="/#/settings/security/import_keystore">
			<div class="item">
				<div class="entry">Import Keystore</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</a>
        <!-- Restore mn -->
        <button class="setting1" onclick={()=>restoreModal=true} >
			<div class="item">
				<div class="entry">Restore Recovery Phrase</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</button>
 		<!-- Document -->
		<button class="setting1" onclick={()=>autolockModal=true} >
			<div class="item">
				<div class="entry">Auto-lock timer</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</button>
        <!-- Document -->
		<button class="setting1" onclick={()=>resetWalletModal=true} >
			<div class="item">
				<div class="entry">Reset Wallet</div>
				<div class="item-r"><ArrowForward class="icon2A" /></div>
			</div>
		</button>


	</div>

	<Modal bind:modalName={changePsModal} mode="full" >
		<ChangePassword />
	</Modal>

	<Modal bind:modalName={resetWalletModal} mode="half" >
		<ResetWallet />
	</Modal>

<style>
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
	.label1{
		height: 3rem;
	}
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

</style>

