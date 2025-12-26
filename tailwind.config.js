/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Academia Palette
        mahogany: {
          50: '#fdf4f3',
          100: '#fbe8e5',
          200: '#f7d5d0',
          300: '#f0b5ad',
          400: '#e68a7f',
          500: '#d76555',
          600: '#c2493a',
          700: '#a23a2e',
          800: '#86332a',
          900: '#6f2f28',
        },
        forestGreen: {
          50: '#f3f6f3',
          100: '#e4ebe4',
          200: '#cad7ca',
          300: '#a5bca6',
          400: '#7a9b7c',
          500: '#5a7f5c',
          600: '#456547',
          700: '#37503a',
          800: '#2d4130',
          900: '#263728',
        },
        darkLeather: {
          50: '#f6f5f4',
          100: '#e7e5e4',
          200: '#d1ccc9',
          300: '#b5aea8',
          400: '#978f86',
          500: '#82786d',
          600: '#6b6158',
          700: '#584f47',
          800: '#4a433d',
          900: '#3f3935',
        },
        parchment: {
          50: '#fdfcfb',
          100: '#fcf9f5',
          200: '#f9f3e9',
          300: '#f5eadb',
          400: '#eddcc3',
          500: '#e3c89a',
          600: '#d4ab6d',
          700: '#c08f4f',
          800: '#a17344',
          900: '#865f3b',
        },
        gold: {
          50: '#fefaec',
          100: '#fdf2ca',
          200: '#fbe490',
          300: '#f9d056',
          400: '#f7bc2e',
          500: '#f19c13',
          600: '#d5750d',
          700: '#b1530e',
          800: '#904012',
          900: '#763513',
        },
      },
      fontFamily: {
        serif: ['Crimson Text', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(241, 156, 19, 0.3)',
        'book': '0 10px 30px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(241, 156, 19, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(241, 156, 19, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
