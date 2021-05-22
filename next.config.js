const { i18n } = require("./next-i18next.config")

module.exports = {
  images: {
    domains: ["cdn.shopify.com"],
  },
  i18n,
  future: {
    webpack5: false, // https://github.com/vercel/next.js/issues/24700
  },
}
