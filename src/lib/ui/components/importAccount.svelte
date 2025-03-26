<script lang="ts">
	import { isSmallScreen } from '$lib/ui/ts';
	import { createEvmAccount, isValidMn } from '$lib/wallet/common';
	import { Loading, CloseIcon, AlertTriangle, PasteIcon } from '$lib/svg';
	import { passwordStrength } from 'check-password-strength';
	import { accountState, saveMidPass } from '$lib/wallet/runes';

	let terms = $state(false);
	let password = $state<string | null>(null);
	let password2 = $state<string | null>(null);
	let passwordShow = $state(false);
	let psStrength = $derived.by(() => {
		if (password) {
			return passwordStrength(password).value;
		} else {
			return 'empty';
		}
	});
	let isLoading = $state(false);
	let mn = $state<string | null>(null);
	let mnValid = $state<boolean | null>(null);

	function validMn(mn: string | null) {
		if (!mn) return null;
		const cleaned = mn?.replace(/\s+/g, ' ')?.trim();
		if (!cleaned) return null;
		const words = cleaned.split(' ');
		const validWords = words.filter(
			(word) => word.length >= 3 && word.length <= 8 && /^[a-zA-Z]+$/.test(word)
		);
		if (validWords.length !== 12 && validWords.length !== 24) {
			mnValid = false;
			setTimeout(() => {
				mnValid = null;
			}, 3000);
		} else {
			const validString = validWords.join(' ');
			if (isValidMn(validString)) {
				mnValid = true;
				mn = validString;
			} else {
				mnValid = false;
			}
		}
	}

	function pasteMn() {
		navigator.clipboard.readText().then((text) => {
			mn = text;
		});
	}

	function handleImportEvmAccount(ps: string, mn: string) {
		isLoading = true;
		const data = localStorage.getItem('settings');
		if (data) {
			const settings = JSON.parse(data);
			createEvmAccount(1, 0, ps);
			accountState.nextAccountIndex++;
			accountState.currentAccountIndex = 1;
			accountState.accountList.push(1);
			accountState.nextEvmAddressIndex++;
			settings.nextEvmAddressIndex++;
			settings.nextAccountIndex++;
			settings.currentAccountIndex = 1;
			settings.accountList.push(1);
			settings.vaultList.push('default');
			localStorage.setItem('settings', JSON.stringify(settings));

			saveMidPass(ps);
			const popover = document.getElementById('create');
			if (popover) {
				popover.hidePopover();
			}
		}
		password = null;
		password2 = null;
		terms = false;
		passwordShow = false;
		isLoading = false;
	}
</script>

<button class="bottom-button" popovertarget="import" popovertargetaction="show">
	Import account
</button>

<div id="import" popover="manual" class={{ active: isSmallScreen.current }}>
	<button class="close" popovertarget="import" popovertargetaction="hide">
		<CloseIcon class="icon17A" />
	</button>

