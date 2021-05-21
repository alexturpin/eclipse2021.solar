export const formatCurrency = (value: number, locale: string) =>
  value.toLocaleString(locale, {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
  })

export type Locale = "en-CA" | "fr-CA"
