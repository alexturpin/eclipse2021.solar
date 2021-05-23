// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from "next"
//import maxmind, { CityResponse } from "maxmind"
import { resolve } from "path"
import { promises as fs } from "fs"
import dirtree from "directory-tree"

const geoip = async (req: NextApiRequest, res: NextApiResponse) => {
  const tree = dirtree(process.cwd(), { exclude: /node_modules/ })
  const files = []

  const aggregate = (obj: any) => {
    files.push(obj.path)
    if (obj.children) obj.children.forEach(aggregate)
  }

  aggregate(tree)

  res.status(200).send(files.join("\n"))

  /*if (req.method !== "GET") return res.status(405).end()

  let ip = req.headers["x-real-ip"] ?? process.env.FALLBACK_IP
  if (Array.isArray(ip)) ip = ip[0]
  if (!ip) return res.status(400).end()

  const filepath = resolve("./public/data/GeoLite2-City.mmdb") // https://github.com/vercel/next.js/issues/8251#issuecomment-657770901
  const lookup = await maxmind.open<CityResponse>(filepath)
  const response = lookup.get(ip)

  let data = null
  if (response) {
    data = {
      city: response.city?.names.en,
    }
  }

  return res.status(200).json(data)*/
}

export default geoip
