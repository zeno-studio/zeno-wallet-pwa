
export enum ErrorCodes {
    userRejected = 4001,
    unauthorized = 4100,
    unsupportedMethod = 4200,
    disconnected = 4900,
    chainDisconnected = 4901,
  }

  export interface JSONError {
    error: ProviderError;
  }

  export interface ProviderError {
    message: string;
    code: number;
    data?: unknown;
  }
  export interface ProviderMessage {
    method: MessageMethod;
    params: Array<any>;
  }

  export enum MessageMethod {
    changeChainId = 'changeChainId',
    changeAddress = 'changeAddress',
    changeConnected = 'changeConnected',
    subscription = 'eth_subscription',
  }
  
  export enum EmitEvent {
    accountsChanged = 'accountsChanged',
    chainChanged = 'chainChanged',
    networkChanged = 'networkChanged',
    connect = 'connect',
    disconnect = 'disconnect',
    message = 'message',
  }
export enum ProviderName {
    ethereum = 'ethereum',
    polkadot = 'polkadot',
  }

export enum ProviderType {
    evm,
    substrate,
}

export type SendMessageHandler = (
    provider: ProviderName,
    message: string,
  ) => Promise<any>;

  export interface ProviderOptions {
    name: ProviderName;
    type: ProviderType;
    sendMessageHandler: SendMessageHandler;
  }

  export interface EIP6963ProviderInfo {
    uuid: string;
    name: string;
    icon: `data:image/svg+xml;base64,${string}`;
    rdns: string;
  }
  
  export enum EIP6963Events {
    request = 'eip6963:requestProvider',
    announce = 'eip6963:announceProvider',
  }

  export interface EthereumRequest {
    method: string;
    params?: Array<any>;
  }
  export interface EthereumResponse {
    result?: any;
    error?: ProviderError;
  }


  
  export type CallbackFunction = (
    err: Error | null,
    res?: JsonRpcResponse,
  ) => void;
  

  export interface JsonRpcRequest {
    id: string;
    jsonrpc: '2.0';
    method: string;
    params?: any[];
  }
  
  export interface JsonRpcResponse {
    id: string;
    jsonrpc: '2.0';
    result?: unknown;
    error?: Error;
  }

  export enum InternalMethods {
    getEthereumEncryptionPublicKey = 'zeno_eth_encryption_pubkey',
    ethereumDecrypt = 'zeno_eth_decrypt',
    sign = 'zeno_sign_hash',
    unlock = 'zeno_unlock_keyring',
    lock = 'zeno_lock_keyring',
    isLocked = 'zeno_is_locked_keyring',
    newWindowInit = 'zeno_newWindowInit',
    getSettings = 'zeno_getAllSettings',
    newWindowUnload = 'zeno_newWindowUnload',
    getNewAccount = 'zeno_getNewAccount',
    saveNewAccount = 'zeno_saveNewAccount',
    changeNetwork = 'zeno_changeNetwork',
  }

  export interface EVMInjectSettings {
    disabled: boolean;
    timestamp: number;
  }
  export interface EVMSettingsType {
    inject: EVMInjectSettings;
  }
  export interface SubstrateSettingsType {
    injectPolkadotjs: boolean;
  }

  export interface SettingsType {
    evm: EVMSettingsType;
    substrate: SubstrateSettingsType;
    manifestVersion: number;
  }