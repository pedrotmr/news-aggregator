/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '64rem',
          md: '64rem',
          lg: '64rem',
          xl: '64rem',
          '2xl': '64rem',
        },
      },
    },
  },
  plugins: [],
};
