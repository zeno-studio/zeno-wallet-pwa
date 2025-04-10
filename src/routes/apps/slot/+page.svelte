<script lang="ts">
import Slot from '$lib/ui/apps/slot.svelte'
import { Toaster,Header,Footer } from '$lib/ui/components';
</script>

<Header />
<Toaster />
	<div class="appBody">
		<div class="dropdown">
			<Slot />
			<a href="/#/apps/bridge" style="text-decoration: none !important;">bridge </a>
		</div>
		<div class="dropdown-content">
			<select name="dfd" >
				<option value="">1</option>
				<option value="">2</option>
				<option value="">3</option>

			</select>
		</div>
		
	</div>


<style lang="postcss">
			.appBody {
	flex-direction: column;
	height: 100%;
	width: 95%;
	max-width: 48rem;
	padding: 6.4rem 1rem 0rem 1rem;
}
.dropdown {
  position: relative;
  display: inline-block;
}
	
.dropdown-content {
  display: none;
  position: absolute;
  min-width: 230px;
  border: 1px solid #484343;
  z-index: 120;
  top: 10px;
}
.appBody {
        max-width: 464px;
    }

</style>
