<script lang="ts">
	import { PinIcon, SearchIcon, StarIcon } from '$lib/svg';
	import { accountState, generalState } from '$lib/wallet/runes';
	import { ethereumTonkens} from '$lib/wallet/common';

</script>

<div class="container">
	<div class="search">
		<div class="item-l">
			<SearchIcon class="icon2rem" />
			<input placeholder="Search" />
		</div>
	</div>

	<div class="token-set">
		<div class="item-l">
			<PinIcon class="icon2rem" />
			Pinned
		</div>
	</div>

	<div class="item-l">
		<button class="pinned-token"><img src="/token/ETH.svg" alt="" class="token-icon" /></button>
		<button class="pinned-token"><img src="/token/DOT.svg" alt="" class="token-icon" /></button>
	</div>
	<div class="token-set">
		<div class="item-l">
			<StarIcon class="icon2rem" />
			Token List
		</div>
	</div>

	<div class="token-list">
		<div class="token-lable">
			<button class="button-select">
				<div class="item-l">
					<img src="/token/DOT.svg" alt="" class="token-icon2" />
				</div>
				<div class="token-detail">
					<span>Polkadot</span>
					<span>DOT</span>
				</div>
			</button>
			<button class="button-pin">
				<PinIcon class="icon16px" />
			</button>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		width: 100%;
		max-width: 40rem;
		margin-top: 6.4rem;
		padding: 0;
		background: none;
	}
	.search {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		height: 4rem;
		width: 96%;
		font-size: 1.6rem;
		font-weight: 700;
		margin: 0px;
		padding-left: 1rem;
		border-radius: 2rem;
		background: var(--bg1);
		border: none;
		color: var(--color);
	}
	.token-set {
		width: 100%;
		padding: 0.8rem;
	}
	.token-list {
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding: 0px;
		margin-bottom: 1rem;
	}
	.token-lable {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		font-size: 1.5rem;
		font-weight: 500;
		margin: 0px;
		padding: 0.4rem;
		background: none;
		border: none;
		color: var(--color);
	}
	.token-lable:hover {
		background: var(--bg1);
		border-radius: 1.6rem;
	}
	.token-detail {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding-left: 1rem;
		cursor: pointer;
	}
	.pinned-token {
		background: none;
		border: none;
		margin: 0px;
		padding: 0px;
		cursor: pointer;
	}

	.token-icon {
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 1.6rem;
		margin-left: 0.8rem;
		&:hover {
			box-shadow: 1px 4px 6px var(--bg3);
			transform: scale(1.1);
		}
	}
	.token-icon2 {
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 1.6rem;
		margin-left: 0.8rem;
	}

	.button-select {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-right: auto;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
	}
	.button-pin {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-end;
		margin-left: auto;
		background: none;
		border: none;
		cursor: pointer;
	}
</style>
