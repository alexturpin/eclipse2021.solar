import { useTranslation } from "next-i18next"
import Image from "next/image"

export const Header = () => {
  const { t, i18n } = useTranslation()

  return (
    <header className="w-full gradient">
      <div className="h-eclipse md:h-eclipse-md relative overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-eclipse h-eclipse md:w-eclipse-md md:h-eclipse-md">
          <Image src={`/images/${i18n.language}/eclipse.png`} alt="" layout="fill" />
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-2">
        <h1 className="hidden">{t("title")}</h1>
        <h3 className="hidden">{t("date")}</h3>

        {/*
          <p className="text-center mb-6 text-sm leading-loose md:-mt-16 -mt-14">{t("intro-1")}</p>
          <p className="text-center mb-6 text-sm leading-loose">{t("intro-2")}</p>
          <p className="text-center mb-14 text-sm leading-loose">{t("intro-3")}</p>
        */}
      </div>
    </header>
  )
}
