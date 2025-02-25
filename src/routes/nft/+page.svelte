<script lang="ts">
    import { CameraIcon,WalletIcon,AddIcon } from '$lib/svg';
    import { InputPass } from '$lib/ui/components';
    let a = $state(0);


    

</script>

{#snippet hello(SVGAElement)}

	<SVGAElement class="icon2rem" />

{/snippet}



<div class="appContainer">
	<div class="appBody">
		<div class="item-container">
            {@render hello(CameraIcon)}
            {@render hello(AddIcon)}
            <InputPass />
            <div class="item">
  
                    <div class="item1">
                        <a href="#">
                            <span class="notify-badge">NEW</span>
                            <img  class="img" src="/token/eth.svg"  alt="" />
                        </a>
                    </div>
          
       
                    <div class="item1">
                        <a href="#">
                            <span class="notify-badge">NEW</span>
                            <img  class="img" src="/token/eth.svg"  alt="" />
                        </a>
                    </div>
         
            </div>

       
		</div>
        
    
	</div>
</div>

<style>
    .item1 {
    position:relative;
    display:inline-block;
    width: 32px;
    height: 32px;
}
.notify-badge{
    position: absolute;
    right:-4px;
    bottom:2px;
    background:red;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
    color:white;
    font-size:10px;
}
.img{
    width: 32px;
    height: 32px;
}
</style>