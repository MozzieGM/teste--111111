import { exchangeRates } from './bolivia-data';

export type Currency = 'BOB' | 'BRL' | 'USD';

export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;
  
  // Convert to BOB first if needed
  let bobAmount = amount;
  if (from === 'BRL') {
    bobAmount = amount * exchangeRates.BRL_BOB;
  } else if (from === 'USD') {
    bobAmount = amount * exchangeRates.USD_BOB;
  }
  
  // Convert from BOB to target currency
  if (to === 'BRL') {
    return bobAmount / exchangeRates.BRL_BOB;
  } else if (to === 'USD') {
    return bobAmount / exchangeRates.USD_BOB;
  }
  
  return bobAmount;
}

export function getBRLRange(bobAmount: number): { min: number; max: number } {
  return {
    min: bobAmount / exchangeRates.BRL_BOB_MAX,
    max: bobAmount / exchangeRates.BRL_BOB_MIN
  };
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbols = { BOB: 'Bs.', BRL: 'R$', USD: 'US$' };
  const locales = { BOB: 'es-BO', BRL: 'pt-BR', USD: 'en-US' };
  
  return `${symbols[currency]} ${amount.toLocaleString(locales[currency], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols = { BOB: 'Bs.', BRL: 'R$', USD: 'US$' };
  return symbols[currency];
}
