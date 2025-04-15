<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { ArrowDown, CloseIcon, SearchIcon, ClockIcon, StarIcon, ScanIcon } from '$lib/svg';
	import { page } from '$app/state';
	import { addressBook } from '$lib/wallet/runes';
    import { Scanner } from '$lib/ui/components';
	
	import { Header } from '$lib/ui/components';

	let amount = $state(10000);
	let amount2 = $state(100);
	let modalClose = $state(false);
	let scanData = $state('');
	let scanOpen = $state(false);

	

	
</script>

<Header />
	<div class="appBody" class:active={isSmallScreen.current}>

		<div class="item-container2">
			<div class="item">
				<div class="item-l">
					<button class="button-label" class:active1={page.route.id == '/receive'}>
						<a href="/#/receive" class:active1={page.route.id == '/receive'} aria-label="Setting"
							>Receive</a
						>
					</button>
					<button class="button-label" class:active1={page.route.id == '/send'}>
						<a href="/#/send" class:active1={page.route.id == '/send'} aria-label="Setting">Send</a>
					</button>
					<button class="button-label" class:active1={page.route.id == '/swap'}>
						<a href="/#/swap" class:active1={page.route.id == '/swap'} aria-label="Setting">Swap</a>
					</button>
					<button class="button-label" class:active1={page.route.id == '/buy'}>
						<a href="/#/buy" class:active1={page.route.id == '/buy'} aria-label="Setting">Buy</a>
					</button>
				</div>
			</div>
		</div>

		<div class="item-container">
			<div class="item">
				<button class="button-open" onclick={() => (scanOpen = !scanOpen)}>
					<ScanIcon class="icon2A" />
				</button>
				<div class="amount">
					address:{scanData} 
				</div>

			

			</div>

			<div class="item">
				<span class="amount">
					{amount} eth
				</span>
			</div>
			<div class="item">
				<span class="amount2">
					$ {amount2}
				</span>
			</div>
			<div class="item">
				<div class="item-l">
					<img src="/token/eth.svg" alt="" class="token-icon" />
				</div>
				<div class="item-r">
					<button class="button-open" onclick={() => (modalClose = !modalClose)}>
						<ArrowDown class="icon2rem" />
					</button>
				</div>
			</div>
		</div>
	</div>


