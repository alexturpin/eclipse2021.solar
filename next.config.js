module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop",
        permanent: false,
      },
    ]
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
}
