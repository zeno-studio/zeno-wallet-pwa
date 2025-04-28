import {
	addElement,
	getElement,
	removeElement,
	DB,
	type Account,
	type Vault,
	type WalletBackupData,
	type AddressEntry,
} from '$lib/wallet/common';
import { accountState } from '$lib/wallet/runes';
import { bytesToHex, hexToBytes } from '@noble/ciphers/utils';


export const resetWallet = async (): Promise<void> => {
	removeElement(DB.Vault.name, 'all');
};

export const backupWallet = async (): Promise<string> => {
	const vaults = (await getElement(DB.Vault.name, 'all')) as Vault[];
	const accounts = (await getElement(DB.Account.name, 'all')) as Account[];
	const addressBook = (await getElement(DB.AddressBook.name, 'all')) as AddressEntry[];
	const History = (await getElement(DB.History.name, 'all')) as History[];
	const settings = localStorage.getItem('settings');
	const backup = JSON.stringify({
		vaults,
		accounts,
		addressBook,
		History,
		settings
	});
	return backup;
};

export const restoreWallet = async (backup: string) => {
	const data = JSON.parse(backup) as WalletBackupData;
	for (const vault of data.vaults) {
		addElement(DB.Vault.name, vault);
	}
	for (const account of data.accounts) {
		addElement(DB.Account.name, account);
	}
	for (const addressBook of data.addressBook) {
		addElement(DB.AddressBook.name, addressBook);
	}
	for (const history of data.History) {
		addElement(DB.History.name, history);
	}
	localStorage.setItem('settings', JSON.stringify(data.settings));
};


export const exportKeystoreV1 = async (vaultName: "EVM" | "POLKADOT"): Promise<string | null> => {
	const vault = (await getElement(DB.Vault.name, vaultName)) as Vault;
    if (!vault) return null;
    const  key = vault.salt.concat(vault.ciphertext);
    return key;
};

function downloadKeystore(keystore: string) {
    const jsonString = JSON.stringify(keystore, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `custom-keystore-${Date.now()}.json`; 
}

function decodeVault(input: string): { salt: string; ciphertext: string } {
    const salt = input.slice(0, 32);
    const ciphertext = input.slice(32);
    return { salt, ciphertext };
  }


  function convertToJsonFile(salt: Uint8Array, ciphertext: Uint8Array, filename: string = 'encrypted.json'): void {
    // 验证输入
    if (!(salt instanceof Uint8Array) || !(ciphertext instanceof Uint8Array)) {
        throw new Error('salt and ciphertext must be Uint8Array');
    }

    const jsonData = {
        salt: bytesToHex(salt),
        ciphertext: bytesToHex(ciphertext)
    };

    // 转换为 JSON 字符串
    const jsonString = JSON.stringify(jsonData, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	// 触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function parseJsonFile(file: File): Promise<{ salt: Uint8Array, ciphertext: Uint8Array }> {
    // 验证文件类型
    if (!file.type.includes('json')) {
        throw new Error('File must be a JSON file');
    }

    // 读取文件内容
    const text = await file.text();

    // 解析 JSON
    let jsonData: { salt: string; ciphertext: string };
    try {
        jsonData = JSON.parse(text);
    } catch {
        throw new Error('Invalid JSON format');
    }

    // 验证 JSON 结构
    if (typeof jsonData.salt !== 'string' || typeof jsonData.ciphertext !== 'string') {
        throw new Error('JSON must contain salt and ciphertext as strings');
    }

    // 验证 hex 字符串格式
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(jsonData.salt) || !hexRegex.test(jsonData.ciphertext)) {
        throw new Error('Salt or ciphertext contains invalid hex characters');
    }
    if (jsonData.salt.length % 2 !== 0 || jsonData.ciphertext.length % 2 !== 0) {
        throw new Error('Salt or ciphertext hex string length must be even');
    }

    // 转换为 Uint8Array
    const salt = new Uint8Array(jsonData.salt.length / 2);
    const ciphertext = new Uint8Array(jsonData.ciphertext.length / 2);

    for (let i = 0; i < salt.length; i++) {
        salt[i] = parseInt(jsonData.salt.slice(i * 2, i * 2 + 2), 16);
    }
    for (let i = 0; i < ciphertext.length; i++) {
        ciphertext[i] = parseInt(jsonData.ciphertext.slice(i * 2, i * 2 + 2), 16);
    }

    return { salt, ciphertext };
}

const fileInput = document.getElementById('fileInput') as HTMLInputElement;

fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) {
        console.error('No file selected');
        return;
    }

    try {
        const { salt, ciphertext } = await parseJsonFile(file);
        console.log('Salt:', salt); // Uint8Array(32) [1, 1, ..., 1]
        console.log('Ciphertext:', ciphertext); // Uint8Array(64) [2, 2, ..., 2]
    } catch (error) {
        console.error(error.message);
    }
});