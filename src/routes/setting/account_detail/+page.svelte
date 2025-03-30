<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { EditFilled, ArrowForward,ArrowBack } from '$lib/svg';
	import { accountState } from '$lib/wallet/runes';
	function deleteAccount() {
		accountState.deleteAccount();
	}

	function toggleHideAccount() {
       accountState.hiddenAccounts();
    }
</script>
<div class="appContainer">
	<div class="appBody" class:active={isSmallScreen.current}>
		<div class="item-container2" >
			<div class="item">
				<div class="item-l">
					<a class="title" href="/#/setting/account_manage">
						<ArrowBack class="icon2A" />
					</a>
				</div>
			</div>
		</div>
		<div class="item-container2">
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
						<input class="toggle-input" id="hideAccount" type="checkbox"  onchange={toggleHideAccount} />
						<label class="toggle-label" for="hideAccount"></label>
					</div>
				</div>
			</div>
		</div>

		<button class="delete"  onclick={deleteAccount}>Delete Account</button>


	</div>
</div>

<style lang="postcss">
	.delete {
		
		font-size: 1.5rem;
		font-weight: 600;
		width: 100%;
		color: var(--color-pink);
		background: var(--color-bg1);
		border: none;
		padding: 1.2rem;
		cursor: pointer;
		margin-bottom: 0.8rem;
		border-radius: 1.6rem;
		&:hover {
			background: var(--color-bg2);
		}
	}

    .item-container2{
        margin-bottom: 3rem;
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
	.appBody {
		padding-top: 64px;
	}
	.active {
		padding-top: 20px;
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
