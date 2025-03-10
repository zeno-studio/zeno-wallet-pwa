import Signer from '$lib/wallet/common/signer.ts?worker'


export const signer = new Signer();
export type signerResponseType = {
  success: boolean,
  data?: any,
  error?:string
}

export type signerRequestType = {
  method: string,
  argus?: any
}

export function isLockedNow() {
    signer.postMessage({ method: 'isLocked' });
}
  
export function setTime(time: number) {
  signer.postMessage({ method: 'setTime', argus: {time: time} });
}

export function queryTime() {
  signer.postMessage({ method: 'queryTime' });
}


  export function autoLock(password: string) {
    signer.postMessage({ method: 'autoLock', argus: {password: password} });
  }
  
  
  export function signTransaction(argus: any) {
    signer.postMessage({ method:'signEvmTx', argus});
  }

  