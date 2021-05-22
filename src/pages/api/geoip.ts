import type { NextApiRequest, NextApiResponse } from "next"
import maxmind, { CityResponse } from "maxmind"
import { resolve } from "path"

const geoip = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end()

  let ip = req.headers["x-real-ip"] ?? process.env.FALLBACK_IP
  if (Array.isArray(ip)) ip = ip[0]
  if (!ip) return res.status(400).end()

  const filepath = resolve("./data/GeoLite2-City.mmdb") // https://github.com/vercel/next.js/issues/8251#issuecomment-657770901
  const lookup = await maxmind.open<CityResponse>(filepath)
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
