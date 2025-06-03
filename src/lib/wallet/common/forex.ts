
import {OPENEXCHANGERATES_API_KEY} from '$lib/wallet/common';
import {type FiatRate } from '$lib/wallet/common';

export const getForex= async()=>{
    const url = `https://openexchangerates.org/api/latest.json?app_id=${OPENEXCHANGERATES_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const rate:FiatRate ={
        EUR:json.rates.EUR,
	GBP:json.rates.GBP,
	JPY:json.rates.JPY,
	CNY:json.rates.CNY,
	KRW:json.rates.KRW,
	RUB:json.rates.RUB,
    }
    return rate
  } catch (error:any) {
    console.error(error.message);
  }
}
