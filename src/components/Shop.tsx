import Image from "next/image"
import { useState } from "react"
import { getCheckoutURL, Product } from "../lib/shopify"
import { Quantity, Checkout, Heading, NumberDisplay } from "./"
import { useTranslation } from "next-i18next"
import { event } from "../lib/ga"
import { Locale } from "../lib/types"

const MIN_ITEMS = 2
const MAX_ITEMS = 10

type ShopProps = {
  product: Product
}

export const Shop = ({ product }: ShopProps) => {
  const { t, i18n } = useTranslation()

  const [quantity, setQuantity] = useState(2)

  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const checkout = async () => {
    setCheckoutLoading(true)

    const clampedQuantity = Math.min(Math.max(quantity, MIN_ITEMS), MAX_ITEMS)
    const checkoutURL = await getCheckoutURL(product.id, quantity, i18n.language as Locale)

    event("checkout", { quantity: clampedQuantity })
    window.location = checkoutURL
  }

  return (
    <div className="container mx-auto px-6 md:px-2">
      <Heading>{t("shop")}</Heading>

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
              <NumberDisplay value={product.price} />
            </span>
          </div>
          <div className="pb-5 md:pb-0">
            <Quantity
              quantity={quantity}
              setQuantity={setQuantity}
              min={MIN_ITEMS}
              max={MAX_ITEMS}
            />
          </div>
        </div>

        <div className="flex justify-between border-t pt-2">
          <span className="uppercase font-semibold">{t("subtotal")}</span>

          <span className="text-yellow font-bold">
            <NumberDisplay value={quantity * product.price} />
          </span>
        </div>
      </div>

      <Checkout onCheckout={checkout} loading={checkoutLoading} />
    </div>
  )
}
