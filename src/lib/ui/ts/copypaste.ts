  

export function copyInput( target:string) {
	if (!navigator.clipboard) {
		throw new Error("Browser don't have support for native clipboard.");
	}
	if (target) {
		const node: HTMLInputElement|null = document.getElementById(target);
		if (!node ) {
			throw new Error('Element not found');
		}
        navigator.clipboard.writeText(node.value)
	}
        
}
      
export const copyText = ( target:string)=> {
	if (!navigator.clipboard) {
		throw new Error("Browser don't have support for native clipboard.");
	}
	if (target) {
		const node: HTMLElement|null = document.getElementById(target);
		if (!node || !node.textContent) {
			throw new Error('Element not found');
		}
		navigator.clipboard.writeText(node.textContent);
	}
};

export function pasteToInput(target: string) {
	if (!navigator.clipboard) {
		return;
	}
	const d = document.getElementById(target) as HTMLInputElement;
	navigator.clipboard.readText().then((clipText) => (d.value = clipText));
}
