
<script lang="ts">
import { Toaster,Header,Footer } from '$lib/ui/components';


</script>


<Header />
<Toaster />

	<div class="appBody">
        <button popovertarget="mypopover">Toggle the popover</button>
        <div id="mypopover" popover="auto">Popover content</div>

 
	
</div>







<style lang="postcss">
			.appBody {
	flex-direction: column;
	height: 100%;
	width: 95%;
	max-width: 48rem;
	padding: 6.4rem 1rem 0rem 1rem;
}

[popover]:not(:popover-open) {
  /* But make sure not to show it unless it's open: */
  display: none;
}


</style>