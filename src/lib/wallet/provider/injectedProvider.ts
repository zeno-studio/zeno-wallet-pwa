import { cryptoWaitReady } from '@polkadot/util-crypto';

await cryptoWaitReady(); // 初始化波卡加密库

export class InjectedProvider {
  // 以太坊属性
  isMetaMask = true;
  ethChainId = '0x1'; // 默认以太坊主网
  ethAccounts = [];

  // 波卡属性
  polkadotAccounts = [];
  polkadotChain = 'polkadot'; // 默认Polkadot链

  constructor() {
    this.isMetaMask = true;
  }

  // 以太坊方法
  async request({ method, params }) {
    switch (method) {
      case 'eth_requestAccounts':
        this.ethAccounts = await this.connectEthWallet();
        return this.ethAccounts;
      case 'eth_chainId':
        return this.ethChainId;
      case 'eth_sendTransaction':
        return await this.signEthTransaction(params);
      case 'eth_accounts':
        return this.ethAccounts;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  async connectEthWallet() {
    return ['0x1234567890abcdef1234567890abcdef12345678'];
  }

  async signEthTransaction(params) {
    console.log('Signing Ethereum transaction:', params);
    return '0xabcdef1234567890abcdef1234567890abcdef12';
  }

  // 波卡方法
  async enablePolkadot(dappName) {
    console.log(`Enabling Polkadot for DApp: ${dappName}`);
    this.polkadotAccounts = await this.connectPolkadotWallet();
    return {
      accounts: {
        get: async () => this.polkadotAccounts,
        subscribe: (cb) => {
          // 模拟账户变化订阅
          const interval = setInterval(() => {
            cb(this.polkadotAccounts);
          }, 10000);
          return () => clearInterval(interval);
        },
      },
      signer: {
        signPayload: async (payload) => {
          return await this.signPolkadotPayload(payload);
        },
        signRaw: async (raw) => {
          return await this.signPolkadotRaw(raw);
        },
      },
    };
  }

  async connectPolkadotWallet() {
    // 模拟波卡账户（实际可调用UI或硬件钱包）
    return [
      {
        address: '5DTestAddress...1234', // SS58格式
        name: 'Test Account',
        type: 'sr25519',
      },
    ];
  }

  async signPolkadotPayload(payload) {
    console.log('Signing Polkadot payload:', payload);
    return {
      signature: '0xabcdef...5678',
      id: payload.id || 'test-id',
    };
  }

  async signPolkadotRaw(raw) {
    console.log('Signing Polkadot raw:', raw);
    return {
      signature: '0xabcdef...5678',
    };
  }

  // 事件通知
  emit(iframe, chainType, eventName, payload) {
    iframe.contentWindow.postMessage(
      {
        type: `${chainType.toUpperCase()}_EVENT`,
        event: eventName,
        payload,
      },
      'https://wallet.com'
    );
  }
}