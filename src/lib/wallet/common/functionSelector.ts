interface FunctionSelector {
  selector: string; // 函数选择器（hex 格式，带 0x）
  signature: string; // 函数签名（如 transfer(address,uint256)）
  standard: string; // 所属标准或协议（如 ERC-20、Uniswap V3）
  description: string; // 用户友好的描述
}

export const functionSelectors: FunctionSelector[] = [
  // ERC-20 标准
  {
    selector: "0xa9059cbb",
    signature: "transfer(address,uint256)",
    standard: "ERC-20",
    description: "Transfer tokens to an address"
  },
  {
    selector: "0x23b872dd",
    signature: "transferFrom(address,address,uint256)",
    standard: "ERC-20",
    description: "Transfer tokens from one address to another"
  },
  {
    selector: "0x095ea7b3",
    signature: "approve(address,uint256)",
    standard: "ERC-20",
    description: "Approve an address to spend tokens"
  },
  {
    selector: "0x70a08231",
    signature: "balanceOf(address)",
    standard: "ERC-20",
    description: "Check token balance of an address"
  },
  {
    selector: "0x18160ddd",
    signature: "totalSupply()",
    standard: "ERC-20",
    description: "Get total token supply"
  },
  {
    selector: "0xdd62ed3e",
    signature: "allowance(address,address)",
    standard: "ERC-20",
    description: "Check token allowance for an address"
  },
  {
    selector: "0x42966c68",
    signature: "burn(uint256)",
    standard: "ERC-20",
    description: "Burn tokens (non-standard)"
  },
  {
    selector: "0x40c10f19",
    signature: "mint(address,uint256)",
    standard: "ERC-20",
    description: "Mint tokens (non-standard)"
  },

  // ERC-721 标准
  {
    selector: "0x23b872dd",
    signature: "transferFrom(address,address,uint256)",
    standard: "ERC-721",
    description: "Transfer an NFT"
  },
  {
    selector: "0x42842e0e",
    signature: "safeTransferFrom(address,address,uint256)",
    standard: "ERC-721",
    description: "Safely transfer an NFT"
  },
  {
    selector: "0xb88d4fde",
    signature: "safeTransferFrom(address,address,uint256,bytes)",
    standard: "ERC-721",
    description: "Safely transfer an NFT with data"
  },
  {
    selector: "0x095ea7b3",
    signature: "approve(address,uint256)",
    standard: "ERC-721",
    description: "Approve an address to transfer an NFT"
  },
  {
    selector: "0xa22cb465",
    signature: "setApprovalForAll(address,bool)",
    standard: "ERC-721",
    description: "Approve or revoke all NFTs for an address"
  },
  {
    selector: "0x081812fc",
    signature: "getApproved(uint256)",
    standard: "ERC-721",
    description: "Get approved address for an NFT"
  },
  {
    selector: "0xe985e9c5",
    signature: "isApprovedForAll(address,address)",
    standard: "ERC-721",
    description: "Check if an address is approved for all NFTs"
  },
  {
    selector: "0x70a08231",
    signature: "balanceOf(address)",
    standard: "ERC-721",
    description: "Check NFT balance of an address"
  },
  {
    selector: "0x6352211e",
    signature: "ownerOf(uint256)",
    standard: "ERC-721",
    description: "Get owner of an NFT"
  },
  {
    selector: "0x2f745c59",
    signature: "safeMint(address,uint256)",
    standard: "ERC-721",
    description: "Safely mint an NFT (non-standard)"
  },

  // ERC-1155 标准
  {
    selector: "0xf242432a",
    signature: "safeTransferFrom(address,address,uint256,uint256,bytes)",
    standard: "ERC-1155",
    description: "Safely transfer a token"
  },
  {
    selector: "0x2eb2c2d6",
    signature: "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)",
    standard: "ERC-1155",
    description: "Safely batch transfer tokens"
  },
  {
    selector: "0xa22cb465",
    signature: "setApprovalForAll(address,bool)",
    standard: "ERC-1155",
    description: "Approve or revoke all tokens for an address"
  },
  {
    selector: "0xe985e9c5",
    signature: "isApprovedForAll(address,address)",
    standard: "ERC-1155",
    description: "Check if an address is approved for all tokens"
  },
  {
    selector: "0x70a08231",
    signature: "balanceOf(address,uint256)",
    standard: "ERC-1155",
    description: "Check token balance of an address"
  },
  {
    selector: "0x0e89341c",
    signature: "uri(uint256)",
    standard: "ERC-1155",
    description: "Get token metadata URI"
  },

  // Uniswap V2
  {
    selector: "0x38ed1739",
    signature: "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
    standard: "Uniswap V2",
    description: "Swap exact tokens for tokens"
  },
  {
    selector: "0x5c11d795",
    signature: "swapTokensForExactTokens(uint256,uint256,address[],address,uint256)",
    standard: "Uniswap V2",
    description: "Swap tokens for exact tokens"
  },
  {
    selector: "0xf305d719",
    signature: "addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)",
    standard: "Uniswap V2",
    description: "Add liquidity to a pool"
  },
  {
    selector: "0xe8e33700",
    signature: "addLiquidityETH(address,uint256,uint256,uint256,address,uint256)",
    standard: "Uniswap V2",
    description: "Add ETH liquidity to a pool"
  },
  {
    selector: "0xbaa2abde",
    signature: "removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)",
    standard: "Uniswap V2",
    description: "Remove liquidity from a pool"
  },
  {
    selector: "0x02751cec",
    signature: "removeLiquidityETH(address,uint256,uint256,uint256,address,uint256)",
    standard: "Uniswap V2",
    description: "Remove ETH liquidity from a pool"
  },
  {
    selector: "0xded9382a",
    signature: "swapExactETHForTokens(uint256,address[],address,uint256)",
    standard: "Uniswap V2",
    description: "Swap ETH for tokens"
  },
  {
    selector: "0x7ff36ab5",
    signature: "swapExactTokensForETH(uint256,uint256,address[],address,uint256)",
    standard: "Uniswap V2",
    description: "Swap tokens for ETH"
  },

  // Uniswap V3
  {
    selector: "0x414bf389",
    signature: "exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))",
    standard: "Uniswap V3",
    description: "Swap exact tokens in a single pool"
  },
  {
    selector: "0xc04b8d59",
    signature: "exactInput((bytes,address,uint256,uint256,uint256))",
    standard: "Uniswap V3",
    description: "Swap exact tokens in multiple pools"
  },
  {
    selector: "0x49404b7c",
    signature: "exactOutputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))",
    standard: "Uniswap V3",
    description: "Swap for exact tokens in a single pool"
  },
  {
    selector: "0x42712a67",
    signature: "exactOutput((bytes,address,uint256,uint256,uint256))",
    standard: "Uniswap V3",
    description: "Swap for exact tokens in multiple pools"
  },
  {
    selector: "0xe0e112f2",
    signature: "mint((address,address,int24,int24,uint256,uint256,uint256,uint256,address,uint256))",
    standard: "Uniswap V3",
    description: "Add liquidity to a pool"
  },
  {
    selector: "0x517a55a3",
    signature: "collect((address,address,int24,int24,uint128,uint128))",
    standard: "Uniswap V3",
    description: "Collect fees from a pool"
  },
  {
    selector: "0x1a686502",
    signature: "swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",
    standard: "Uniswap V3",
    description: "Swap tokens with dynamic fees"
  },

  // Uniswap V4
  {
    selector: "0x0c49ccbe",
    signature: "swap((address,bool,int256,uint128,bytes))",
    standard: "Uniswap V4",
    description: "Dynamic swap with hooks"
  },
  {
    selector: "0x128acb08",
    signature: "lock(bytes)",
    standard: "Uniswap V4",
    description: "Lock pool for operations"
  },
  {
    selector: "0x88316417",
    signature: "modifyPosition((address,int24,int24,int256))",
    standard: "Uniswap V4",
    description: "Modify liquidity position"
  },

  // Aave V2
  {
    selector: "0xd0e30db0",
    signature: "deposit(address,uint256)",
    standard: "Aave V2",
    description: "Deposit assets to lending pool"
  },
  {
    selector: "0x2e1a7d4d",
    signature: "withdraw(address,uint256)",
    standard: "Aave V2",
    description: "Withdraw assets from lending pool"
  },
  {
    selector: "0x573ade81",
    signature: "borrow(address,uint256)",
    standard: "Aave V2",
    description: "Borrow assets from lending pool"
  },
  {
    selector: "0x6b0f47fe",
    signature: "repay(address,uint256)",
    standard: "Aave V2",
    description: "Repay borrowed assets"
  },

  // Compound
  {
    selector: "0x3d981921",
    signature: "supply(address,uint256)",
    standard: "Compound",
    description: "Supply assets to market"
  },
  {
    selector: "0x8527a702",
    signature: "redeem(address,uint256)",
    standard: "Compound",
    description: "Redeem assets from market"
  },
  {
    selector: "0x1249c58b",
    signature: "borrow(address,uint256)",
    standard: "Compound",
    description: "Borrow assets from market"
  },

  // Chainlink
  {
    selector: "0x35af9eea",
    signature: "request(address,bytes)",
    standard: "Chainlink",
    description: "Request data or cross-chain message"
  }
];






