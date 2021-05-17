import { GetStaticProps } from "next"
import { Header, Cart } from "../shop/components"
import { getProducts, Product } from "../shop/shopify"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { i18n } from "../next-i18next.config"

type ShopProps = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<ShopProps> = async ({ locale }) => {
  return {
    props: {
      products: await getProducts(),
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale)),
    },
  }
}

export default function Shop({ products }: ShopProps) {
  return (
    <>
      <Header />
      <Cart product={products[0]} />
    </>
  )
}
