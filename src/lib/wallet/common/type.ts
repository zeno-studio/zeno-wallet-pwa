

export type App = {
	id: number;
	name: string;
	path: string;
	chain: number[];
};

export type Settings = {
	darkMode: boolean;
	locale: string;
	currentAccountIndex: number;
	nextAccountIndex: number;
	nextPQAccountIndex: number;
	autoLock: boolean;
	autoLockTimer: number;
	activeApps: App[];
	hiddenApps: App[];
	hiddenChains: number[];
	currency: string;
	fiat: string;
	isBackup: boolean;
};

export const defaultSettings: Settings = {
	darkMode: false,
	locale: 'en',
	currentAccountIndex: 0,
	nextAccountIndex: 1,
	nextPQAccountIndex: 101,
	autoLock: true,
	autoLockTimer: 15, // in minutes
	activeApps: [],
	hiddenApps: [],
	hiddenChains: [],
	currency: 'ETH',
	fiat: 'USD',
	isBackup: false,
};

export type AccessStatus = 'APPROVED' | 'DENIED';
export type HexString = `0x${string}`;
export type AddressType = 'EVM' | 'POLKADOT' | 'POST-QUANTUM'|'';
export type KeyringType = 'secp256k1' | 'ed25519' | 'sr25519'|'secp256r1'|'';
export type AccountType = 'local' | 'passkey' | 'hardware'|'';

export interface Account {
	name: string;
	readonly address: string;
	readonly accountIndex: number;
	readonly accountType: AccountType;
	readonly addressType?: AddressType;
	readonly derivePath?: string;
	readonly keyringType?: KeyringType;
	isHidden: boolean;
	memo?: string;
	ens?: string;
	nft?: string;
	tokenid?: number;
}

export type signerResponseType = {
	success: boolean;
	data?: any;
	error?: string;
};

export type signerRequestType = {
	method: string;
	argus?: any;
};

export interface AddressEntry {
	name: string;
	addressType: AddressType;
	readonly address: string;
	ens?: string;
	memo?: string;
	avatar?: string;
}

export interface Vault {
	readonly name: string;
	readonly salt: string;
	readonly ciphertext: string;
	readonly Version: string;
}



// cryptoVersion: V1;
// kdf: 'scrypt(password, salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 })'
// symmetric: 'XChaCha20-Poly1305-managedNonce'


export interface Chain {
	chainId: number;
	name: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: {
		http: {
			public: string;
			custom?: string;
		};
		webSocket?: {
			public?: string;
			custom?: string;
		};
	};
	blockExplorers: string;
	multicall3?: {
		address: string;
		blockCreated: number;
	};
	contracts?: any;
	testnet: boolean;
}

export type Fiat = {
	name: string;
	symbol: string;
}

export interface FiatRate {
	timestamp: number;
	EUR:number;
	GBP:number;
	JPY:number;
	CNY:number;
	KRW:number;
	RUB:number;
}

export interface CurrencyPrice {
	timestamp: number;
	BTC:number;
	ETH:number;
	DOT:number;
}

export type Token = {
	chainId: number;
	type: 'currency' | 'erc-20' | 'erc-777' | 'erc-1155' | "other";
	decimals: number;
	symbol: string;
	name: string;
	contract?: string;
};

export type TxParticipant = {
	address: string;
	chainId: number;
};

export interface Tx {
	sender: TxParticipant;
	recipient: TxParticipant;
	hash: string;
}

export interface TransferResult {
	isShowTxResult: boolean;
	isTxSuccess: boolean;
	txError?: Array<string>;
}

export type WalletBackupData = {
	vaults: Vault[];
	accounts: Account[];
	addressBook: AddressEntry[];
	History: History[];
	settings: Settings;
};

export interface EIP1193Request {
	method: string;
	params?: any[];
}

export interface MessagePayload {
	type: string;
	id?: string;
	payload?: EIP1193Request | any;
	result?: any;
	error?: string;
	event?: string;
}
