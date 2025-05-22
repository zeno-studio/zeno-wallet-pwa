
export const DB = {
  Vault:{
    name: 'Vault',
    keypath: 'name'
  },
  Account: {
    name: 'Account',
    keypath: "accountIndex"
  },
  History: {
    name: 'HistoryRecords',
    keypath: 'address'
  },
  AddressBook: {
    name: 'AddressBook',
    keypath: 'address'
  },
  Chains: {
    name: 'Chains',
    keypath: 'chainId'
  }
  
}


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
        if (!db.objectStoreNames.contains(DB.Chains.name)) {
			db.createObjectStore(DB.Chains.name, {keyPath: DB.Chains.keypath});
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
     open.onerror = () => {
            console.error('IndexedDB open failed:', open.error);
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
     open.onerror = () => {
            console.error('IndexedDB open failed:', open.error);
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
            };       
        };
        open.onerror = () => {
            console.error('IndexedDB open failed:', open.error);
            resolve(null);
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
    open.onerror = () => {
            console.error('IndexedDB open failed:', open.error);
    };
};

export const resetDB = async (): Promise<boolean> => {
    if (db) {
        db.close();
        console.log('ZenoDB connection closed');
      }
    try {
      const request = indexedDB.deleteDatabase('ZenoDB');
        return new Promise<boolean>((resolve) => {
        request.onsuccess = () => {
          console.log('ZenoDB and LocalStorage cleared successfully');
          resolve(true);
        };
        request.onerror = () => {
          console.error('Failed to delete ZenoDB:', request.error);
          resolve(false);
        };
        request.onblocked = () => {
          console.warn('Database deletion blocked. Ensure all connections to ZenoDB are closed.');
          resolve(false);
        };
      });
    } catch (error) {
      console.error('Error resetting storage:', error);
      return false;
    }
  };


//https://github.com/falcosan/TS_IndexedDB/blob/main/db/index.ts