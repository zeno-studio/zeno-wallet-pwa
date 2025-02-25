
export enum ErrorCodes {
    userRejected = 4001,
    unauthorized = 4100,
    unsupportedMethod = 4200,
    disconnected = 4900,
    chainDisconnected = 4901,
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




