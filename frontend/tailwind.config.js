/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        HardGreen: "#4B6657",
        SoftGreen: "rgba(75, 102, 87, 0.66)",
        HardOrange: "#CF713C",
        SoftOrange: "rgba(207, 113, 60, 0.32)",
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}

