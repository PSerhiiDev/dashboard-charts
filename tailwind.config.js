
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neo: "neo-sans",
      },
    },
  },
  // plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};