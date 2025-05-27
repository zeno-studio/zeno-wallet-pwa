<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import {
		Header,
		Modal,
	} from '$lib/ui/components';
	import { ArrowForward, ArrowBack } from '$lib/svg';

	let restoreModal = $state(false);
	let backupModal = $state(false);
</script>

{#if !isSmallScreen.current}
	<Header />
{/if}
<div class={{ appBody: isSmallScreen.current, 'appBody-d': !isSmallScreen.current }}>
	<div class="label-top">
		<a class="top-back" href="/#/settings">
			<ArrowBack class="icon2A" />
		</a>Backup & Restore Wallet
	</div>
<button class="setting1" onclick={() => (backupModal = true)}>
		<div class="item">
			<div class="entry">Backup</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</button>
  <button class="setting1" onclick={() => (restoreModal = true)}>
		<div class="item">
			<div class="entry">Restore</div>
			<div class="item-r"><ArrowForward class="icon2A" /></div>
		</div>
	</button>

</div>



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
	.entry {
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
