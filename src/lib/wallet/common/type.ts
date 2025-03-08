import { base, bsc,ethereum, optimism, polygon, sonic,usd} from "$lib/wallet/common";

export const TimeLocks = {
  appOpen: 0,
  appClose: 1,
  short: 1000 * 60 * 5,
  medium: 1000 * 60 * 15,
  long: 1000 * 60 * 30,
  hour: 1000 * 60 * 60,
}


export type Settings = {
  darkMode: boolean;
  locale: string;
  currentAccountIndex:number;
  currentWatchAccountIndex: number;
  nextAccountIndex: number;
  nextWatchAccountIndex: number;
  nextEvmAddressIndex: number;
  nextPolkadotAddressIndex: number;
  timeLock: number
  defaultChains: number[];
  additionalChains: number[];
  accountList: number[];
  hiddenAccounts: number[];
  vaultList: string[];
  fiat: string
}

export const defaultSettings: Settings = {
  darkMode: false,
  locale: "en",
  currentAccountIndex:0,
  currentWatchAccountIndex:0,
  nextAccountIndex: 1,
  nextWatchAccountIndex: 1,    
  nextEvmAddressIndex: 0,
  nextPolkadotAddressIndex: 0,
  timeLock: TimeLocks.short,
  defaultChains: [base.chainId, bsc.chainId, ethereum.chainId, optimism.chainId, polygon.chainId, sonic.chainId],
  additionalChains: [],
  accountList: [],
  hiddenAccounts: [],
  vaultList: [],
  fiat: "USD",
}

export type AccessStatus ='APPROVED'|'DENIED';
export type HexString = `0x${string}`;
export type addressType = 'evm' | 'polkadot';
export type keyringType = 'secp256k1' | 'ed25519' | 'sr25519';
export type accountType = 'legacy' | 'passkey' | 'hardware';

export interface Account {
    accountIndex: number;
    accountName: string;
    accountType: accountType;
    address: string;
    addressType: addressType;
    derivePath: string;
    keyringType: keyringType;
    publicKey: string;
}

export interface WatchAccount {
  accountIndex: number;
  accountName: string;
  address: string;
  addressType: addressType;
  isHidden: boolean;
}

export interface AddressBook {
    name: string;
    address: string;
}

export interface LegacyVault {
    vaultName: string;
    salt: string;
    ciphertext: string;
    cryptoVersion: number;
}

// cryptoVersion: 1;
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
    testnet: boolean;
    logoPath?: string
}

  export interface Fiat {
    name: string
    symbol: string
    iconPath: string
  }
  
  export interface CurrencyAsset  {
    type: 'currency'
    chainId: number
    symbol: string
    name: string
    decimals: number
    iconPath: string
  }
  
  export interface NFTAsset {
    type: NFTAssetType
    chainId: number
    symbol: string
    name: string
    decimals: number
    tokenId: number
    uri: string
    contract: string
  }

  export interface ERC20Asset {
    type: 'erc-20'
    chainId: number
    symbol: string
    name: string
    decimals: number
    iconPath: string
    contract: string

  }
  
  export type AssetType = NFTAssetType|TokenType 

  export type NFTAssetType = 'erc-721'|'erc-1155'
  
  export type TokenType = 'currency'|'erc-20'

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
    vaults: LegacyVault[];
    accounts: Account[];
    watchAccount: WatchAccount[];
    additionalChains: Chain[];
    addressBook: AddressBook[];
    History: History[];
    settings: Settings;
  }
  
