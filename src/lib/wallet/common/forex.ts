import { OPENEXCHANGERATES_API_KEY } from '$lib/wallet/common';
import { type FiatRate } from '$lib/wallet/common';
import { generalState } from '$lib/wallet/runes';

// 初始化 WebSocket 连接
let socket;
let isConnected = false;
let reconnectAttempts = 0;
let maxReconnectAttempts = 5;
let reconnectInterval = 1000; // 初始重连间隔（毫秒）
export const forexWs = () => {
	socket = new WebSocket('wss://ws1.0x8801.top/ws?x-api-key=zenowallet-forex-1');

	// 连接成功
	socket.onopen = () => {
		isConnected = true;
		reconnectAttempts = 0; // 重置重连计数
		reconnectInterval = 1000; // 重置重连间隔
		console.log('Connected to WebSocket server');
	};

	// 接收消息
	socket.onmessage = (event) => {
		try {
			const forexData = JSON.parse(event.data);

			generalState.fiatRate = {
				timestamp: forexData.data.timestamp,
				EUR: forexData.data.rates.EUR,
				GBP: forexData.data.rates.GBP,
				JPY: forexData.data.rates.JPY,
				CNY: forexData.data.rates.CNY,
				KRW: forexData.data.rates.KRW,
				RUB: forexData.data.rates.RUB
			};
			// console.log('Forex Data:', generalState.fiatRate);
		} catch (error) {
			console.error('Error parsing message:', error);
		}
	};

	// 错误处理
	socket.onerror = (error) => {
		console.error('WebSocket error:', error);
		isConnected = false;
	};

	// 连接关闭
	socket.onclose = () => {
		isConnected = false;
		attemptReconnect();
		console.log('WebSocket connection closed');
	};
};

function attemptReconnect() {
	if (reconnectAttempts < maxReconnectAttempts) {
		reconnectAttempts += 1;

		setTimeout(() => {
			forexWs();
		}, reconnectInterval);

		reconnectInterval *= 2;
	} else {
		console.error('Max reconnect attempts reached. Giving up.');
		isConnected = false;
	}
}

export const updateCurrencyPirce = async () => {
	const res = await fetch(
		'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","DOTUSDT"]'
	);
	const data = await res.json();
	generalState.currencyPrice = {
		timestamp: Date.now(),
		BTC: parseFloat(data[0].price),
		ETH: parseFloat(data[1].price),
		DOT: parseFloat(data[2].price)
	};
	// console.log(generalState.currencyPrice);
};
