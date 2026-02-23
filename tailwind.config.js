/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './article.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#14b8a6',
        secondary: '#94a3b8',
        dark: '#0f172a',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1320px',
    },
  },
  plugins: [],
};
