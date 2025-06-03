import { type Fiat } from '../common';

export const usd: Fiat = {
	name: 'USD',
	symbol: '$',
};

const eur: Fiat = {
	name: 'EUR',
	symbol: '€',
};

const gbp: Fiat = {
	name: 'GBP',
	symbol: '£',
};

const jpy: Fiat = {
	name: 'JPY',
	symbol: '¥',
};

const cny: Fiat = {
	name: 'CNY',
	symbol: '¥',
};

const krw: Fiat = {
	name: 'KRW',
	symbol: '₩',
};

export const rub: Fiat = {
	name: 'RUB',
	symbol: '₽',
};


export const DefaultFiats = [usd, eur, gbp, jpy, cny, krw];



