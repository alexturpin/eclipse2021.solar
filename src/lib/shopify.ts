import Client from "shopify-buy"
import { Locale } from "./types"

const clients = {
  "en-CA": Client.buildClient({
    // @ts-expect-error
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
    // @ts-expect-error
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  }),
  "fr-CA": Client.buildClient({
    // @ts-expect-error
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
    // @ts-expect-error
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    language: "fr-CA",
  }),
}

export type Product = {
  id: string | number
  title: string
  description: string
  price: number
  image: string
}

export const toProduct = ({
  id,
  title,
  // @ts-ignore bad types
  descriptionHtml: description,
  ...product
}: ShopifyBuy.Product): Product => ({
  id: product.variants[0].id,
  title,
  description,
  price: parseFloat(product.variants[0].price),
  image: product.images[0].src,
})

export const getProducts = async (locale: Locale) =>
  (await clients[locale].product.fetchAll()).map(toProduct)

export const getCheckoutURL = async (
  variantId: string | number,
  quantity: number,
  locale: Locale
) => {
  const checkout = await clients[locale].checkout.create()
  await clients[locale].checkout.addLineItems(checkout.id, [
    {
      variantId,
      quantity,
    },
  ])
  // @ts-ignore bad types
  return checkout.webUrl
}
