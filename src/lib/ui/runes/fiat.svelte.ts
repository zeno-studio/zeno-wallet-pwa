import {type Fiat} from '$lib/wallet/common';

const usd :Fiat = {
    name: "USD",
    symbol: "$",
    iconPath: "/fiat/usd.svg",
}

const eur :Fiat = {
    name: "EUR",
    symbol: "€",
    iconPath: "/fiat/eur.svg",
}

const gbp :Fiat = {
    name: "GBP",
    symbol: "£",
    iconPath: "/fiat/gbp.svg",
}

const jpy :Fiat = {
    name: "JPY",
    symbol: "¥",
    iconPath: "/fiat/jpy.svg",
}

const cny :Fiat = {
    name: "CNY",
    symbol: "¥",
    iconPath: "/fiat/cny.svg",
}

const krw :Fiat = {
    name: "KRW",
    symbol: "₩",
    iconPath: "/fiat/krw.svg",
}

const rub :Fiat = {
    name: "RUB",
    symbol: "₽",
    iconPath: "/fiat/rub.svg",
}

export const defaultFiats = new Set<Fiat> ([
    usd,
    eur,
    gbp,    
    jpy,
    cny,
    krw,
    rub,
])

export type editFiatType = "add" | "delete";

export const Fiats =  () => {
    let currentFiat = $state<Fiat>(usd);
    return {
        currentFiat,
        setCurrentFiat(setFiat: Fiat) {
            currentFiat = setFiat;
        }
    }
}
