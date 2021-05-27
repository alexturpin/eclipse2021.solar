export type Location = {
  city?: string
  region?: string
  timezone?: {
    abbreviation?: string
    offset?: number
  }
  ll: [number, number]
}
