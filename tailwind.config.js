const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        blue: colors.blue,
        slate: colors.slate,
        'highlight': '#ff0'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'Raleway': ['Raleway', 'sans-serif'],
        'Graphik': ['Graphik', 'sans-serif'],
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        'shine': {
          '0%': { backgroundPosition: '-100%' },
          '100%': { backgroundPosition: '100%' },
        },
        'preload': {
          '30%': {
            opacity: 0,
            top: '20px'
          },
          '100%': {
            opacity: 1,
            top: '8px'
          }
        }
      },
      animation: {
        shine: 'shine 2s ease-in-out',
        preload: 'preload 1s ease-in-out forwards'
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}