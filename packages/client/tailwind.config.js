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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
