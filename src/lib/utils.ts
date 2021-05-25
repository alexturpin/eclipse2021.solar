export const formatCurrency = (value: number, locale: string) =>
  value
    .toLocaleString(locale, {
      style: "currency",
      currency: "CAD",
      currencyDisplay: "symbol",
    })
    .replace(/CAD?/, "") // currencyDisplay: "narrowSymbol" not supported by iOS Safari

export type Locale = "en-CA" | "fr-CA"
