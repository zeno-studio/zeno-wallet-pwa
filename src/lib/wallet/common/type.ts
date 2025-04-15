import { base, bsc, ethereum, optimism, polygon, sonic } from '$lib/wallet/common';

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
	nextPolkadotIndex: number;
	autoLock: boolean;
	timeLock: number;
	activeApps: App[];
	hiddenApps: App[];
	hiddenChains: number[];
	currency: string;
	isBackup: boolean;
};

export const defaultSettings: Settings = {
	darkMode: false,
	locale: 'en',
	currentAccountIndex: 0,
	nextAccountIndex: 1,
	nextPolkadotIndex: 101,
	autoLock: true,
	timeLock: 15, // in minutes
	activeApps: [],
	hiddenApps: [],
	hiddenChains: [],
	currency: 'USD',
	isBackup: false,
};

export type AccessStatus = 'APPROVED' | 'DENIED';
export type HexString = `0x${string}`;
export type AddressType = 'EVM' |'POLKADOT'|'';
export type KeyringType = 'secp256k1' | 'ed25519' | 'sr25519';
export type AccountType = 'local' | 'passkey' | 'hardware' ;

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


// {
// 	"version": 3,
// 	"id": "uuid-string",
// 	"address": "0x...",
// 	"crypto": {
// 	  "cipher": "aes-128-ctr",
// 	  "ciphertext": "encrypted-private-key",
// 	  "cipherparams": { "iv": "initialization-vector" },
// 	  "kdf": "pbkdf2",
// 	  "kdfparams": {
// 		"c": 262144,
// 		"dklen": 32,
// 		"prf": "hmac-sha256",
// 		"salt": "random-salt"
// 	  },
// 	  "mac": "message-authentication-code"
// 	}
//   }

export interface ZenoKeystore {
	wallet: string;
	crypto: {
	  cipher: string,
	  ciphertext: string,
	  kdf: string,
	  kdfparams: {
		n: number,
		r: number,
		p: number,
		dklen: number,
		salt: string
	  },
	}
}





export interface Chain {
	chainId: number;
	name: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: {
		http: string[];
		webSocket?: string[];
	};
	blockExplorers: {
		url: string[];
	};
	contracts?: {
		multicall3: {
			address: string;
			blockCreated: number;
		};
	};
	logoPath: string;
	testnet: boolean;
}

export interface Fiat {
	name: string;
	symbol: string;
	iconPath: string;
}

export interface CurrencyAsset {
	type: 'currency';
	chainId: number;
	symbol: string;
	name: string;
	decimals: number;
	iconPath: string;
}

export interface NFTAsset {
	type: NFTAssetType;
	chainId: number;
	symbol: string;
	name: string;
	decimals: number;
	tokenId: number;
	uri: string;
	contract: string;
}

export interface ERC20Asset {
	type: 'erc-20';
	chainId: number;
	symbol: string;
	name: string;
	decimals: number;
	iconPath: string;
	contract: string;
}

export type AssetType = NFTAssetType | TokenType;

export type NFTAssetType = 'erc-721' | 'erc-1155';

export type TokenType = 'currency' | 'erc-20';

export type TxParticipant = {
	address: string;
	network: string;
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
  }export interface EIP1193Request {
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
  }export interface EIP1193Request {
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
  }export interface EIP1193Request {
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
  }export interface EIP1193Request {
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
  }export interface EIP1193Request {
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