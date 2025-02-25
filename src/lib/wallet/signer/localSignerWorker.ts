import { initAccount, encryptcacheKey } from '$lib/wallet/common/account';

let startTime: number = 0;
let db: IDBDatabase | null = null;
let phrase: Uint8Array;
let nonce: Uint8Array;

// 打开数据库
const request = window.indexedDB.open('userData', 1);

request.onupgradeneeded = function (event) {
	const db = (event.target as IDBOpenDBRequest).result;

	// 如果数据库版本升级，创建或修改对象存储
	if (!db.objectStoreNames.contains('accountStore')) {
		db.createObjectStore('accountStore', { keyPath: 'id', autoIncrement: true });
	}

	if (!db.objectStoreNames.contains('cacheKeystore')) {
		db.createObjectStore('cacheKeystore', { keyPath: 'id', autoIncrement: true });
	}
};

request.onsuccess = function (event) {
	db = (event.target as IDBOpenDBRequest).result;
	self.postMessage({ type: 'dbReady' }); // 通知主线程数据库已准备好
};

request.onerror = function (event) {
	self.postMessage({ type: 'dbError', error: (event.target as IDBOpenDBRequest).error });
};

self.onmessage = function (event) {
	if (!db) {
		self.postMessage({ type: 'dbNotReady', error: 'Database not yet available' });
		return;
	}

	if (event.data.type === 'initialAccount') {
		const password = event.data.data as string;
		const [store, ent] = initAccount(password);
		if (!store || !ent) {
			self.postMessage({ type: 'initialResult', result: 'failed' });
			return;
		}
		const cache = encryptcacheKey(ent);
		if (!cache || !cache.phrase || !cache.nonce || !cache.cacheMn) {
			self.postMessage({ type: 'initialResult', result: 'failed' });
			return;
		}
		if (cache.phrase && cache.nonce && cache.cacheMn) {
			phrase = cache.phrase;
			nonce = cache.nonce;
      const mn =cache.cacheMn
			const transaction = db.transaction(['accountStore', 'cacheKeystore'], 'readwrite');
			const objectStore = transaction.objectStore('accountStore');
			objectStore.put({ id: 1, store, mn }); // 假设我们用id来区分不同的数据
			transaction.oncomplete = function () {
				startTime = Date.now();
				self.postMessage({ type: 'initialResult', result: 'success' });
				self.postMessage({ type: 'keyValid' });
			};
			transaction.onerror = function (event) {
				self.postMessage({ type: 'dbError', error: (event.target as IDBOpenDBRequest).error });
			};
		}
	}

	if (event.data.type === 'check') {
		if (Date.now() - startTime >= 900000) {
			// 15分钟
			clearCacheKey();
			self.postMessage({ type: 'keyExpired' });
		} else {
			self.postMessage({ type: 'keyStillValid' });
		}
	}
};

function clearCacheKey() {

	if (!db) {
		self.postMessage({ type: 'dbNotReady', error: 'Database not yet available' });
		return;
	}
	const transaction = db.transaction(['cacheKeystore'], 'readwrite');
	const cacheKeystore = transaction.objectStore('cacheKeystore');
	cacheKeystore.clear();
	transaction.oncomplete = function () {
		self.postMessage({ type: 'cacheCleared' });
	};
	transaction.onerror = function (event) {
		self.postMessage({ type: 'dbError', error: (event.target as IDBOpenDBRequest).error });
	};
}
