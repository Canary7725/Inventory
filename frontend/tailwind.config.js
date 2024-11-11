// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi','sans-serif'],
        // You can also add other font families like serif or monospace here
      },
    },
  },
  plugins: [],
};