<div class="step1">
	{#if mnValid === null}
		<h3>Import Recovery Phrase</h3>
		<span class="tip"> Restore an existing wallet with your 12 or 24-word recovery phrase</span>
		<textarea
		class="input-mn"
		placeholder="write your recovery phrase,use space to separate words,or you can click the paste button below"
		bind:value={mn}
		></textarea>

		<div class="paste-container">
			<button class="paste" onclick={pasteMn}>
				<PasteIcon class="icon17A" />
			</button>
		</div>

		{#if mnValid === false}
			<div>
				<AlertTriangle class="icon2rem" />
				Invalid recovery phrase
			</div>
		{/if}

		<button class="start" onclick={() => validMn(mn)}>Submit</button>
	{/if}
</div>


	{#if mnValid === true}
	<div class="step2">
		<h3>Set your Password</h3>

			{#if passwordShow}
				<input
					class="input"
					type="text"
					placeholder="Please input your password"
					bind:value={password}
				/>
			{:else}
				<input
					class="input"
					type="password"
					placeholder="Please input your password"
					bind:value={password}
				/>
			{/if}

			{#if passwordShow}
				<input
					class="input"
					type="text"
					placeholder="Please input your password"
					bind:value={password2}
				/>
			{:else}
				<input
					class="input"
					type="password"
					placeholder="Please input your password"
					bind:value={password2}
				/>
			{/if}

			<div class="label">
				<input type="checkbox" bind:checked={terms} />
				&nbsp I agree to the &nbsp<a href="/#/setting/about/terms"> Terms of Service </a>
			</div>
			<div class="label">
				Password strength:&nbsp
				{#if psStrength === 'Too weak' && password !== null}
					<span class="weak">{psStrength}</span>
				{:else if password === null}
					<span class="weak"></span>
				{:else if psStrength !== 'empty' && psStrength !== 'Too weak'}
					<span class="normal">{psStrength}</span>
				{/if}
			</div>

			{#if password === null && password2 === null}
				<button class="start"> Set your password </button>
			{:else if password !== password2}
				<button class="start"> Password not match</button>
			{:else if password === password2 && !terms}
				<button class="start"> Please agree to the terms</button>
			{:else if password === password2 && terms && psStrength === 'Too weak'}
				<button class="start"> Password too weak</button>
			{:else if password === password2 && terms && psStrength !== 'Too weak'}
				<button class="ok" onclick={() => handleImportEvmAccount(password as string, mn as string)}>
					Submit</button>
			{:else if isLoading}
				<button class="start"> <Loading class="icon17A" /> </button>
			{/if}
		</div>
	{/if}

</div>

<style lang="postcss">
	.label {
		display: flex;
		justify-content: flex-start;
		padding: 0px;
		font-size: 1.2rem;
		color: var(--color-text);
	}

	.bottom-button {
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-purple);
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
		cursor: pointer;
	}

	:popover-open {
		gap: 1rem;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		color: var(--color-text);
		height: 75%;
		width: 384px;
		padding: 16px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
	}
	.active {
		position: fixed;
		top: calc(100vh - 500px);
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		width: 100vw;
		padding: 16px;
		margin: 0px;
		background: var(--color-bg1);
		border-radius: 16px;
		border: 1px solid var(--color-border);
		z-index: 1001;
	}
	.input {
		padding: 1.4rem;
		font-size: 1.4rem;
		width: 80%;
		border-radius: 16px;
		background: var(--color-bg2);
		border: none;
	}

	.start {
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-pink);
		box-sizing: border-box;
		width: 80%;
		margin-top: 32px;
		padding: 1rem;
		cursor: pointer;
	}
	.ok {
		flex-direction: column;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 600;
		height: 48px;
		border: none;
		border-radius: 16px;
		background: var(--color-blue);
		box-sizing: border-box;
		width: 80%;
		margin-top: 32px;
		padding: 1rem;
		cursor: pointer;
	}
	.weak {
		padding: 0px 8px;
		border: none;
		border-radius: 8px;
		color: #fff;
		background: red;
		font-weight: 500;
	}
	.normal {
		font-weight: 500;
		padding: 0px 8px;
		border: none;
		border-radius: 8px;
		color: #fff;
		background: var(--color-green);
	}


	.step1 {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	.step2 {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}
	.tip {
		font-size: 1.2rem;
		color: var(--color-text);
		text-align: center;
		width: 70%;
	}
.input-mn {
	display: block!important; /* 确保是块级元素 */
	word-wrap: break-word;
	word-break: break-all;
	white-space: pre-wrap; /* 保留空格和换行 */
	padding: 1.4rem;
	font-size: 1.4rem;
	width: 80%;
	height: 10rem;
	border-radius: 16px;
	background: var(--color-bg2);
	border: 1px solid var(--color-border);
	resize: none; /* 禁止用户调整大小 */
	overflow-wrap: break-word; /* 防止长单词溢出 */
	text-align: left; /* 文字左对齐 */
	line-height: 1.5; /* 设置行高 */
}

	.paste {
		font-size: 1.4rem;
		border-radius: 16px;
		background: var(--color-bg2);
		border: none;
		cursor: pointer;
		height: 32px;
		width: 32px;

		
	}
	.paste-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 80%;
	}
</style>
