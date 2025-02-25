export enum ErrorCode {
    InternalError = 'InternalError',
    UnknownRequest = 'UnknownRequest',
    UnknownRequestOrigin = 'UnknownRequestOrigin',
    InvalidMessageFormat = 'InvalidMessageFormat',
    KeypairNotFound = 'KeypairNotFound',
    AccountNotFound = 'AccountNotFound',
  
    KeyringNotInitialized = 'KeyringNotInitialized',
    PasswordIncorrect = 'PasswordIncorrect',
    PasswordRequired = 'PasswordRequired',
    WalletLocked = 'WalletLocked',
    KeyringLocked = 'KeyringLocked',
    AccountNameRequired = 'AccountNameRequired',
    AccountNameUsed = 'AccountNameUsed',
    InvalidMnemonic = 'InvalidMnemonic',
    AccountExisted = 'AccountExisted',
    OriginalHashNotFound = 'OriginalHashNotFound',
  }
  
  export const ErrorCodes = Object.values(ErrorCode) as string[];
  
  export class StandardError extends Error {}
  
  export class AppError extends StandardError {
    code: ErrorCode;
    constructor(errorCode: ErrorCode, message?: string) {
      super(message);
      this.code = errorCode;
    }
  
    get message() {
      return this.code || super.message;
    }
  }
  
  export const getErrorMessage = (error: Error) => {
    if (error instanceof SyntaxError) {
      return ErrorCode.InvalidMessageFormat;
    } else if (error instanceof StandardError) {
      return error.message;
    }
  
    return ErrorCode.InternalError;
  };
  
  export const isAppError = (error: Error) => {
    return error instanceof AppError;
  };
  
  export const isStandardAppError = (error: Error) => {
    return error instanceof StandardError;
  };