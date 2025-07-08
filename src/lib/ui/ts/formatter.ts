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

export const stringToNumber=(str: string,decimal :number): number =>{
    const num = parseFloat(str);
    return isNaN(num) ? 0 : Number(num.toFixed(decimal));
}

export const hexStringToNumber=(hexString:string): number => {
  // 验证输入是否为字符串且以 '0x' 开头
  if (typeof hexString !== 'string' || !hexString.startsWith('0x')) {
    throw new Error('Input must be a string starting with "0x"');
  }

  // 移除 '0x' 前缀并尝试转换为数字
  const hexValue = hexString.slice(2);
  if (!hexValue.match(/^[0-9a-fA-F]+$/)) {
    throw new Error('Invalid hex string: contains non-hex characters');
  }

  // 使用 parseInt 将十六进制字符串转换为数字
  const number = parseInt(hexValue, 16);

  // 验证转换结果是否有效
  if (isNaN(number)) {
    throw new Error('Failed to convert hex string to number');
  }

  return number;
}

export const hexStringToBigInt=(hexString: string): bigint =>{
  if (typeof hexString !== 'string' || !hexString.startsWith('0x')) {
    throw new Error('Input must be a string starting with "0x"');
  }
  const hexValue = hexString.slice(2);
  if (!hexValue.match(/^[0-9a-fA-F]+$/)) {
    throw new Error('Invalid hex string: contains non-hex characters');
  }
  return BigInt(`0x${hexValue}`);
}

