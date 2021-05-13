import { GetStaticProps } from "next"
import { Header, Cart } from "../shop/components"
import { getProducts, Product } from "../shop/shopify"

type ShopProps = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<ShopProps> = async (context) => {
  return {
    props: {
      products: await getProducts(),
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
