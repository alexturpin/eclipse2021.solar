import { GetStaticProps } from "next"
import Head from "next/head"
import { Header, Cart } from "../shop/components"
import { getProducts, Product } from "../shop/shopify"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { i18n } from "../../next-i18next.config"
import { useTranslation } from "next-i18next"
import { Locale } from "../shop/utils"

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

const Shop = ({ products }: ShopProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t("title")} — {t("date")}
        </title>
      </Head>
      <Header />
      <Cart product={products[0]} />
    </>
  )
}

export default Shop
