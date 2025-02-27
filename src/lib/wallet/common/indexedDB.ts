
let db: IDBDatabase;
export function initDB() {
	const request = indexedDB.open('userData', 1);
	request.onupgradeneeded = () => {
		const db = request.result;
		if (!db.objectStoreNames.contains('legacyVault')) {
			db.createObjectStore('legacyVault', { keyPath: 'vaultId' });
		}
        if (!db.objectStoreNames.contains('accountList')) {
			db.createObjectStore('accountList', { keyPath: 'accountIndex' });
		}
        if (!db.objectStoreNames.contains('chains')) {
            db.createObjectStore('chains', {keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains('historyRecords')) {
			db.createObjectStore('historyRecords', { keyPath: 'address' });
		}
        if (!db.objectStoreNames.contains('addressBook')) {
            db.createObjectStore('addressBook', {keyPath: 'name' });
        }
	};
	request.onsuccess = () => db = request.result;
	request.onerror = (err) => console.error(`IndexedDB error: ${request.error}`, err);
}

export const addElement = (store: string, data:object) => {
    const open = indexedDB.open('userData', 1);
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
    const open = indexedDB.open('userData', 1);
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
    const open = indexedDB.open('userData', 1);
    return new Promise((resolve, reject) => {
        open.onsuccess = () => {
            let request!: IDBRequest;
            db = open.result;
            const transaction = db.transaction(store);
                const objectStore = transaction.objectStore(store);
                if (key === 'all') request = objectStore.getAll();
                else request = objectStore.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);       
        };
    });
};


export const removeElement = (store: string, key: string|number) => {
    const open = indexedDB.open('userData', 1);
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