<script lang="ts">
	import { SwitchTheme, LanguageSelector } from '$lib/ui/components';
	import { CameraIcon,WalletIcon,AddIcon } from '$lib/svg';


</script>

{#snippet title(name:string)}
<div class="item-container2">
	<div class="title1">
		{name}
	</div>
</div>
{/snippet}

{#snippet preference(SVGAElement,name:string,SVGAElement2)}
<div class="item-container">
	<div class="item">
		<div class="item-l">
			<SVGAElement class="icon2rem" />
			{name}
		</div>

		<div class="item-r"><SVGAElement2 class="icon2rem" /></div>
	</div>
</div>
{/snippet}


<div class="appContainer">
	<div class="appBody">
		{@render title("General")}
		{@render preference(CameraIcon,"Theme",SwitchTheme)}
		<LanguageSelector />

		{@render title("Advanced")}
		<div class="item-container">
			<div class="item">
				<div class="item-l">
					<AddIcon class="icon2rem" />
					Change Password
				</div>

				<div class="item-r"><WalletIcon class="icon2rem" /></div>
			</div>
		</div>
		<div class="item-container">
			<div class="item">
				<div class="item-l">
					<AddIcon class="icon2rem" />
					Backup Secret Phrase
				</div>

				<div class="item-r"><WalletIcon class="icon2rem" /></div>
			</div>
		</div>

		<div class="item-container">
			<div class="item">
				<div class="item-l">
					<AddIcon class="icon2rem" />
					Backup to Cloud
				</div>

				<div class="item-r"><WalletIcon class="icon2rem" /></div>
			</div>
		</div>

		<div class="item-container">
			<div class="item">
				<div class="item-l">
					<AddIcon class="icon2rem" />
					Restore from Cloud
				</div>

				<div class="item-r"><WalletIcon class="icon2rem" /></div>
			</div>
		</div>

		<div class="item-container">
			<div class="item">
				<div class="item-l">
					<AddIcon class="icon2rem" />
					Auto-lock timer (minutes)
				</div>

				<div class="item-r"><WalletIcon class="icon2rem" /></div>
			</div>
		</div>
		<div class="item-container">
			<div class="item">
				<div class="item-l">
					<AddIcon class="icon2rem" />
					Reset wallet
				</div>

				<div class="item-r"><WalletIcon class="icon2rem" /></div>
			</div>
		</div>



	


		
	



	</div>
</div>

<style lang="postcss">
	.item-container {
		margin-bottom: 4px;
	}
	.title1 {
		display: flex;
    justify-content: flex-start;
    margin-right: auto;
	font-size: 1.5rem;
	font-weight: 600;
	}

</style>
