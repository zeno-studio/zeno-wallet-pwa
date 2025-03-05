
<script lang="ts">


</script>

<div class="appContainer">
	<div class="appBody">
        <button popovertarget="mypopover">Toggle the popover</button>
        <div id="mypopover" popover="auto">Popover content</div>
 
	
</div>
</div>






<style lang="postcss">
    .appBody {
        max-width: 464px;
    }

[popover]:not(:popover-open) {
  /* But make sure not to show it unless it's open: */
  display: none;
}


</style>