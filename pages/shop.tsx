import { GetStaticProps } from "next"
import Image from "next/image"
import { useState } from "react"
import { getProducts, Product, getCheckoutURL } from "../shop/shopify"
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

  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const checkout = async () => {
    setCheckoutLoading(true)
    const checkoutURL = await getCheckoutURL(products[0].id, quantity)
    window.location = checkoutURL
  }

  const product = products[0]

  return (
    <>
      <header className="w-full gradient">
        <div className="container mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image src="/eclipse-clipped.png" alt="" width="782" height="285" />
          </div>
          <h1 className="font-semibold text-base uppercase w-44 text-center mx-auto relative z-10">
            Solar Eclipse Glasses
          </h1>
          <h3 className="font-semibold text-yellow text-center mb-14 relative z-10">
            June 10, 2021
          </h3>

          <p className="text-center mb-6">
            For those who have seen the Earth from space, and for the hundreds and perhaps thousands
            more who will, the experience most certainly changes your perspective. The things that
            we share in our world are far more valuable than those which divide us.
          </p>
          <p className="text-center mb-14">
            It suddenly struck me that that tiny pea, pretty and blue, was the Earth. I put up my
            thumb and shut one eye, and my thumb blotted out the planet Earth. I didn't feel like a
            giant. I felt very, very small.
          </p>

          <h2 className="font-bold text-2xl text-yellow uppercase">Shop</h2>
        </div>
      </header>
      <div className="container mx-auto">
        <div className="bg-purple p-2">
          <div className="flex flex-row justify-between items-center">
            <div className="w-1/4">
              <Image
                layout="responsive"
                width="1000"
                height="1000"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="w-1/2">
              <span className="font-bold text-sm mb-5">{product.title}</span>
              <div
                className="description-html text-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
            <div className="">
              <span className="text-center text-yellow font-semibold text-sm">
                {formatCurrency(product.price)}
              </span>
            </div>
            <div className="">
              <input
                className="mx-2 border text-center w-8"
                type="number"
                min="2"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex justify-between border-t mt-4 pt-2">
            <span className="uppercase font-semibold">Subtotal</span>

            <span className="text-yellow font-semibold">
              {formatCurrency(quantity * product.price)}
            </span>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <button
            className="w-1/4 py-2 mt-4 rounded-lg text-sm text-white uppercase bg-gradient-to-r from-orange to-mangenta"
            onClick={checkout}
            disabled={checkoutLoading}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}
