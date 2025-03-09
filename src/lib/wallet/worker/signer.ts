import { getElement,dbStore, type LegacyVault, type Account} from "$lib/wallet/common";
import { scrypt } from '@noble/hashes/scrypt';
import { bytesToHex, hexToBytes } from '@noble/ciphers/utils';
import { randomBytes, managedNonce } from '@noble/ciphers/webcrypto';
import { xchacha20poly1305 as xchacha } from '@noble/ciphers/chacha';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { Transaction, weigwei ,addr} from 'micro-eth-signer';
import * as typed from 'micro-eth-signer/typed-data';

let isLocked = false;
let timeout = 1000*60*15;
const psReplacer = hexToBytes("0000000000000000000000000000000000000000000000000000000000000000")
let midpass = psReplacer;
self.onmessage = ({ data }) => {
  switch (data.method) {
    case 'isLocked':
      postMessage({ method: 'isLocked', isLocked: isLocked });
      break;
    case 'setTime':
      setTime(data.argus.time);
      break;
    case 'autoLock':
      autoLock(data.argus.password);
      break;
    case 'signEvmTx':
      signEvmTx(data.argus.tx, data.argus.account, data.argus.password);
      break;
    default:
      throw new Error(`Unknown method: ${data.method}`);
  }
};

function setTime(time: number) {
    timeout = time;
    self.postMessage(timeout);
}

function autoLock(password:string) {
    creatMidpass(password);
    setTimeout(() => {
      isLocked = true;
      midpass = psReplacer;
    }, timeout);
    self.postMessage({isLocked ,timeout});
}

const creatMidpass =  async (password: string) => {
    const store = await getElement(dbStore.Vault.name, 'default') as LegacyVault | null;
    let salt:Uint8Array
    if (store) {
        salt = hexToBytes(store.salt) 
        midpass = scrypt(password, salt, { N: 2 ** 16, r: 8, p: 1, dkLen: 32 });
    } 
}

async function signEvmTx(tx:any,account:Account,password:string) {
  if (isLocked && password === "") {
    postMessage({ method: 'signEvmTxError', data: "Wallet is locked and password is empty" });
  }
  if (isLocked && password !== "") {
    autoLock (password);
    const store = await getElement(dbStore.Vault.name, 'default') as LegacyVault | null;
    if (store) {
      const phrase = midpass;
      const chacha = managedNonce(xchacha)(phrase);
      const ent = chacha.decrypt(hexToBytes(store.ciphertext));
      const mn = bip39.entropyToMnemonic(ent, wordlist);
      const hdKey_ = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mn));
      const hdKey = hdKey_.derive(account.derivePath);
      const privateKey = hdKey.privateKey;
      const publicKey = hdKey.publicKey;
      if (privateKey && publicKey && account.address === addr.fromPublicKey(publicKey)) {
      const Tx = Transaction.prepare({
        to: tx.to,
        value: tx.value,      nonce: tx.nonce,
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        data: tx.data
      })
      const signedTx = Tx.signBy(privateKey).toHex();
      postMessage(signedTx );
 
    }
      
  }
  }
}


