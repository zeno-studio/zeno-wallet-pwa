<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
    import { EditFilled, ArrowForward,CloseIcon } from '$lib/svg';
    import { accountState } from '$lib/wallet/runes';


    let i = $state<number | null>(null);
    let {index} = $props();
    let checked = $state(false);


	function open(index: number) {
        i = index;
		const popover = document.getElementById('edit');
		if (popover) {
			popover.showPopover();
		}

	}

		function close() {
		const popover = document.getElementById('edit');
		if (popover) {
			popover.hidePopover();
		}
	}

    function toggleHideAccount() {
        const node = document.getElementById('hideAccount');
        if (node && node instanceof HTMLInputElement) {
            checked = node.checked;
            accountState.hiddenAccounts(index);
        }
    }


</script>

<button class="empty" onclick={() => open(index)}>
	<EditFilled class="icon18A" />
</button>

<div id="edit" popover="manual" class={{ editMobile: isSmallScreen.current }}>
	<button class="close" onclick={close}>
		<CloseIcon class="icon18A" />
	</button>
    <div class="container">
        <div class="avatar">
            1
            <div class="edit">
                <EditFilled class="icon2A" />
            </div>
        </div>
    </div>
    <!--Active Chain -->
    <a class="setting-top" href="/#/setting/active_chains">
        <div class="item">
            <div class="item-l">
                <span class="title">Active Chains</span>
            </div>

            <div class="item-r"><ArrowForward class="icon18A" /></div>
        </div>
    </a>
    <!--Address Book -->
    <a class="setting-medium" href="/#/setting/address_book">
        <div class="item">
            <div class="item-l">
                <span class="title">Address Book</span>
            </div>

            <div class="item-r"><ArrowForward class="icon18A" /></div>
        </div>
    </a>
    <!--Active App -->
    <a class="setting-bottom" href="/#/setting/active_apps">
        <div class="item">
            <div class="item-l">
                <span class="title">Active Apps</span>
            </div>

            <div class="item-r"><ArrowForward class="icon18A" /></div>
        </div>
    </a>
    <div class="setting1">
        <div class="item">
            <div class="item-l">
                <span class="title">Hidden Account</span>
            </div>

            <div class="item-r">
                <div class="toggle-switch">
                    <input class="toggle-input" id="hideAccount" type="checkbox" onchange={toggleHideAccount} />
                    <label class="toggle-label" for="hideAccount"></label>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="item">
           {accountState.accountList[index].accountName}
        </div>
    </div>

</div>

<style lang="postcss">


	.empty {
		background: none;
		border: none;
	}
	:popover-open {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		color: var(--color-text);
		height: 70%;
		width: 38.4rem;
		padding: 1.6rem;
		background: var(--color-bg);
		border-radius: 2rem;
		border: 1px solid var(--color-border);
		overflow: hidden;
	}
	.editMobile {
		position: fixed;
		top: calc(100vh - 400px);
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 1.6rem;
		margin: 0px;
		background: var(--color-bg);
		border-radius: 1.6rem;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}
 .container {
		margin: 2rem;
		display: flex;
		width: 100%;
	}
	
	.item-l {
		margin-left: 1rem;
	}
	.avatar {
		position: relative;
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		background: var(--color-bg2);
		border: 1px solid var(--color-border);
	}


	.edit {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: var(--color-bg2);
		border: 1px solid var(--color-border);
	}
	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 40px;
		height: 24px;
		margin: 10px;
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
