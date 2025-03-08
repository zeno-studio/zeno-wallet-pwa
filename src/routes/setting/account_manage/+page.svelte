<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { accountState } from '$lib/wallet/runes';
    import { createEvmAccount } from '$lib/wallet/common';
	import { WalletIcon, ArrowForward, EditFilled ,CloseIcon,EyeIcon,EyeOffIcon} from '$lib/svg';
	import EyeOff from '$lib/svg/eye-off.svelte';

    let createSuccess = $state(false);
    let addSuccess = $state(false);
    let importSuccess = $state(false);
    let passwordValid = $state(false);

    function handleCreateEvmAccount(password: string) {
        const data = localStorage.getItem('settings');
        if (data) {
            const settings = JSON.parse(data);
            createEvmAccount(0, 0, password);
            settings.nextEvmAddressIndex++;
            settings.currentAccountIndex++;
            settings.currentAccount = 1;
            localStorage.setItem('settings', JSON.stringify(settings));
        } 
        createSuccess = true;
    }
</script>

<div class="appContainer">
	<div class="appBody">
		<!-- currentAccount -->
		<a class="setting1" href="/#/setting/account_detail">
			<div class="item">
				<div class="item-l">
					<div class="avatar">1</div>
					<span class="title">Account 1 </span>
				</div>

				<div class="item-r"><EditFilled class="icon2rem" /></div>
			</div>
		</a>

        <div class="line"></div>

		{#if accountState.currentAccountIndex === 0}
			<button class="bottom-button" popovertarget="create" popovertargetaction="show"> Create account </button>
			<button class="bottom-button2"> Import account </button>
		{/if}
        {#if accountState.currentAccountIndex !== 0}
        <button class="bottom-button"> Add new account </button>
    {/if}

        <EyeIcon />

		
	</div>
</div>

<div id="create" popover="manual" class:active={isSmallScreen.current}>

        <span class="title">Create New Account</span>
        <input class="input" type="text" placeholder="Please input your password">
        <input class="input" type="text" placeholder="Input your password again">

	<button class="finish" popovertarget="create" popovertargetaction="hide">
        Finish 
    </button>
  
</div>



<style lang="postcss">
    .line {
        margin: 1rem;
        width: 90%;
        height: 1px;
        background-color: var(--color-bg3);
    }
	.avatar {
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		margin-left: 1rem;
		border-radius: 20px;
		background-color: var(--color-pink);
		color: #fff;
	}

	.bottom-button {
        flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		margin-top: 1rem;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-blue);
		box-sizing: border-box;
		width: 100%;
		justify-content: center;
		padding: 1rem;
		cursor: pointer;
	}

    .bottom-button2 {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		margin-top: 1rem;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-purple);
		box-sizing: border-box;
		width: 100%;
		justify-content: center;
		padding: 1rem;
		cursor: pointer;
	}

    :popover-open {
	box-sizing: border-box;
	flex-direction: column;
	justify-content: flex-start;
	position: fixed;
    color: var(--color-text);
	height: 80%;
	width: 384px;
	padding: 16px;
	background: var(--color-bg1);
	border-radius: 16px;
	border: 1px solid var(--color-border);
}
    .active {
		position: fixed;
		top: 20px;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		width: 100vw;
		padding: 20px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}
    .input{
        font-size: 1.5rem;
        color: var(--color) !important;
        width: 80%;
        height: 32px;
        border-radius: 16px;
        background: var(--color-bg3);
        border: none;
        padding: 1rem;
        color: var(--color-text);
        margin-top: 2rem;
    }

</style>
