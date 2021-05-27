import type { NextApiRequest, NextApiResponse } from "next"
import { findTimeZone, getZonedTime } from "timezone-support"
import { Location } from "../../lib/types"

// @ts-ignore
import nearbyCities from "nearby-cities"
// @ts-ignore
import geoTz from "geo-tz"

const handler = async (req: NextApiRequest, res: NextApiResponse<Location>) => {
  if (req.method !== "GET") return res.status(405).end()

  const lat = parseFloat(Array.isArray(req.query.lat) ? req.query.lat[0] : req.query.lat)
  const long = parseFloat(Array.isArray(req.query.long) ? req.query.long[0] : req.query.long)

  const location = nearbyCities({
    latitude: lat,
    longitude: long,
  })[0]

  const eventDate = new Date(2021, 5, 10)
  const tz = findTimeZone(geoTz(lat, long))
  const timezoneInfo = getZonedTime(eventDate, tz)

  return res.status(200).json({
    city: location.name,
    region: undefined, // TODO, nearby-cities adminCode is a number for Canada?
    timezone: timezoneInfo.zone,
    ll: [lat, long],
  })
}

export default handler
