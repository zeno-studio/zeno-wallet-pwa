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

export const stringParseFloat=(str: string): number =>{
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
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

export const timeAgo=(timestamp: number): string =>{
   try {
    const pastTime = new Date(timestamp * 1000);
    if (isNaN(pastTime.getTime())) {
      return "Invalid timestamp";
    }
    const now = new Date();
    const deltaMs = now.getTime() - pastTime.getTime();
    const secondsPerMinute = 60;
    const secondsPerHour = secondsPerMinute * 60;
    const secondsPerDay = secondsPerHour * 24;
    const secondsPerMonth = secondsPerDay * 30; 
    const secondsPerYear = secondsPerDay * 365; 

    const totalSeconds = Math.floor(deltaMs / 1000);

    if (totalSeconds < 0) {
      return "Future timestamp";
    }

    if (totalSeconds >= secondsPerYear) {
      const years = Math.floor(totalSeconds / secondsPerYear);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (totalSeconds >= secondsPerMonth) {
      const months = Math.floor(totalSeconds / secondsPerMonth);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (totalSeconds >= secondsPerDay) {
      const days = Math.floor(totalSeconds / secondsPerDay);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (totalSeconds >= secondsPerHour) {
      const hours = Math.floor(totalSeconds / secondsPerHour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (totalSeconds >= secondsPerMinute) {
      const minutes = Math.floor(totalSeconds / secondsPerMinute);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${totalSeconds} second${totalSeconds !== 1 ? "s" : ""} ago`;
    }
  } catch (error) {
    return "Invalid timestamp";
  }
}

type ColorSet = {
  background: string;
  color: string;
}


export const getRandomColor=(set: ColorSet[] ) =>{
  if (!set || set.length > 0) {
 const randomIndex = Math.floor(Math.random() * set.length);
  return set[randomIndex];
  }
 
}


export const colorSets:ColorSet[] = [
  {background: 'rgba(241, 186, 0, 0.1)', color: 'rgba(255, 182, 72, 1)'},
  {background: 'rgba(18, 205, 217, 0.1)', color : 'rgba(18, 205, 217, 1)'},
  {background: 'rgba(34, 176, 125, 0.1)', color : 'rgba(34, 176, 125, 1)'},
  {background: 'rgba(181, 72, 198, 0.1)', color : 'rgba(181, 72, 198, 1)'},
  {background: 'rgba(50, 167, 226, 0.1)', color : 'rgba(50, 167, 226, 1)'},
  {background: 'rgba(253, 86, 141, 0.1)', color : 'rgba(253, 86, 141, 1)'},
  {background: 'rgba(255, 135, 0, 0.1)', color : 'rgba(255, 135, 0, 1)'},
]


export const decimalAdjust = (type: 'round' | 'floor' | 'ceil', value: number, exp: number) => {
  if (!["round", "floor", "ceil"].includes(type)) {
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'.",
    );
  }
  exp = Number(exp);
  value = Number(value);
  if (exp % 1 !== 0 || Number.isNaN(value)) {
    return NaN;
  } else if (exp === 0) {
    return Math[type](value);
  }
  const [magnitude, exponent = "0"] = value.toString().split("e");
  const adjustedValue = Math[type](Number(`${magnitude}e${Number(exponent) - exp}`));
  // Shift back
  const [newMagnitude, newExponent = "0"] = adjustedValue.toString().split("e");
  return Number(`${newMagnitude}e${Number(newExponent) + exp}`);
}