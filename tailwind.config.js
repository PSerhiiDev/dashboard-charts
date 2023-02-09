
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neo: "neo-sans",
      },
    },
    screens: {
      'xl': {'max': '1280px'},
      'lg': {'max': '1150px'},
      'md': {'max': '740px'},
      'sm': {'max': '600px'},
    }
  },
};