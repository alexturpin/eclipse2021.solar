import { EclipseType, EventVisibility, getEclipseDetails } from "../lib/eclipse"
import eclipse from "../lib/2021-06-10.json"
import React, { useEffect, useMemo, useState } from "react"
import { useTranslation, Trans } from "next-i18next"
import { SpinnerIcon } from "./SpinnerIcon"
import { useRouter } from "next/dist/client/router"
import { Location } from "../lib/types"

// TODO total, sunset

const Detail = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-normal pb-4">{children}</h3>
)

const DetectLocationIcon = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" {...props}>
    <path d="M0 0h48v48h-48z" fill="none" />
    <path d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm17.88 6c-.92-8.34-7.54-14.96-15.88-15.88v-4.12h-4v4.12c-8.34.92-14.96 7.54-15.88 15.88h-4.12v4h4.12c.92 8.34 7.54 14.96 15.88 15.88v4.12h4v-4.12c8.34-.92 14.96-7.54 15.88-15.88h4.12v-4h-4.12zm-17.88 16c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z" />
  </svg>
)

const DetectLocation = ({ onClick }: { onClick: () => void }) =>
  navigator.geolocation && (
    <button type="button" onClick={onClick}>
      <DetectLocationIcon className="h-6 text-yellow inline relative -top-0.5" />
    </button>
  )

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
      timezone: location.timezone?.offset || 240, // ET default
    })
  }, [location])

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = encodeURIComponent(position.coords.latitude)
      const long = encodeURIComponent(position.coords.longitude)

      const res = await fetch(`/api/latlong?lat=${lat}&long=${long}`)
      if (res.ok) setLocation(await res.json())
    })
  }

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
          <Trans
            i18nKey="where-when-not"
            values={{ location: cityRegion }}
            components={{ detectLocation: <DetectLocation onClick={detectLocation} /> }}
          />
        </Detail>
      )}

      {eclipseDetails.type !== EclipseType.None && (
        <>
          {eclipseDetails.type === EclipseType.Annular && (
            <Detail>
              <Trans
                i18nKey="where-when-annular"
                values={{ location: cityRegion }}
                components={{ detectLocation: <DetectLocation onClick={detectLocation} /> }}
              />
            </Detail>
          )}
          {eclipseDetails.type === EclipseType.Partial && (
            <Detail>
              <Trans
                i18nKey="where-when-partial"
                values={{ location: cityRegion }}
                components={{ detectLocation: <DetectLocation onClick={detectLocation} /> }}
              />
            </Detail>
          )}

          <Detail>
            <Trans
              i18nKey={
                eclipseDetails.c1?.visibility === EventVisibility.Sunrise
                  ? "where-when-c1-sunrise"
                  : "where-when-c1"
              }
              values={{
                start: eclipseDetails.c1?.time,
                location: city,
                timezone: location.timezone?.abbreviation,
              }}
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
