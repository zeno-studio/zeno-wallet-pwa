import { VERSION} from "$lib/wallet/common";
import { ProviderName,
  ProviderType,
  InternalMethods,
  type ProviderOptions,
  type SendMessageHandler,
} from "$lib/wallet/provider/type";

import { 
  type AddEthereumChainParameter,
  type EIP1193Provider,
  type JsonRpcRequest,
  type JsonRpcResponse,
  
  type MetaMaskProvider,
  type ProviderConnectInfo,
  type ProviderMessage,
  type ProviderRpcError,
  type RequestArguments,
  type SwitchEthereumChainParameter,
  type WatchAssetParams,
  type Web3WalletPermission,
  type Address,
  type EIP1102,
  type EIP3085,
  type EIP3326,
  type EIP747,


 } from "eip1193-types";

 import * as EIP1193 from "eip1193-types";

 export type RequestReponse = {
  result?: any;
  error?: EIP1193.ProviderRpcError
 }

export class Provider  {
    chainId: string | null;
    networkVersion: string;
    isZenoWallet: boolean;
    isMetaMask: boolean;
    selectedAddress: string | null;
    connected: boolean;
    name: ProviderName;
    type: ProviderType;
    version: string;
    autoRefreshOnNetworkChange = false;
    sendMessageHandler: SendMessageHandler;
    constructor(options: ProviderOptions) {
      this.chainId = null; //deprecated
      this.networkVersion = '0x1'; //deprecated
      this.isZenoWallet = true;
      this.isMetaMask = true;
      this.selectedAddress = null; //deprecated
      this.connected = true;
      this.name = options.name;
      this.type = options.type;
      this.version = VERSION;
      this.sendMessageHandler = options.sendMessageHandler;
    }
    async request(request: EIP1193.RequestArguments): Promise<RequestReponse> {
      if (this.chainId === null) {
        await this.sendMessageHandler(
          this.name,
          JSON.stringify({
            method: 'eth_chainId',
          }),
        ).then(res => {
          this.chainId = res;
          this.networkVersion = Number(res).toString();
        });
      }
      if (
        this.selectedAddress === null &&
        request.method === 'eth_requestAccounts'
      ) {
        return this.sendMessageHandler(this.name, JSON.stringify(request)).then(
          res => {
            this.selectedAddress = res[0];
            return res;
          },
        );
      }
      return this.sendMessageHandler(this.name, JSON.stringify(request));
    }
    enable(): Promise<any> {
      return this.request({ method: 'eth_requestAccounts' });
    }
    isConnected(): boolean {
      return this.connected;
    }
    //deprecated
    send(
      method: string | JsonRpcRequest,
      params?: Array<unknown> | CallbackFunction,
    ): Promise<EthereumResponse> | void {
      if ((method as JsonRpcRequest).method) {
        return this.sendAsync(
          method as JsonRpcRequest,
          params as CallbackFunction,
        );
      } else {
        return this.request({
          method: method as string,
          params: params as Array<unknown>,
        });
      }
    }
    // //deprecated
    sendAsync(data: JsonRpcRequest, callback: CallbackFunction): void {
      const { method, params } = data as EthereumRequest;
      this.request({ method, params })
        .then(res => {
          callback(null, {
            id: data.id,
            jsonrpc: '2.0',
            result: res,
          });
        })
        .catch(err => callback(err));
    }
    handleMessage(msg: string): void {
      handleIncomingMessage(this, msg);
    }
    
  }
  
 
  const injectDocument = (
    options: ProviderOptions,
  ): void => {
    const provider = new Provider(options);
    options
      .sendMessageHandler(
        ProviderName.ethereum,
        JSON.stringify({ method: InternalMethods.getSettings, params: [] }),
      );
  };

  export default injectDocument;