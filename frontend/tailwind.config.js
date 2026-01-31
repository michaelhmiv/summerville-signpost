/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Summerville Palette - The Digital Veranda
        
        // Primary: Live Oak Canopy
        'oak': {
          50: '#f4f6f3',
          100: '#e8ece5',
          200: '#d1dac9',
          300: '#b0c2a3',
          400: '#8ba078',
          500: '#6b8255',
          600: '#526741',
          700: '#425236',
          800: '#36412d',
          900: '#2d3626',
        },
        
        // Secondary: Azalea Corridor
        'azalea': {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f8d0da',
          300: '#f2aab9',
          400: '#e87a93',
          500: '#d64d6d',
          600: '#c22d51',
          700: '#a3203e',
          800: '#881d37',
          900: '#741c34',
        },
        
        // Accent: Historic Brick
        'brick': {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#f9d2cd',
          300: '#f3b2a8',
          400: '#ea8676',
          500: '#db5f4b',
          600: '#c44633',
          700: '#a43727',
          800: '#883125',
          900: '#712e25',
        },
        
        // Accent: Heart Pine & Golden Hour
        'pine': {
          50: '#fcf9f2',
          100: '#f9f1e0',
          200: '#f2e0bd',
          300: '#e9c991',
          400: '#deab5f',
          500: '#d4913b',
          600: '#c6762e',
          700: '#a55c27',
          800: '#874a26',
          900: '#6f3d23',
        },
        
        // Neutrals: Porch & Veranda
        'porch': {
          50: '#fdfcfb',
          100: '#faf6f1',
          200: '#f2ebe0',
          300: '#e6d9c5',
          400: '#d4c0a3',
          500: '#c4a783',
          600: '#a68864',
          700: '#856b4e',
          800: '#6e5743',
          900: '#5a4839',
        },
        
        // Haint Blue (Southern porch ceiling)
        'haint': {
          50: '#f4f9fa',
          100: '#e6f0f3',
          200: '#d1e3e8',
          300: '#acced7',
          400: '#7db1bf',
          500: '#5d95a6',
          600: '#4a7a8b',
          700: '#3d6472',
          800: '#34535e',
          900: '#2f464f',
        },
        
        // Spanish Moss
        'moss': {
          50: '#f5f6f4',
          100: '#e8ebe4',
          200: '#d2d8ca',
          300: '#b3bda7',
          400: '#929d81',
          500: '#768263',
          600: '#5c664c',
          700: '#49523d',
          800: '#3d4434',
          900: '#343a2e',
        },
        
        // Legacy watercolor (for backwards compatibility during transition)
        'azalea-pink': '#F8E1E7',
        'azalea-pink-dark': '#E8D1D7',
        'lavender-wash': '#E8DCF0',
        'watercolor-mint': '#D4E8D4',
        'cream-wash': '#FFFAF8',
        'peach-blush': '#FFE8E0',
      },
      
      fontFamily: {
        // Headlines: Vintage signage feel
        serif: ['Crimson Pro', 'Georgia', 'Times New Roman', 'serif'],
        // Body: Clean, human
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Accent: Hand-lettered for community content
        hand: ['Caveat', 'Georgia', 'cursive'],
      },
      
      boxShadow: {
        'porch': '0 4px 20px rgba(107, 130, 85, 0.15)',
        'porch-lg': '0 8px 40px rgba(107, 130, 85, 0.2)',
        'veranda': '0 -2px 10px rgba(0,0,0,0.05), 0 4px 20px rgba(107, 130, 85, 0.1)',
        'card': '0 2px 8px rgba(52, 82, 65, 0.08)',
      },
      
      borderRadius: {
        'porch': '1rem',
        'pill': '9999px',
      },
      
      animation: {
        'gentle-breeze': 'gentleBreeze 3s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      
      keyframes: {
        gentleBreeze: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
