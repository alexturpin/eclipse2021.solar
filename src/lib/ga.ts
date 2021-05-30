// log the pageview with their URL
export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export const event = (action: string, params: any) => {
  // @ts-ignore
  window.gtag("event", action, params)
}