import { useTranslation, Trans } from "next-i18next"
import { EclipseDetails } from "./EclipseDetails"
import { Heading } from "./Heading"

export const Info = () => {
  const { t } = useTranslation()

  return (
    <div className="eclipse-details container mx-auto px-6 md:px-2">
      <Heading>{t("what")}</Heading>
      <p>
        <Trans i18nKey="what-details" />
      </p>

      <Heading>{t("where-when")}</Heading>
      <EclipseDetails />

      <Heading>{t("how")}</Heading>
      <Trans
        i18nKey="how-details"
        components={{
          aas: (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
              className="underline hover:no-underline"
              href="https://eclipse.aas.org/resources/solar-filters"
              target="_blank"
              rel="noreferrer"
            />
          ),
        }}
      />
    </div>
  )
}
