/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#1E90FF',
        brandRed: '#FF4B4B',
        brandYellow: '#FFD24C'
      },
      fontSize: {
        xl5: '1.8rem',
        xxl: '2.2rem'
      }
    }
  },
  plugins: []
};
