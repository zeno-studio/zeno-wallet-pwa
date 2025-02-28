import { type Account} from '$lib/wallet/common';

export const VERSION = "1.0.0";
export const MNEMONIC_LENGTH_MIN = 12
export const MNEMONIC_LENGTH_MAX = 24
export const NAME_BYTES_MAX = 24
export const ACCOUNT_INDEX_MAX = 9
export const WATCH_ACCOUNT_MAX = 3

export const TRANSACTION_CANCELLATION_GAS_FACTOR = 1.2 // Increase gas price offer by this factor when cancellation txs
// Slippage tolerances are percentages (ex. 5 = 5% slippage tolerance)
export const MIN_AUTO_SLIPPAGE_TOLERANCE = 0.5
export const MAX_AUTO_SLIPPAGE_TOLERANCE = 5.5
export const MAX_CUSTOM_SLIPPAGE_TOLERANCE = 20
export const PVM_ADDRESSID20_SUFFIX = "eeeeeeeeeeeeeeeeeeeeeeee"

export const TimeLocks = {
    appOpen: 0,
    appClose: 1,
    short: 1000 * 60 * 5,
    medium: 1000 * 60 * 15,
    long: 1000 * 60 * 30,
    hour: 1000 * 60 * 60,
}

export const dbStore = {
  Vault:{
    name: 'Vault',
    keypath: 'vaultName'
  },
  Account: {
    name: 'Account',
    keypath: "accountIndex"
  },
  WatchAccount: {
    name: 'WatchAccount',
    keypath: 'address'
  },
  AdditionalChain: {
    name: 'AdditionalChain',
    keypath: 'chainId'
  },
  History: {
    name: 'HistoryRecords',
    keypath: 'address'
  },
  AddressBook: {
    name: 'AddressBook',
    keypath: 'address'
  }
  
}


// 这是一个 (ed|sr)25510 派生地址
// 先对公钥进行哈希处理，避免公钥被截断
//	让account_hash = blake2_256 ( account_bytes ) ;//
// 我们修改to_address函数，首先对 AccountId32 进行哈希处理，然后使用尾随的 20 个字节作为AccountId20。如果AccountId32以 12x 0xEE 结尾，我们保持当前的行为，即截断那些尾随字节。
// blake2 速度更快。Eth 代码永远不需要处理此哈希，因此不使用 keccak 也没问题。