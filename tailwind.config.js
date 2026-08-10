/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#071426',
        navy: '#0b2341',
        mist: '#eef7fb',
      },
      boxShadow: {
        lift: '0 24px 70px -32px rgba(7, 20, 38, 0.45)',
      },
    },
  },
  plugins: [],
}
