const CURRENCY_SYMBOLS = { USD: "$", EUR: "€", GBP: "£", PKR: "Rs " };

export function formatCurrency(amount, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  return `${symbol}${Number(amount).toFixed(2)}`;
}