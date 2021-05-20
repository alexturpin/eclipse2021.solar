export const formatCurrency = (value: number, locale: string) =>
  value.toLocaleString(locale, {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
  })
