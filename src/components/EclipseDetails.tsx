import { EclipseType, EventVisibility, getEclipseDetails, Observer } from "../eclipse/eclipse"
import eclipse from "../eclipse/2021-06-10.json"
import { useMemo, useState } from "react"
import { useTranslation, Trans } from "next-i18next"

// TODO total, sunset

const Detail = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-normal text-xl pb-4">{children}</h3>
)

export const EclipseDetails = () => {
  const [location] = useState({
    range: [415825920, 415826176],
    country: "CA",
    region: "QC",
    eu: "0",
    timezone: "America/Toronto",
    city: "Gatineau",
    ll: [45.5269, -75.6103],
    metro: 0,
    area: 5,
  })

  const eclipseDetails = useMemo(() => {
    const ottawa: Observer = {
      latitude: {
        degrees: 45,
        minutes: 25,
        seconds: 0,
        direction: "N",
      },
      longitude: {
        degrees: 75,
        minutes: 42,
        seconds: 0,
        direction: "W",
      },
      altitude: 114,
      timezone: {
        hours: 4,
        minutes: 0,
        direction: "W",
      },
    }

    return getEclipseDetails(eclipse, ottawa)
  }, [])

  const { t } = useTranslation()

  const cityRegion = `${location.city}, ${location.region}`

  return (
    <>
      {eclipseDetails.type === EclipseType.None && (
        <Detail>{t("where-when-not", { location: cityRegion })}</Detail>
      )}
      {eclipseDetails.type === EclipseType.Annular && (
        <Detail>
          <Trans i18nKey="where-when-annular" values={{ location: cityRegion }} />
        </Detail>
      )}
      {eclipseDetails.type === EclipseType.Partial && (
        <Detail>
          <Trans i18nKey="where-when-partial" values={{ location: cityRegion }} />
        </Detail>
      )}

      <Detail>
        <Trans
          i18nKey={
            eclipseDetails.c1?.visibility === EventVisibility.Sunrise
              ? "where-when-c1-sunrise"
              : "where-when-c1"
          }
          values={{ start: eclipseDetails.c1?.time, location: location.city }}
        />
      </Detail>

      {eclipseDetails.c2?.type === EclipseType.Annular && (
        <Detail>
          <Trans
            i18nKey={"where-when-c2-annular"}
            values={{
              start: eclipseDetails.c2?.time,
              location: location.city,
              duration: eclipseDetails.duration,
              finish: eclipseDetails.c3?.time,
            }}
          />
        </Detail>
      )}

      <Detail>
        <Trans
          i18nKey={"where-when-mid"}
          values={{
            start: eclipseDetails.mid?.time,
            obscursion: Math.round(eclipseDetails.obscursion * 100),
          }}
        />
      </Detail>

      <Detail>
        <Trans
          i18nKey={"where-when-c4"}
          values={{
            start: eclipseDetails.c4?.time,
            obscursion: Math.round(eclipseDetails.obscursion * 100),
          }}
        />
      </Detail>
    </>
  )
}
