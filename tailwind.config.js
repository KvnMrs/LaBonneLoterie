/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "500px",

      md: "700px",

      lg: "900px",

      xl: "1200px",

      "2xl": "1400px",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
