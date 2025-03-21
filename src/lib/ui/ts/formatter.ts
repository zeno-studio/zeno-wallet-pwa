const SEPARATOR = '...';

export const shortenAccountId = (name: string, startChars = 8, endChars = 2) => {
    const numOfRemainingChars = startChars + endChars + SEPARATOR.length;
    const isOutOfScope = name.length < numOfRemainingChars ;
    const isInvalidCharCount = startChars < 1 || endChars < 1;
    if (isOutOfScope || isInvalidCharCount) {
        return name;
    }

    return `${name.slice(0, startChars)}${SEPARATOR}${name.slice(name.length - endChars)}`;
};

export const shortenAddress = (address: string, startChars = 6, endChars = 4) => {
    return `${address.slice(0, startChars)}${SEPARATOR}${address.slice(address.length - endChars)}`;
};

export function trimToLength(value: string, maxLength: number): string {
    if (!value) return ''
    const trimmed = value.trim()
    return trimmed.length > maxLength ? `${trimmed.substring(0, maxLength)}...` : trimmed
  }
  
  export function normalizeTextInput(input: string, toLowerCase = true): string {
    // Trim and replace all white spaces with a single space
    const trimmed = input.trim().replace(/\s+/g, ' ')
    return toLowerCase ? trimmed.toLowerCase() : trimmed
  }
  
  export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }


  export const shortenAddress2 = (address: string): string => {
    if (!address) {
      return '';
    }
  
    const length = address.length;
    if (length <= 15) {
      return address;
    }
  
    return `${address.substring(0, 6)}...${address.substring(length - 6, length)}`;
  };
  
  export const trimOffUrlProtocol = (url: string): string => {
    return url.replace(/https?:\/\//, '');
  };
  
  export const trimTrailingSlash = (input: string): string => {
    return input.endsWith('/') ? trimTrailingSlash(input.slice(0, -1)) : input;
  };
  
