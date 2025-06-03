export const VERSION = "1.0.0"

export const TRANSACTION_CANCELLATION_GAS_FACTOR = 1.2 // Increase gas price offer by this factor when cancellation txs
// Slippage tolerances are percentages (ex. 5 = 5% slippage tolerance)
export const MIN_AUTO_SLIPPAGE_TOLERANCE = 0.5
export const MAX_AUTO_SLIPPAGE_TOLERANCE = 5.5
export const MAX_CUSTOM_SLIPPAGE_TOLERANCE = 20

export const PVM_ADDRESSID20_SUFFIX = "eeeeeeeeeeeeeeeeeeeeeeee"

export const ANKR_API_KEY="ccf92c089ee0f80ae00b09422c6f8f37af5da1eea54754feb7122ea70f7fee23"
export const OPENEXCHANGERATES_API_KEY="4c7f2dedfd23435a8dd373b1f798278b"

export const rpcIntervalMs = 10000

// 这是一个 (ed|sr)25510 派生地址
// 先对公钥进行哈希处理，避免公钥被截断
//	让account_hash = blake2_256 ( account_bytes ) ;//
// 我们修改to_address函数，首先对 AccountId32 进行哈希处理，然后使用尾随的 20 个字节作为AccountId20。如果AccountId32以 12x 0xEE 结尾，我们保持当前的行为，即截断那些尾随字节。
// blake2 速度更快。Eth 代码永远不需要处理此哈希，因此不使用 keccak 也没问题。