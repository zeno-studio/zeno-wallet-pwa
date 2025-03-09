import {type Account} from "$lib/wallet/common";
export function isLockedNow() {
    return new Promise<boolean>((resolve) => {
      const messageHandler = (event) => {
        if (event.data.method === 'isLocked') {
          resolve(event.data.isLocked);
          self.removeEventListener('message', messageHandler);
        }
      };
      self.addEventListener('message', messageHandler);
      self.postMessage({ method: 'isLocked' });
    });
  }
  

  export function autoLock(password: string): Promise<{ islocked: boolean; timeout: number }> {
    return new Promise((resolve) => {
      const messageHandler = (event) => {
        self.removeEventListener('message', messageHandler);
        resolve(event.data); //
      };
      self.addEventListener('message', messageHandler);
      self.postMessage({ method: 'lockAfter', password});
    });
  }
  
  
  export function signTransaction(argus: any): Promise<string> {
    return new Promise<string>((resolve) => {
      const messageHandler = (event) => {
        if (event.data.method === 'sign') {
          resolve(event.data.signedTx);
          self.removeEventListener('message', messageHandler);
        }
      };
      self.addEventListener('message', messageHandler);
      self.postMessage({ method:'signEvmTx', argus});
    });
  }

  