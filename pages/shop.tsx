import { GetStaticProps } from "next"
import Image from "next/image"
import { useState } from "react"
import { getProducts, Product, getCheckoutURL } from "../shop/shopify"
import { formatCurrency } from "../shop/utils"

const MIN_ITEMS = 2
const MAX_ITEMS = 10

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
    const checkoutURL = await getCheckoutURL(
      products[0].id,
      Math.min(Math.max(quantity, MIN_ITEMS), MAX_ITEMS)
    )
    window.location = checkoutURL
  }

  const product = products[0]

  return (
    <>
      <header className="w-full gradient">
        <div className="h-eclipse md:h-eclipse-md relative overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-eclipse h-eclipse md:w-eclipse-md md:h-eclipse-md">
            <Image src="/eclipse.png" alt="" layout="fill" />
          </div>
        </div>
        <div className="container mx-auto px-6">
          <h1 className="hidden">Solar Eclipse Glasses</h1>
          <h3 className="hidden">June 10, 2021</h3>

          <p className="text-center mb-6 text-sm leading-loose md:-mt-16 -mt-14">
            Do not miss this astronomical experience!
          </p>
          <p className="text-center mb-6 text-sm leading-loose">
            On June 10, you will have the chance to witness a solar eclipse, an event that rarely
            occurs in the same place.
          </p>
          <p className="text-center mb-14 text-sm leading-loose">
            Get our glasses specially designed to admire the transition of the Moon between the Sun
            and the Earth. Our glasses are compliant with the ISO 12312-2 international safety
            standard for safely viewing our local star in all its splendor.
          </p>

          <h2 className="font-extrabold text-2xl text-yellow uppercase pb-4">Shop</h2>
        </div>
      </header>
      <div className="container mx-auto px-6">
        <div className="bg-purple px-5 py-5 rounded-md">
          <div className="flex justify-between items-center flex-col md:flex-row md:pb-5">
            <div className="w-full md:w-1/4 pb-5 md:pb-0">
              <div className="bg-white rounded-md py-5 md:px-5">
                <div className="w-1/2 md:w-full mx-auto">
                  <Image
                    layout="responsive"
                    width="862"
                    height="511"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 pb-5 md:pb-0">
              <span className="font-extrabold uppercase md:text-sm mb-5">{product.title}</span>
              <div
                className="description-html text-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
            <div className="pb-5 md:pb-0 md:py-0">
              <span className="text-center text-yellow font-bold text-2xl md:text-sm">
                {formatCurrency(product.price)}
              </span>
            </div>
            <div className="pb-5 md:pb-0">
              <div className="flex flex-row md:flex-col-reverse bg-white rounded-md items-center">
                <button
                  className={
                    (quantity > MIN_ITEMS ? "text-black" : "text-gray") +
                    " text-2xl px-5 py-1 md:px-4 md:py-4 font-bold"
                  }
                  disabled={quantity <= MIN_ITEMS}
                  onClick={() => setQuantity(Math.max(quantity - 1, MIN_ITEMS))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="mx-2 md:mx-auto text-center text-black font-extrabold w-8 border-0">
                  {quantity}
                </div>
                <button
                  className={
                    (quantity < MAX_ITEMS ? "text-black" : "text-gray") +
                    " text-black text-2xl px-5 py-3 md:px-4 md:py-4 font-bold"
                  }
                  disabled={quantity >= MAX_ITEMS}
                  onClick={() => setQuantity(Math.min(quantity + 1, MAX_ITEMS))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between border-t pt-2">
            <span className="uppercase font-semibold">Subtotal</span>

            <span className="text-yellow font-bold">
              {formatCurrency(quantity * product.price)}
            </span>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <button
            className="w-full md:w-auto py-4 px-14 mt-4 rounded-md text-xs text-white uppercase bg-gradient-to-r from-orange to-mangenta tracking-widest"
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
