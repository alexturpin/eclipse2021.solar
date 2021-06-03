import Image from "next/image"
import { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from "react"
import { getCheckoutURL, Product } from "../lib/shopify"
import { Quantity, Checkout, Heading, NumberDisplay } from "./"
import { Trans, useTranslation } from "next-i18next"
import { event } from "../lib/ga"
import { Locale } from "../lib/types"
import { supabase } from "../lib/supabase"

const MIN_ITEMS = 2
const MAX_ITEMS = 10

type ShopProps = {
  product: Product
}

export const ShopActive = ({ product }: ShopProps) => {
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
    <>
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
    </>
  )
}

export const ShopInactive = ({
  overrideActive,
  setOverrideActive,
}: {
  overrideActive: boolean
  setOverrideActive: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim().length) return

    setSubmitted(true)

    await supabase.from("mailing_list").insert({
      email: email.trim(),
    })
  }

  const override = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOverrideActive(true)
  }

  return (
    <div className="shop-inactive bg-purple px-5 py-5 mb-4 rounded-md">
      <div>
        <Trans i18nKey="late-details" />
      </div>

      <form onSubmit={(event) => signUp(event)} className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          disabled={submitted}
          className="w-full md:w-1/3 py-4 px-4 mt-4 mr-2 rounded-md text-xs text-black placeholder-gray-dark"
          placeholder={t("late-email")}
        />
        <button
          type="submit"
          disabled={submitted}
          className="w-full md:w-1/5 py-4 px-4 mt-4 rounded-md text-xs text-white uppercase bg-gradient-to-r from-orange to-mangenta tracking-widest"
        >
          {submitted ? t("late-got-it") : t("late-remind-me")}
        </button>
      </form>

      {!overrideActive && (
        <div className="text-xs">
          <Trans
            i18nKey="late-override"
            components={{
              override: (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  className="underline hover:no-underline"
                  onClick={(event) => override(event)}
                  href=""
                />
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}

export const Shop = ({ product }: ShopProps) => {
  const { t } = useTranslation()

  const [overrideActive, setOverrideActive] = useState(false)
  const active = product.available && process.env.NEXT_PUBLIC_SHOP_ACTIVE === "true"

  return (
    <div className="container mx-auto px-6 md:px-2">
      <Heading>{t("shop")}</Heading>

      {!active && (
        <ShopInactive overrideActive={overrideActive} setOverrideActive={setOverrideActive} />
      )}
      {(active || overrideActive) && <ShopActive product={product} />}
    </div>
  )
}
