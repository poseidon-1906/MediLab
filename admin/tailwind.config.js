/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: '#1092efff',
        secondary: '#6b7280',
        accent: '#f59e0b',
        light: '#F8F9FD',
        dark: '#1f2937',
        'btn-add': '#10b981',
        'btn-update': '#8b5cf6',
        'btn-delete': '#ef4444',
        'btn-delete-alt': '#f97316',
        'btn-search': '#f59e0b',
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'custom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}