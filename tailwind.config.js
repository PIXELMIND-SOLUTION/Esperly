/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      /* ✅ MERGED ANIMATIONS */
      animation: {
        "scroll-right": "scrollRight 30s linear infinite",
        "scroll-left": "scrollLeft 30s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
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
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      fontFamily: {
        fraunces: ["Fraunces", "Georgia", "serif"],
        "dm-mono": ["DM Mono", "monospace"],
        lora: ["Lora", "Georgia", "serif"],
      },

      colors: {
        cream: "#F8F4EC",
        paper: "#EEE6D2",
        charcoal: "#1A1008",
        stone: "#7A6E5A",
        clay: "#5A5044",
        rust: "#A6192E",
        forest: "#2E7D52",
        ocean: "#3B6FA0",
        amber: "#C97B1A",
      },
    },
  },
  plugins: [],
};