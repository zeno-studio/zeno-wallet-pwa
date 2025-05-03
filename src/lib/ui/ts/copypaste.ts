  

export const copyInput = (targetId: string) => {
    if (!navigator.clipboard) {
        throw new Error('Browser does not support the native clipboard API.');
    }

    if (!targetId) {
        throw new Error('Target ID is not provided');
    }

    const element = document.getElementById(targetId) as HTMLInputElement | null;

    if (!element) {
        throw new Error('Element not found');
    }

    const value = element.value;

    if (!value) {
        throw new Error('No value to copy');
    }

    navigator.clipboard.writeText(value).catch((error) => {
        throw new Error(`Copy operation failed: ${error}`);
    });
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

export const pasteToInput=(target: string) =>{
	if (!navigator.clipboard) {
		return;
	}
	const d = document.getElementById(target) as HTMLInputElement;
	navigator.clipboard.readText().then((clipText) => (d.value = clipText));
}
