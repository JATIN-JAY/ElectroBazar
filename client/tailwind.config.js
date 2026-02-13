/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        apple: {
          light: '#f5f5f7',
          gray: '#e8e8ed',
        },
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'apple-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
