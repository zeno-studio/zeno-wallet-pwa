import { jsonrpc } from 'micro-ftch';
import { Web3Provider } from 'micro-eth-signer/net';

const RPC_URL = 'https://westend-asset-hub-eth-rpc.polkadot.io';
export const jsonP1 = new Web3Provider(jsonrpc(fetch, RPC_URL));
