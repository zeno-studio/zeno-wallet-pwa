<script lang="ts">
	interface ArenaOptions {
		image?: string; // Base64 图片
		content?: string; // 文字内容
	}

	// 状态管理（Svelte 5 Runes）
	let { file = $bindable() } = $props();
	let previewContent = $state<string | null>(null); // 图片 Base64 或 JSON 文本
	let isImage = $state<boolean>(false); // 是否为图片
	let isDragging = $state(false);
	let errorMessage = $state<string | null>(null);

	const allowedTypes = ['image/png', 'image/jpeg', 'application/json'];
	const maxSize = 5 * 1024 * 1024; // 5MB

	// 辅助函数：将 File 转为 Base64（图片）
	async function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	// 辅助函数：读取 JSON 文件内容
	async function readJsonFile(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsText(file);
		});
	}

	// 处理文件内容
	async function handleFileContent(file: File) {
		try {
			if (['image/png', 'image/jpeg'].includes(file.type)) {
				// 图片：调用 decodeQR
				const base64 = await fileToBase64(file);
				isImage = true;
				previewContent = base64;
			} else if (file.type === 'application/json') {
				// JSON：调用 decodeKeystore
				const text = await readJsonFile(file);
				isImage = false;
				previewContent = text;
			}
		} catch (error) {
			errorMessage = 'failed to process file';
			setTimeout(() => (errorMessage = null), 3000);
		}
	}

	// 处理文件选择（点击上传）
	async function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const selectedFile = input.files?.[0];
		if (!selectedFile) return;

		if (!allowedTypes.includes(selectedFile.type)) {
			errorMessage = 'Only supports PNG, JPEG or JSON files';
			setTimeout(() => (errorMessage = null), 3000);
			return;
		}

		if (selectedFile.size > maxSize) {
			errorMessage = 'The file size cannot exceed 5mb';
			setTimeout(() => (errorMessage = null), 3000);
			return;
		}

		file = selectedFile;
		await handleFileContent(selectedFile);
	}

	// 处理拖放文件
	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;

		const droppedFile = event.dataTransfer?.files[0];
		if (!droppedFile) return;

		if (!allowedTypes.includes(droppedFile.type)) {
			errorMessage = 'Only supports PNG, JPEG or JSON files';
			setTimeout(() => (errorMessage = null), 3000);
			return;
		}

		if (droppedFile.size > maxSize) {
			errorMessage = 'The file size cannot exceed 5mb';
			setTimeout(() => (errorMessage = null), 3000);
			return;
		}

		file = droppedFile;
		await handleFileContent(droppedFile);
	}

	// 拖放事件：进入和离开
	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}

	// 清理预览
	function clearFile(e: MouseEvent) {
		file = null;
		previewContent = null;
		isImage = false;
		e.stopPropagation();
	}
</script>

<!-- 拖放区域 -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="drop-zone"
	class:active={isDragging}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	onclick={() => document.getElementById('file-input')?.click()}
>
	{#if previewContent}
		{#if isImage}
			<img src={previewContent} alt="Preview" class="preview" />
		{:else}
			<div class="json-preview">{previewContent}</div>
		{/if}
		<button class="clear" onclick={clearFile}>Clear</button>
	{:else}
		<div class="drop-tips">
			{isDragging ? 'Release to upload' : 'Drop PNG/JPG/JSON file or click to upload'}
		</div>
	{/if}
	<input
		id="file-input"
		type="file"
		accept="image/png,image/jpeg,application/json"
		onchange={handleFileSelect}
		style="display: none;"
	/>
</div>

<style lang="postcss">
	.drop-zone {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border: 2px dashed var(--bg3);
		background: var(--bg1);
		border-radius: 0.8rem;
		padding: 2rem;
		text-align: center;
		cursor: pointer;
		transition: border-color 0.3s ease;
		width: 100%;
		gap: 1rem;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.drop-zone.active {
		border-color: var(--primary);
	}

	.preview {
		width: 250px;
		height: 250px;
		object-fit: cover;
		border-radius: 2rem;
	}

	.drop-tips {
		color: var(--text);
		font-size: 1.4rem;
		margin-top: 5rem;
		margin-bottom: 5rem;
		text-align: center;
	}

	.json-preview {
		max-height: 150px;
		padding: 10px;
		word-break: break-all;
		border-radius: 4px;
		text-align: left;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.clear {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--text);
		font-size: 1.4rem;
		font-weight: 600;
		border: 1px solid var(--border);
		border-radius: 1.6rem;
		background: var(--bg3);
		box-sizing: border-box;
		padding: 1rem;
		cursor: pointer;
		outline: none;
		z-index: 200;
	}
</style>
