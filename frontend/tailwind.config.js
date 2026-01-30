/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#A8E6CF',
        'mint-dark': '#8DD4B0',
        rose: '#FFB7B2',
        'rose-dark': '#E89994',
        butter: '#FFDAC1',
        'butter-dark': '#E8C4A8',
        sage: '#C7CEEA',
        'sage-dark': '#A8B0D4',
        cream: '#FFFDD0',
        'cream-dark': '#F5F3C0',
        'warm-white': '#FFFAF5',
        charcoal: '#3D3D3D',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}