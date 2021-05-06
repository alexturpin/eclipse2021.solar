import Client from "shopify-buy"

const client = Client.buildClient({
  // @ts-expect-error
  domain: process.env.SHOPIFY_DOMAIN,
  // @ts-expect-error
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
})

export type Product = Pick<ShopifyBuy.Product, "id" | "title" | "description">

export const toProduct = ({ id, title, description }: ShopifyBuy.Product): Product => ({
  id,
  title,
  description,
})

export const getProducts = async () => {
  return (await client.product.fetchAll()).map(toProduct)
}
