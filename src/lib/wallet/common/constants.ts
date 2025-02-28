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
    keypath: 'accountIndex'
  },
  WatchAccount: {
    name: 'WatchAccount',
    keypath: 'address'
  },
  AdditionalChain: {
    name: 'AdditionalChain',
    keypath: 'name'
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

