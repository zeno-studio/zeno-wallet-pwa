import {
	addElement,
	getElement,
	removeElement,
	DB,
    type keystore,
	type Account,
	type Vault,
	type WalletBackupData,
	type AddressEntry,
} from '$lib/wallet/common';
import { accountState } from '$lib/wallet/runes';

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


export const exportKeystoreV1 = async (vaultName: "EVM" | "POLKADOT"): Promise<keystore | undefined> => {
	const vault = (await getElement(DB.Vault.name, vaultName)) as Vault;
	let key:keystore | undefined;
    
    if (vaultName === "EVM") {
        const account = (await getElement(DB.Account.name, 1)) as Account;
        key =  {
            version: 3,
            id: vault.uuid,
            address: account.address,
            crypto: {
                cipher: 'XChaCha20-Poly1305-managedNonce',
                ciphertext: vault.ciphertext,
                cipherparams: { iv: '' },
                kdf: 'scrypt',
                kdfparams: {
                    n: 65536,
                    r: 8,
                    p: 1,
                    dklen: 32,
                    salt: vault.salt,
                },
                mac: '',
            }
        };
    } else if (vaultName === "POLKADOT") {
        const account = (await getElement(DB.Account.name, 101)) as Account;
        key =  {
            version: 3,
            id: vault.uuid,
            address: account.address,
            crypto: {
                cipher: 'XChaCha20-Poly1305-managedNonce',
                ciphertext: vault.ciphertext,
                cipherparams: { iv: '' },
                kdf: 'scrypt',
                kdfparams: {
                    n: 65536,
                    r: 8,
                    p: 1,
                    dklen: 32,
                    salt: vault.salt,
                },
                mac: '',
            }
        };
    }
    
    return key;
};

function downloadKeystore(keystore: keystore) {
    const jsonString = JSON.stringify(keystore, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `custom-keystore-${Date.now()}.json`; 
}