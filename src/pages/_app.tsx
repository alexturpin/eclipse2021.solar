import React, { useEffect } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import "../styles/globals.css"
import { appWithTranslation, useTranslation } from "next-i18next"
import { Bugsnag } from "../lib/bugsnag"
import { useRouter } from "next/router"
import { pageview } from "../lib/ga"

const ErrorBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React)

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [router.events])

  const { i18n } = useTranslation()

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Find out how you can see the eclipse. Visible from Eastern Canada!"
        />
        <meta property="og:title" content="June 10, 2021 solar eclipse" />
        <meta
          property="og:description"
          content="Find out how you can see the eclipse. Visible from Eastern Canada!"
        />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_DOMAIN}/images/social.jpg`}
        />
        <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      {ErrorBoundary ? (
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default appWithTranslation(MyApp)
