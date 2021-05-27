export type Location = {
  city?: string
  region?: string
  timezone?: {
    abbreviation?: string
    offset?: number
  }
  ll: [number, number]
}

export type Locale = "en-CA" | "fr-CA"
