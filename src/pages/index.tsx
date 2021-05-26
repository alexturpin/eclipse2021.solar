import { GetStaticProps } from "next"
import Head from "next/head"
import { Header, Info, Shop } from "../components"
import { getProducts, Product } from "../lib/shopify"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { i18n } from "../../next-i18next.config"
import { useTranslation } from "next-i18next"
import { Locale } from "../lib/utils"

type ShopProps = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<ShopProps> = async ({ locale }) => {
  return {
    props: {
      products: await getProducts(locale as Locale),
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale)),
      locale: locale ?? i18n.defaultLocale,
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
      <Header />
      <Info />
      <Shop product={products[0]} />
      <footer className="text-center text-sm mt-14">
        © 2021 eclipse2021.solar&nbsp;⸱&nbsp;
        <a href="mailto:contact@eclipse2021.solar">contact@eclipse2021.solar</a>
        &nbsp;⸱&nbsp;Eclipse Predictions by Fred Espenak (NASA's GSFC)
      </footer>
    </>
  )
}

export default Home
