module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
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
      black: "#000000",
      gray: "#CECECE",
    },
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1024px",
        "2xl": "1024px",
      },
    },
    extend: {
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      width: {
        eclipse: "650px",
        "eclipse-md": "782px",
      },
      height: {
        eclipse: "236px",
        "eclipse-md": "285px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
