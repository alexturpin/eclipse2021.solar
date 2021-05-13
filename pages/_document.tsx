import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <title>June 10, 2021 solar eclipse</title>

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="Find out how you can watch the solar eclipse happening on June 10, 2021, visible from most of Eastern Canada!"
          />

          <meta property="og:title" content="June 10, 2021 solar eclipse" />
          <meta
            property="og:description"
            content="Find out how you can watch the solar eclipse happening on June 10, 2021, visible from most of Eastern Canada!"
          />
          <meta property="og:image" content={process.env.VERCEL_URL + "/eclipse.png"} />
          <meta property="og:url" content={process.env.VERCEL_URL} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
