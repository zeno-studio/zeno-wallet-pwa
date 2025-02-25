export const VERSION = "0.1.0";

export const MNEMONIC_LENGTH_MIN = 12
export const MNEMONIC_LENGTH_MAX = 24
export const NICKNAME_MAX_LENGTH = 32
export const ACCOUNT_INDEX_MAX = 10

export const TRANSACTION_CANCELLATION_GAS_FACTOR = 1.2 // Increase gas price offer by this factor when cancellation txs
// Slippage tolerances are percentages (ex. 5 = 5% slippage tolerance)
export const MIN_AUTO_SLIPPAGE_TOLERANCE = 0.5
export const MAX_AUTO_SLIPPAGE_TOLERANCE = 5.5
export const MAX_CUSTOM_SLIPPAGE_TOLERANCE = 20

