/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'dark-blue' : '#1B4242',
        'light-blue' : '#9EC8B9'
      }
    },
  },
  plugins: [],
}

