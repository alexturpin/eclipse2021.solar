import { GetStaticProps } from "next"
import Image from "next/image"
import { useState } from "react"
import { getProducts, Product } from "../shop/shopify"
import { formatCurrency } from "../shop/utils"

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
  const [quantity, setQuantity] = useState(2)

  return (
    <div className="container mx-auto mt-10 shadow-md px-10 py-10 bg-white">
      <div className="border-b pb-8">
        <h1 className="font-semibold text-2xl">Shop</h1>
      </div>

      <div className="flex mt-10 mb-5">
        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
          Quantity
        </h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
      </div>

      {products.map((product) => (
        <div key={product.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5">
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <div>
                <Image layout="responsive" width="695" height="400" src={product.image} alt="" />
              </div>
              <span className="font-bold text-sm mb-5">{product.title}</span>
              <div
                className="description-html text-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <input
              className="mx-2 border text-center w-8"
              type="number"
              min="2"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">
            {formatCurrency(product.price)}
          </span>
          <span className="text-center w-1/5 font-semibold text-sm">
            {formatCurrency(quantity * product.price)}
          </span>
        </div>
      ))}
    </div>
  )
}
