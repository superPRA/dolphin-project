/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      lg: "1024px",
      md: "768px",
      xl: "1280px",
      sm: "480px",
      bk1: "1200px",
      bk2: "647px"
    },
  },
  plugins: [],
};
