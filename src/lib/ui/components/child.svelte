<script lang="ts">
    import { getContext } from 'svelte';
	import { type ModalContext } from '$lib/ui/ts';
  
    const { isModalOpen, closeModal, updatePageTitle,currentPage } = getContext<ModalContext>('modal');
  
        updatePageTitle(1,"test")
  
    $effect(() => {
      if (!isModalOpen()) {

      }
    });
  

  </script>
  
  {#if currentPage()===1}
  <div>first page</div>
  <button onclick={()=>updatePageTitle(2,"second page")}> procese</button>
    
  {/if}

  {#if currentPage()===2}
  <div> page2</div>
  {/if}


  
  <style lang="postcss">
    
  </style>