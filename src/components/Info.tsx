import { useTranslation, Trans } from "next-i18next"
import { Heading, EclipseDetails } from "./"

export const Info = () => {
  const { t } = useTranslation()

  return (
    <div className="eclipse-details container mx-auto px-6 md:px-2">
      <Heading>{t("what")}</Heading>
      <Trans i18nKey="what-details" />

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
          em: <em />,
        }}
      />
    </div>
  )
}
