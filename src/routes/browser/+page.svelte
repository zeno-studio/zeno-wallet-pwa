<script lang="ts">
	import { Toaster, Header } from '$lib/ui/components';
	import { onMount } from 'svelte';
	import { InjectedProvider } from '$lib/wallet/provider';
	// DApp列表
	let dapps = [
    { name: 'Uniswap', url: 'https://app.uniswap.org', chain: 'ethereum' },
    { name: 'OpenSea', url: 'https://opensea.io', chain: 'ethereum' },
    { name: 'Acala', url: 'https://app.acala.network', chain: 'polkadot' },
    { name: 'Polkadot.js', url: 'https://polkadot.js.org', chain: 'polkadot' },
  ];

  let selectedDapp = null;
  let iframe = null;
  let provider;

  onMount(() => {
    provider = new Web3Provider();
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  async function handleMessage(event) {
    if (event.origin !== 'https://wallet.com') return;

    const { type, payload, id } = event.data;

    try {
      let result;
      if (type === 'ETH_REQUEST') {
        result = await provider.request(payload);
      } else if (type === 'POLKADOT_REQUEST') {
        if (payload.method === 'enable') {
          result = await provider.enablePolkadot(payload.params[0]);
        } else {
          throw new Error('Unsupported Polkadot method');
        }
      } else {
        return;
      }

      event.source.postMessage(
        {
          type: type.replace('REQUEST', 'RESPONSE'),
          id,
          result,
        },
        event.origin
      );
    } catch (error) {
      event.source.postMessage(
        {
          type: type.replace('REQUEST', 'RESPONSE'),
          id,
          error: error.message,
        },
        event.origin
      );
    }
  }

  function selectDapp(dapp) {
    selectedDapp = dapp;
  }

  function switchChain() {
    if (!provider || !iframe || !selectedDapp) return;
    if (selectedDapp.chain === 'ethereum') {
      provider.ethChainId = '0x5'; // Goerli
      provider.emit(iframe, 'ethereum', 'chainChanged', '0x5');
    } else {
      provider.polkadotChain = 'kusama';
      provider.emit(iframe, 'polkadot', 'chainChanged', 'kusama');
    }
  }
</script>

<Header />
<Toaster />

<div class="appBody">
	<h1>DApp Browser</h1>
	{#if !selectedDapp}
	  <div class="dapp-list">
		<h2>Select a DApp</h2>
		{#each dapps as dapp}
		  <button on:click={() => selectDapp(dapp)}>{dapp.name}</button>
		{/each}
	  </div>
	{:else}
	  <div class="dapp-view">
		<button on:click={() => (selectedDapp = null)}>Back to DApp List</button>
		<button on:click={switchChain}>
		  Switch to {selectedDapp.chain === 'ethereum' ? 'Goerli' : 'Kusama'}
		</button>
		<iframe
		  bind:this={iframe}
		  src="/wrapper.html?dapp={encodeURIComponent(selectedDapp.url)}&chain={selectedDapp.chain}"
		  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
		  title={selectedDapp.name}
		></iframe>
	  </div>
	{/if}
</div>

<style lang="postcss">
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}

	.dapp-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
	.dapp-view {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	iframe {
		width: 100%;
		height: 600px;
		border: none;
	}
	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
</style>
