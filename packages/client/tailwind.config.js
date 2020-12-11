module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      padding: {
        169: "56%",
        916: "120%",
        full: "100%",
      },
      minWidth: {
        20: "20rem",
      },
      width: {
        "1/3-extra": "27%",
        "1/2-extra": "43%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
