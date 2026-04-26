/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Define a dark luxury palette with gold accents
        background: '#0d0d0d',
        surface: '#1a1a1a',
        primary: {
          DEFAULT: '#d4af37', // gold for accents
          dark: '#b7972f'
        },
        secondary: {
          DEFAULT: '#2e2e2e',
          dark: '#242424'
        },
        text: {
          DEFAULT: '#f5f5f5',
          muted: '#a5a5a5'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
};