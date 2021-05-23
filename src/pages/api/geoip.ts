import type { NextApiRequest, NextApiResponse } from "next"

import geoip from "fast-geoip"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end()

  let ip = req.headers["x-real-ip"] ?? process.env.FALLBACK_IP
  if (Array.isArray(ip)) ip = ip[0]
  if (!ip) return res.status(400).end()

  const data = await geoip.lookup(ip)

  return res.status(200).json(data)
}

export default handler
