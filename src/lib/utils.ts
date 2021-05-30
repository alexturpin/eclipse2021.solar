import { Locale } from "./types"
import { i18n } from "../../next-i18next.config"

export const formatCurrency = (value: number, locale: string) =>
  value
    .toLocaleString(locale, {
      style: "currency",
      currency: "CAD",
      currencyDisplay: "symbol",
    })
    .replace(/CAD?/, "") // currencyDisplay: "narrowSymbol" not supported by iOS Safari

const localeMap: Record<string, Locale> = {
  "en-CA": "en-CA",
  "fr-CA": "fr-CA",
  en: "en-CA",
  fr: "fr-CA",
}

const defaultLocale = i18n.defaultLocale as Locale

export const normalizeLocale = (rawLocale: string | undefined): Locale => {
  if (!rawLocale) return defaultLocale
  return localeMap[rawLocale] ?? defaultLocale
}