{#if scanOpen}
	<Scanner bind:scanOpen bind:scanData />
{/if}


{#if modalClose}
	{#if !isSmallScreen.current}
		<div class="modal-backdrop">
			<div class="modal">
				<div class="modal-header">
					<div class="modal-title">Select Token</div>
					<div class="search">
						<input type="text" placeholder="Search" />
					</div>
					<button class="button-open" onclick={() => (modalClose = !modalClose)}>
						<CloseIcon class="icon2rem" />
					</button>
				</div>
				<div class="search">
					<div class="item-l">
						<SearchIcon class="icon2rem" />
						<input placeholder="Search" />
					</div>
				</div>

				<div class="token-list">
					<div class="item-l">
						<ClockIcon class="icon2rem" />
						常用
					</div>
				</div>

				<div class="item-l">
					<button class="button-open"><img src="/token/eth.svg" alt="" class="token-icon" /></button
					>
					<button class="button-open"><img src="/token/dot.svg" alt="" class="token-icon" /></button
					>
				</div>

				<div class="token-list">
					<div class="item-l">
						<StarIcon class="icon2rem" />
						List
					</div>
				</div>

				<button class="token-lable">
					<div class="item-l">
						<img src="/token/dot.svg" alt="" class="token-icon" />
					</div>
					<div class="token-detail">
						<span>Polkadot</span>
						<span>DOT</span>
					</div>
				</button>
				<button class="token-lable">
					<div class="item-l">
						<img src="/token/eth.svg" alt="" class="token-icon" />
					</div>
					<div class="token-detail">
						<span>Ethereum</span>
						<span>ETH</span>
					</div>
				</button>
			</div>
		</div>
	{/if}
	{#if isSmallScreen.current}
		<div class="modal-mobile">
			<div class="modal-header">
				<div class="modal-title">Select Token</div>
				<button class="button-open" onclick={() => (modalClose = !modalClose)}>
					<CloseIcon class="icon2rem" />
				</button>
			</div>
			<div class="search">
				<div class="item-l">
					<SearchIcon class="icon2rem" />
					<input placeholder="Search" />
				</div>
			</div>

			<div class="token-list">
				<div class="item-l">
					<ClockIcon class="icon2rem" />
					常用
				</div>
			</div>

			<div class="item-l">
				<button class="button-open"><img src="/token/eth.svg" alt="" class="token-icon" /></button>
				<button class="button-open"><img src="/token/dot.svg" alt="" class="token-icon" /></button>
			</div>
			<div class="token-list">
				<div class="item-l">
					<StarIcon class="icon2rem" />
					List
				</div>
			</div>

			<button class="token-lable">
				<div class="item-l">
					<img src="/token/dot.svg" alt="" class="token-icon" />
				</div>
				<div class="token-detail">
					<span>Polkadot</span>
					<span>DOT</span>
				</div>
			</button>
			<button class="token-lable">
				<div class="item-l">
					<img src="/token/eth.svg" alt="" class="token-icon" />
				</div>
				<div class="token-detail">
					<span>Ethereum</span>
					<span>ETH</span>
				</div>
			</button>
			<button class="finish"> Finished </button>
		</div>
	{/if}
{/if}



<style>
	
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 10.4rem 1rem 0rem 1rem;
	}
	.active {
		padding: 8.4rem 1rem 0rem 1rem;

	}
	.item-container {
	box-sizing: border-box;
	width: 100%;
	flex-direction: column;
	background: var(--bg1);
	border-radius: 1.6rem;
	padding: 1rem;
	margin-bottom: 1rem;
}

.item-container2 {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	flex-direction: column;
	padding: 0px;
	margin-bottom: 1rem;
}


.item {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	font-size: 1.5rem;
	font-weight: 500;
	padding: 0px;
	background: none;
	border: none;
	color: var(--color)
}

.item-l {
	display: flex;
}

.item-r {
	position: absolute;
	right: 0px;
	fill: none;
	border: none;
	background: none;
}
	.button-label {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 7rem;
	height: 3.5rem;
	margin-right: 0.4rem;
	border-radius: 1.6rem;
	border: none;
	background: none;
	cursor: pointer;
}

	a {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.active1 {
		background: var(--bg2);
		color: var(--color);
	}

	.amount {
		margin-top: 60px;
		font-size: 3rem;
		font-weight: 600;
	}
	.amount2 {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 40px;
	}
	.token-icon {
		width: 32px;
		height: 32px;
		border-radius: 16px;
		margin-left: 8px;
	}
	.button-open {
		background: none;
		border: none;
		margin: 0px;
		padding: 0px;
	}

	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.modal {
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		height: 600px;
		width: 92%;
		max-width: 398px;
		padding: 16px;
		background: var(--bg1);
		border-radius: 16px;
		border: 1px solid var(--bg3);
	}
	.modal-mobile {
		position: fixed;
		top: 64px;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 20px;
		background: var(--bg1);
		border-radius: 16px;
		border: 1px solid var(--bg3);
		z-index: 1001;
	}

	.modal-header {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		width: 100%;
		margin: 0px;
		padding: 0px;
		background: none;
		border: none;
		color: var(--color);
	}

	.modal-title {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-right: auto;
		font-size: 1.75rem;
		font-weight: 600;
	}

	.search {
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		height: 40px;
		width: 96%;
		font-size: 1.6rem;
		font-weight: 700;
		margin: 16px 8px;
		padding-left: 1rem;
		border-radius: 20px;
		background: var(--bg2);
		border: none;
		color: var(--color);
	}
	.token-list {
		width: 100%;
		padding: 8px;
	}
	.token-lable {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		font-size: 1.5rem;
		font-weight: 500;
		margin: 0px;
		padding: 4px;
		background: none;
		border: none;
		color: var(--color);
	}
	.token-lable:hover {
		background: var(--bg2);
		border-radius: 16px;
	}
	.token-detail {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding-left: 1rem;
	}

	.finish {
		height: 40px;
		width: 100%;
		border-radius: 20px;
		margin: 0px;
		padding: 0px;
		background: var(--blue4);
		border: none;
		cursor: pointer;
		color: #fff;
		font-size: 1.5rem;
		font-weight: 600;
	}

</style>
