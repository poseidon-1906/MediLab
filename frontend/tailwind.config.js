/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#2179e5ff',
        'green':'#3ef7a0ff',
        'yellow':'#edf107ff',
        'black-lg':'#727b73ff',
        'orange': '#dd584c',
        
      }
    },
  },
  plugins: [],
}