import { Locale } from "./types"
import { i18n } from "../../next-i18next.config"

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
