const SEPARATOR = '...';

export const shortenAccountId = (name: string, startChars = 8, endChars = 2) => {
  const numOfRemainingChars = startChars + endChars + SEPARATOR.length;
  const isOutOfScope = name.length < numOfRemainingChars;
  const isInvalidCharCount = startChars < 1 || endChars < 1;
  if (isOutOfScope || isInvalidCharCount) {
    return name;
  }

  return `${name.slice(0, startChars)}${SEPARATOR}${name.slice(name.length - endChars)}`;
};

export const shortenAddress4 = (address: string, startChars = 6, endChars = 4) => {
  return `${address.slice(0, startChars)}${SEPARATOR}${address.slice(address.length - endChars)}`;
};

export const shortenAddress6 = (address: string, startChars = 8, endChars = 6) => {
  return `${address.slice(0, startChars)}${SEPARATOR}${address.slice(address.length - endChars)}`;
}

export const trimToLength=(value: string, maxLength: number): string =>{
  if (!value) return ''
  const trimmed = value.trim()
  return trimmed.length > maxLength ? `${trimmed.substring(0, maxLength)}...` : trimmed
}

export const normalizeTextInput=(input: string, toLowerCase = true): string =>{
  // Trim and replace all white spaces with a single space
  const trimmed = input.trim().replace(/\s+/g, ' ')
  return toLowerCase ? trimmed.toLowerCase() : trimmed
}

export const escapeRegExp=(string: string): string  =>{
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const trimOffUrlProtocol = (url: string): string => {
  return url.replace(/https?:\/\//, '');
};


export const getFirstAndLast = (str: string): string => {
  const trimmed = str.trim();
  if (trimmed.length <= 1) return trimmed;
  return trimmed[0] + trimmed[trimmed.length - 1];
}

export const cutString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
}

