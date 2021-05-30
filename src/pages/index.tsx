import { GetStaticProps } from "next"
import Head from "next/head"
import { Header, Info, Shop, LangSwitcher } from "../components"
import { getProducts, Product } from "../lib/shopify"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { Locale } from "../lib/types"
import { FAQ } from "../components"
import { normalizeLocale } from "../lib/utils"

type ShopProps = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<ShopProps> = async ({ locale: rawLocale }) => {
  const locale = normalizeLocale(rawLocale)
  return {
    props: {
      products: await getProducts(locale as Locale),
      ...(await serverSideTranslations(locale)),
      locale: locale,
    },
  }
}

const Home = ({ products }: ShopProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t("title")} — {t("date")}
        </title>
      </Head>

      <LangSwitcher />

      <Header />
      <Info />
      <Shop product={products[0]} />
      <FAQ />

      <footer className="container mx-auto px-6 md:px-2 text-center text-sm mt-14">
        © 2021 eclipse2021.solar&nbsp;⸱&nbsp;
        <a href="mailto:contact@eclipse2021.solar">contact@eclipse2021.solar</a>
        &nbsp;⸱&nbsp;Eclipse Predictions by Fred Espenak (NASA's GSFC)
      </footer>
    </>
  )
}

export default Home
