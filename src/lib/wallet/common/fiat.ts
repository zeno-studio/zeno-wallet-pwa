import { type Fiat } from '$lib/wallet/common';

export const usd: Fiat = {
	name: 'USD',
	symbol: '$',
	iconPath: '/fiat/usd.svg'
};

const eur: Fiat = {
	name: 'EUR',
	symbol: '€',
	iconPath: '/fiat/eur.svg'
};

const gbp: Fiat = {
	name: 'GBP',
	symbol: '£',
	iconPath: '/fiat/gbp.svg'
};

const jpy: Fiat = {
	name: 'JPY',
	symbol: '¥',
	iconPath: '/fiat/jpy.svg'
};

const cny: Fiat = {
	name: 'CNY',
	symbol: '¥',
	iconPath: '/fiat/cny.svg'
};

const krw: Fiat = {
	name: 'KRW',
	symbol: '₩',
	iconPath: '/fiat/krw.svg'
};

export const rub: Fiat = {
	name: 'RUB',
	symbol: '₽',
	iconPath: '/fiat/rub.svg'
};

export const DefaultFiats = [usd, eur, gbp, jpy, cny, krw];
