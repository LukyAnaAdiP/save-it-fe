/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: "class", // dark mode
  theme: {
    extend: {
      animation: {
        "bounce-up-down": "bounceUpDown 2s infinite",
      },
      keyframes: {
        bounceUpDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rotate: {
          "0%": { transform: "perspective(1000px) rotateY(0deg)" },
          "100%": { transform: "perspective(1000px) rotateY(360deg)" },
        },
      },
      animation: {
        rotate: "rotate 30s linear infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
