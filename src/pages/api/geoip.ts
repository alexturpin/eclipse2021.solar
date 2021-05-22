import type { NextApiRequest, NextApiResponse } from "next"
import maxmind, { CityResponse } from "maxmind"

type Data = {
  city: string | undefined
}

const geoip = async (req: NextApiRequest, res: NextApiResponse<Data | null>) => {
  if (req.method !== "GET") return res.status(405).end()

  let ip = req.headers["X-Forwaded-For"] ?? process.env.FALLBACK_IP
  if (Array.isArray(ip)) ip = ip[0]
  if (!ip) return res.status(400).end()

  const lookup = await maxmind.open<CityResponse>("data/GeoLite2-City.mmdb")
  const response = lookup.get(ip)

  let data = null
  if (response) {
    data = {
      city: response.city?.names.en,
    }
  }

  return res.status(200).json(data)
}

export default geoip
