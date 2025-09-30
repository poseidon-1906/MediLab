/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-brand': '#00A79D', // A modern teal/aqua green
        'gray-900': '#1a202c',
        'gray-800': '#2d3748',
        'gray-700': '#4a5568',
        'gray-600': '#718096',
        'gray-500': '#a0aec0',
        'gray-400': '#cbd5e0',
        'gray-300': '#e2e8f0',
        'gray-200': '#edf2f7',
        'gray-100': '#f7fafc',
        'gray-50': '#f9fafb',
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
}