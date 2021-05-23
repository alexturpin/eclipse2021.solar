import { EclipseType, EventVisibility, getEclipseDetails } from "../eclipse/eclipse"
import eclipse from "../eclipse/2021-06-10.json"
import { useEffect, useMemo, useState } from "react"
import { useTranslation, Trans } from "next-i18next"
import { SpinnerIcon } from "./SpinnerIcon"
import { useRouter } from "next/dist/client/router"

// TODO total, sunset

const Detail = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-normal text-xl pb-4">{children}</h3>
)

type Location = {
  city?: string
  region?: string
  timezone?: string
  ll: [number, number]
}

export const EclipseDetails = () => {
  const { query } = useRouter()
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isSubscribed = true

    if (query.lat && query.long) {
      // Debug override
      setLocation({
        ll: [parseFloat(query.lat as string), parseFloat(query.long as string)],
      })
    } else {
      // Geo IP fetch
      const getLocation = async () => {
        const res = await fetch("/api/geoip")
        if (res.ok) isSubscribed && setLocation(await res.json())
        else setError(true)
      }
      getLocation()
    }

    return () => {
      isSubscribed = false
    }
  }, [query])

  const eclipseDetails = useMemo(() => {
    if (!location) return
    return getEclipseDetails(eclipse, {
      latitude: location.ll[0],
      longitude: location.ll[1],
      timezone: -4,
    })
  }, [location])

  const { t } = useTranslation()

  if (!location) {
    return (
      <div className="flex flex-row items-center py-4">
        <SpinnerIcon />
        <span>{t("location-loading")}</span>
      </div>
    )
  }

  if (error || !eclipseDetails) {
    return <p>{t("location-error")}</p>
  }

  const city = location.city || t("location-unknown")
  const cityRegion = `${city}${location.region ? `, ${location.region}` : ""}`

  return (
    <>
      {eclipseDetails.type === EclipseType.None && (
        <Detail>
          <Trans i18nKey="where-when-not" values={{ location: cityRegion }} />
        </Detail>
      )}

      {eclipseDetails.type !== EclipseType.None && (
        <>
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
              values={{ start: eclipseDetails.c1?.time, location: city }}
            />
          </Detail>

          {eclipseDetails.mid?.type === EclipseType.Annular && (
            <Detail>
              <Trans
                i18nKey={"where-when-c2-annular"}
                values={{
                  start: eclipseDetails.c2?.time,
                  location: city,
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
      )}
    </>
  )
}
