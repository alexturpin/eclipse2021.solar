import type { NextApiRequest, NextApiResponse } from "next"
import geoip from "fast-geoip"
import { findTimeZone, getZonedTime } from "timezone-support"
import { Location } from "../../lib/types"

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Location>) => {
  if (process.env.FAKE_LAG) {
    await sleep(parseInt(process.env.FAKE_LAG))
  }

  if (req.method !== "GET") return res.status(405).end()

  let ip = req.headers["x-real-ip"] ?? process.env.FALLBACK_IP
  if (Array.isArray(ip)) ip = ip[0]
  if (!ip) return res.status(400).end()

  const ipInfo = await geoip.lookup(ip)
  if (!ipInfo) {
    return res.status(404).end()
  }

  const eventDate = new Date(2021, 5, 10)
  const tz = findTimeZone(ipInfo.timezone)
  const timezoneInfo = getZonedTime(eventDate, tz)

  return res.status(200).json({
    city: ipInfo.city,
    region: ipInfo.region,
    timezone: timezoneInfo.zone,
    ll: ipInfo.ll,
  })
}

export default handler
