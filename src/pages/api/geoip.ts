import type { NextApiRequest, NextApiResponse } from "next"

import geoip from "fast-geoip"

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.FAKE_LAG) {
    await sleep(parseInt(process.env.FAKE_LAG))
  }

  if (req.method !== "GET") return res.status(405).end()

  let ip = req.headers["x-real-ip"] ?? process.env.FALLBACK_IP
  if (Array.isArray(ip)) ip = ip[0]
  if (!ip) return res.status(400).end()

  const data = await geoip.lookup(ip)
  if (!data) {
    return res.status(404).end()
  }

  return res.status(200).json(data)
}

export default handler
