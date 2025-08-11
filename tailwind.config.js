/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bebas Neue', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}