import { DB} from '$lib/wallet/common';


let db: IDBDatabase;
export function initDB() {
	const request = indexedDB.open('ZenoDB', 1);
	request.onupgradeneeded = () => {
		const db = request.result;
		if (!db.objectStoreNames.contains(DB.Vault.name)) {
			db.createObjectStore(DB.Vault.name, { keyPath: DB.Vault.keypath });
		}
        if (!db.objectStoreNames.contains(DB.Account.name)) {
			db.createObjectStore(DB.Account.name, { keyPath: DB.Account.keypath });
		}
        if (!db.objectStoreNames.contains(DB.History.name)) {
			db.createObjectStore(DB.History.name, { keyPath: DB.History.keypath });
		}
        if (!db.objectStoreNames.contains(DB.AddressBook.name)) {
            db.createObjectStore(DB.AddressBook.name, {keyPath: DB.AddressBook.keypath});
        }
	};
	request.onsuccess = () => db = request.result;
	request.onerror = (err) => console.error(`IndexedDB error: ${request.error}`, err);
}

export const addElement = (store: string, data:object) => {
    const open = indexedDB.open('ZenoDB', 1);
    open.onsuccess = () => {
        db = open.result;
            const transaction = db.transaction(store, 'readwrite');
            const objectStore = transaction.objectStore(store);
            const request = objectStore.add(data);
            request.onerror = () => console.error(request.error);
            transaction.oncomplete = () => console.log('data added successfully');
    };
};

export const editElement =(store: string, data:object) => {
    const open = indexedDB.open('ZenoDB', 1);
    open.onsuccess = () => {
        db = open.result;
            const transaction = db.transaction(store, 'readwrite');
            const objectStore = transaction.objectStore(store);
            const request = objectStore.put(data);
            request.onerror = () => console.error(request.error);
            transaction.oncomplete = () => console.log('data edited successfully');
    };
};


export const getElement = (store: string, key: string | number) => {
    const open = indexedDB.open('ZenoDB', 1);
    return new Promise((resolve) => {
        open.onsuccess = () => {
            let request!: IDBRequest;
            db = open.result;
            const transaction = db.transaction(store);
                const objectStore = transaction.objectStore(store);
                if (key === 'all') request = objectStore.getAll();
                else request = objectStore.get(key);
                request.onerror = () => resolve(null);
                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result !== undefined ? result : null); 
                  };;       
        };
    });
};


export const removeElement = (store: string, key: string|number) => {
    const open = indexedDB.open('ZenoDB', 1);
    open.onsuccess = () => {
        let request: IDBRequest;
        db = open.result;
        const transaction = db.transaction(store, 'readwrite');
        const objectStore = transaction.objectStore(store);
        if (key === 'all') request = objectStore.clear();
        else request = objectStore.delete(key);
        request.onerror = () => console.error(request.error);
    };
};


//https://github.com/falcosan/TS_IndexedDB/blob/main/db/index.ts