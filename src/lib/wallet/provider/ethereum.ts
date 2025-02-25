import { VERSION} from "$lib/wallet/common";
import { ProviderName,
 type ProviderOptions,
  ProviderType,
  type SendMessageHandler,
  type EthereumRequest,
  type EthereumResponse,
  type JsonRpcRequest,
  type CallbackFunction,
  InternalMethods,
  type SettingsType,
} from "$lib/wallet/provider/type";


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
    async request(request: EthereumRequest): Promise<EthereumResponse> {
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