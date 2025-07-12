<script lang="ts">
	import {
		lockSigner,
		unLockSigner,
		disableAutoLock,
		checkPassword,
		setTimer,
		getVault,
		queryMid,
		queryTimer,
		checkIsLocked,
		reBuildMnPost,
		changePassword,
		saveMidPass,
		resetSigner,
		smoldot 
	} from '$lib/wallet/runes';
	import {
		isValidPassword,
		getElement,
		DB,
		type signerResponseType,
		type Vault
	} from '$lib/wallet/common';
	import { Toaster, Header, Footer,PriceChart } from '$lib/ui/components';
	import { toastState } from '$lib/ui/runes';




	let res: any | null = $state(null);


	async function vault() {
		const result = (await getVault()) as signerResponseType | null;
		res = result?.data.salt;
		console.log(result);
	}

	async function IsLocked() {
		const result = (await checkIsLocked()) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}

	async function Mid() {
		const result = (await queryMid()) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}

	async function Timer() {
		const result = (await queryTimer()) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}

	async function lock() {
		const result = (await lockSigner()) as signerResponseType | null;
		res = result?.success;
		console.log(result);
	}
	async function unLock() {
		const result = (await unLockSigner('@Qian7855')) as signerResponseType | null;
		res = result?.success;
		console.log(result);
	}
	async function disAutoLock() {
		const result = (await disableAutoLock()) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}
	async function disAutoLockps() {
		const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		const result = (await disableAutoLock()) as signerResponseType | null;
		res = result?.success;
		console.log(result);
	}
	async function SetTime() {
		const result = (await setTimer(30)) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}
	async function SetTimeps() {
		const vault = (await getElement(DB.Vault.name, 'zeno')) as Vault;
		const result = (await setTimer(30)) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}
	async function reBuildMn() {
		const result = (await reBuildMnPost()) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}
	async function CheckPassword() {
		const result = (await checkPassword('@Qian7855')) as signerResponseType | null;
		res = result?.data;
		console.log(result);
	}

	function testpassword() {
		const result = isValidPassword('@Qian7855');
		console.log(result);
	}
	async function changePs() {
		const result = (await changePassword('#Qian7855', '@Qian7855')) as signerResponseType | null;
		res = result?.success;
		console.log(result);
	}
	async function saveMid() {
		const result = (await saveMidPass('@Qian7855', true)) as signerResponseType | null;
		res = result?.success;
		console.log(result);
	}

	async function reset() {
		const result = (await resetSigner()) as signerResponseType | null;
		res = result?.success;
		console.log(result);
	}

smoldot


</script>

<Header />
<Toaster />

<div class="appBody">
	<PriceChart />
	<div class="result">worker test:{res}</div>
	<div class="test">
		<button onclick={vault}>getVault</button>
		<button onclick={IsLocked}>IsLocked</button>
		<button onclick={Mid}>queryMid</button>
		<button onclick={Timer}>queryTimer</button>
		<button onclick={lock}>lockSigner</button>
		<button onclick={unLock}>unLockSigner</button>
		<button onclick={disAutoLock}>disAutoLock</button>
		<button onclick={disAutoLockps}>disAutoLockps</button>
		<button onclick={SetTime}>SetTime</button>
		<button onclick={SetTimeps}>SetTimeps</button>
		<button onclick={reBuildMn}>reBuildMn</button>
		<button onclick={CheckPassword}>checkPassword</button>
		<button onclick={testpassword}>testpassword</button>
		<button onclick={changePs}>changePs</button>
		<button onclick={saveMid}>saveMid</button>
		<button onclick={reset}>reset</button>
	</div>


	<button onclick={() => toastState.add('title', 'message')}>toast</button>
	<input type="file" />
	<input type="file" capture="environment" accept="image/*" />

	

</div>

<Footer />

<style lang="postcss">
	.appBody {
		flex-direction: column;
		height: 100%;
		width: 95%;
		max-width: 48rem;
		padding: 6.4rem 1rem 0rem 1rem;
	}
	.result {
		font-size: 2rem;
	}

	.test {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		height: 100%;
		width: 100%;
		gap: 1rem;
	}
</style>
