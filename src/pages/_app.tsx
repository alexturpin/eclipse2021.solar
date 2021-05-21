import type { AppProps } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import "../styles/globals.css"
import { appWithTranslation } from "next-i18next"

function MyApp({ Component, pageProps }: AppProps) {
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
        <meta property="og:image" content={process.env.NEXT_PUBLIC_DOMAIN + "/eclipse.png"} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
