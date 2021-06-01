import { useTranslation } from "next-i18next"
import Link from "next/link"

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <span className="absolute top-2 right-2 w-10 py-3 z-50 text-center font-semibold rounded-md text-xs text-white uppercase bg-purple-dark tracking-widest">
      {i18n.language === "en-CA" && (
        <Link href="/" locale="fr-CA">
          <a>FR</a>
        </Link>
      )}
      {i18n.language === "fr-CA" && (
        <Link href="/" locale="en-CA">
          <a>EN</a>
        </Link>
      )}
    </span>
  )
}
