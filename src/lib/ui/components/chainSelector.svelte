<script lang="ts">
	import { chainState } from '$lib/wallet/runes';
	import { EditIcon } from '$lib/svg';
	import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
	const { closeModal, updatePageTitle, currentPage } =getContext<ModalContext>('modal');
	updatePageTitle(1, 'Select a network');

	let edit_http = $state(false);
	let edit_wss = $state(false);
	let rpc = $state('');

	const editChain=(i: number) =>{
		chainState.setCurrentChain(i);
		updatePageTitle(2, chainState.currentChain!.name);
	}

</script>

<div class="list-container">
	{#if currentPage()=== 1}
	<div class="chainList">
				<div
					class="entry"
					class:selected={!chainState.currentChain}
					onclick={() => chainState.setCurrentChain(0)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							{
								() => chainState.setCurrentChain(0);
							}
						}
					}}
					role="button"
					tabindex="0"
				>
					<div class="avatar">
						<img class="chain-logo" src={'/chain/0.svg'} alt="" />
					</div>
					<div class="content">
						<div
							class="label-m"
							class:selected2={!chainState.currentChain}
							style="font-weight: 600;"
						>
							All chains
						</div>
						
					</div>
			
				</div>
			</div>
		{#each chainState.Chains as chain}
			<div class="chainList">
				<div
					class="entry"
					class:selected={chain.chainId === chainState.currentChain?.chainId}
					onclick={() => chainState.setCurrentChain(chain.chainId)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							{
								() => chainState.setCurrentChain(chain.chainId);
							}
						}
					}}
					role="button"
					tabindex="0"
				>
					<div class="avatar">
						<img class="chain-logo" src={`/chain/${chain.chainId}.svg`} alt="" />
					</div>
					<div class="content">
						<div
							class="label-m"
							class:selected2={chain.chainId === chainState.currentChain?.chainId}
							style="font-weight: 600;"
						>
							{chain.name}
						</div>
						
					</div>
					<button
						class="entry-right"
						onclick={(e) => {
							e.stopPropagation();
							editChain(chain.chainId);
						}}
						aria-label="edit chain"
						tabindex="0"
						><EditIcon class="icon2A" />
					</button>
				</div>
			</div>
		{/each}
	{/if}

	{#if currentPage()=== 2}
		
		<button
			onclick={() => {
				edit_http = !edit_http;
			}}>Set Custom HTTP RPC</button
		>
		{#if edit_http}
			<input class="input-password" type="text" bind:value={rpc} />
			<button
				onclick={() => {
					chainState.updateRpcUrl(rpc, 'http');
				}}>save</button
			>
		{/if}
		<button
			onclick={() => {
				edit_wss = !edit_wss;
			}}>Set Custom WSS RPC</button
		>
		{#if edit_wss}
			<input class="input-password" type="text" bind:value={rpc} />
			<button
				onclick={() => {
					chainState.updateRpcUrl(rpc, 'http');
				}}>save</button
			>
		{/if}
			<button onclick={closeModal} >return</button> 
		{/if}
</div>

<style lang="postcss">
	.chain-logo {
		box-sizing: border-box;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		margin: 0;
	}
	.entry {
		padding: 0.4rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		height: 6.8rem;
		flex-direction: row;
		background: var(--bg1);
		border: none;
		border-radius: 1.6rem;
		cursor: pointer;
		outline: none;

		&:active {
			transform: translateY(1px);
		}
	}
	.entry-right {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 1rem;
		width: 3.5rem;
		height: 3.5rem;
		border: none;
		background: none;
		cursor: pointer;
		margin-right: 1rem;
		border-radius: 50%;
		background: var(--bg);
	}

	.list-container {
		margin-bottom: 6.4rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		gap: 0.8rem;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}

	.avatar {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
		margin-right: 2rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}

	.chainList {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
		width: 100%;
		background: none;
		border: none;
		overflow-y: scroll;
		scrollbar-width: none;
	}
	.selected {
		background: var(--bg3);
		border: 2px solid var(--accent-blue);
	}
	.selected2 {
		color: var(--color);
	}
</style>
