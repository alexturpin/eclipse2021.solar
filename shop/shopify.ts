import Client from "shopify-buy"

const client = Client.buildClient({
  // @ts-expect-error
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  // @ts-expect-error
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
})

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

export const getProducts = async () => {
  return (await client.product.fetchAll()).map(toProduct)
}

export const getCheckoutURL = async (variantId: string | number, quantity: number) => {
  const checkout = await client.checkout.create()
  await client.checkout.addLineItems(checkout.id, [
    {
      variantId,
      quantity,
    },
  ])
  // @ts-ignore bad types
  return checkout.webUrl
}
