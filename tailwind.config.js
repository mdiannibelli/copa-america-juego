/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'copa-america': 'url("public/background-copa-america.jpeg")',
        'copa-america2': 'url("public/background-copa-america-2.webp")'
      }
    },
  },
  plugins: [],
};