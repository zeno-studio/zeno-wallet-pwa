<script >
	
	const 	icon_height = 79,	
			// Number of icons in the strip
			num_icons = 9,	
			// Max-speed in ms for animating one icon down
			time_per_icon = 100,
			// Holds icon indexes
			indexes = [0, 0, 0],
			randomList = [10, 30, 49];
			

/** 
 * Roll one reel
 */
const roll = (reel,random) => {
	return new Promise((resolve, reject) => {
		
		const style = getComputedStyle(reel),
					// Current background position
					backgroundPositionY = parseFloat(style["background-position-y"]);
	
		// Delay animation with timeout, for some reason a delay in the animation property causes stutter
		setTimeout(() => { 
			// Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
			reel.style.transition = `background-position-y ${ random* time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// Set background position
			reel.style.backgroundPositionY = `${backgroundPositionY + random * icon_height}px`;
		});
			
	});
};

const resetRoll = (reel) => {
	return new Promise((resolve, reject) => {
		const style = getComputedStyle(reel),
					// Current background position
					backgroundPositionY = parseFloat(style["background-position-y"]);
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `top`;
	});
};

function rollAll() {
	const reelsList = document.querySelectorAll('.slots > .reel');
	const random = [...reelsList].map((reel, i) => randomList[i]);
	Promise.all([...reelsList].map((reel, i) => roll(reel, random[i])))
		.then(() => {
			// add up indexes
		});
	
};

function resetAll() {
	const reelsList = document.querySelectorAll('.slots > .reel');
	Promise.all([...reelsList].map((reel) => resetRoll(reel)))
		.then(() => {
			// add up indexes
		});
}

</script>


<div class="slots">
	<div class="reel"></div>
	<div class="reel"></div>
	<div class="reel"></div>
</div>
<div>
	<button on:click={rollAll}>roll</button>
	<button on:click={resetAll}>roll</button>
</div>


<style>

:root{
--icon_width: 79px;
--icon_height: 79px;
--num_icons: 9;
}
.slots {
	position: relative;
	width:calc(var(--icon_width)*3.5) ;
	height:calc(var(--icon_height)*3);
	display: flex;
	justify-content: space-between;
	padding: 20px;
	background: linear-gradient(45deg, grey 0%, lightgray 100%);

}

.reel {
		position: relative;
		width: var(--icon_width);
		height: calc(var(--icon_height)*3);
		border: 1px solid rgba(black, 0.3);
		border-radius: 3px;
		overflow: hidden;
		background-image: url(https://assets.codepen.io/439000/slotreel.webp);
		background-position: 0 0px;
		background-repeat: repeat-y;

}

</style>