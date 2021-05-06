import Client from "shopify-buy"

const client = Client.buildClient({
  // @ts-expect-error
  domain: process.env.SHOPIFY_DOMAIN,
  // @ts-expect-error
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
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
  // @ts-ignore
  descriptionHtml: description,
  ...product
}: ShopifyBuy.Product): Product => ({
  id,
  title,
  description,
  price: parseFloat(product.variants[0].price),
  image: product.images[0].src,
})

export const getProducts = async () => {
  return (await client.product.fetchAll()).map(toProduct)
}