// 查找函数选择器
export const  parseTxInput=async(
  input: string,
  toAddress: string,
  txHash?: string // 可选：交易哈希，用于查询日志
): Promise<{ type: string; description: string; signature?: string; standard?: string }> =>{
  if (!input || input === '0x') {
    return { type: 'Native Transfer', description: 'Transfer native token (e.g., ETH)' };
  }

  const selector = input.slice(0, 10); // 提取前 4 字节（包括 0x）
  const matches = functionSelectors.filter(item => item.selector === selector);

  if (!matches.length) {
    return { type: 'Unknown', description: 'Unknown contract call' };
  }

  // 步骤 1：检查本地合约缓存
  const contractInfo = contractMetadata[toAddress.toLowerCase()];
  if (contractInfo) {
    const match = matches.find(m => m.standard === contractInfo.standard);
    if (match) {
      return {
        type: `${contractInfo.standard} ${match.description.split(' ')[0]}`,
        description: match.description,
        signature: match.signature,
        standard: match.standard
      };
    }
  }

  // 步骤 2：通过链上查询判断合约类型（ERC-165 supportsInterface）
  const erc20InterfaceId = '0x36372b07'; // ERC-20 的 interfaceId（非标准，但可通过 symbol() 判断）
  const erc721InterfaceId = '0x80ac58cd'; // ERC-721 的 interfaceId
  const erc1155InterfaceId = '0xd9b67a26'; // ERC-1155 的 interfaceId

  const contract = new web3.eth.Contract(
    [
      { type: 'function', name: 'supportsInterface', inputs: [{ type: 'bytes4' }], outputs: [{ type: 'bool' }] }
    ],
    toAddress
  );

  let standard = 'Unknown';
  try {
    if (await contract.methods.supportsInterface(erc721InterfaceId).call()) {
      standard = 'ERC-721';
    } else if (await contract.methods.supportsInterface(erc1155InterfaceId).call()) {
      standard = 'ERC-1155';
    } else {
      // 尝试调用 ERC-20 的 symbol() 函数
      const erc20Contract = new web3.eth.Contract(
        [{ type: 'function', name: 'symbol', inputs: [], outputs: [{ type: 'string' }] }],
        toAddress
      );
      await erc20Contract.methods.symbol().call();
      standard = 'ERC-20';
    }
  } catch (error) {
    console.warn('Contract type detection failed:', error.message);
  }

  // 步骤 3：如果有 txHash，检查日志
  if (txHash) {
    try {
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      const transferTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'; // Transfer 事件
      const transferSingleTopic = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'; // ERC-1155 TransferSingle

      const hasTransfer = receipt.logs.some(log => log.topics[0] === transferTopic);
      const hasTransferSingle = receipt.logs.some(log => log.topics[0] === transferSingleTopic);

      if (hasTransfer && standard === 'ERC-721') {
        standard = 'ERC-721';
      } else if (hasTransfer && standard === 'ERC-20') {
        standard = 'ERC-20';
      } else if (hasTransferSingle) {
        standard = 'ERC-1155';
      }
    } catch (error) {
      console.warn('Log parsing failed:', error.message);
    }
  }

  // 步骤 4：选择匹配的 standard 或默认第一个
  const match = matches.find(m => m.standard === standard) || matches[0];
  return {
    type: `${match.standard} ${match.description.split(' ')[0]}`,
    description: match.description,
    signature: match.signature,
    standard: match.standard
  };
}

