module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#FFFFFF",
      yellow: "#FCB340",
      orange: "#EC6E27",
      mangenta: "#B93169",
      purple: {
        DEFAULT: "#291E3F",
        dark: "#110C1E",
      },
    },
    extend: {
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
