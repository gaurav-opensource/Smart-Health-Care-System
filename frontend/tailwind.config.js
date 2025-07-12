/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scan all JS/JSX files in src/
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        200: '200% 200%',
      },
    },
  },
  plugins: [],
};
