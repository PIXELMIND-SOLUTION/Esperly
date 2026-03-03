/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // CRA needs this
  ],
  theme: {
    extend: {
  animation: {
    "scroll-right": "scrollRight 30s linear infinite",
    "scroll-left": "scrollLeft 30s linear infinite",
  },
  keyframes: {
    scrollRight: {
      "0%": { transform: "translateX(-50%)" },
      "100%": { transform: "translateX(0%)" },
    },
    scrollLeft: {
      "0%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(-50%)" },
    },
  },
}
  },
  plugins: [],
};