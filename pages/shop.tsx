import { GetStaticProps } from "next"
import { getProducts, Product } from "../shop/shopify"

type ShopProps = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<ShopProps> = async (context) => {
  let products = await getProducts()

  console.log(products)

  return {
    props: {
      products,
    },
  }
}

export default function Shop({ products }: ShopProps) {
  return (
    <ul>
      {products.map((product) => (
        <li>{product.title}</li>
      ))}
    </ul>
  )
}
