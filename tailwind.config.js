/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1672B1',
          50: '#F0F7FB',
          100: '#D6E8F3',
          200: '#ADD1E7',
          300: '#84B9DB',
          400: '#4B9BCB',
          500: '#1672B1',
          600: '#125E92',
          700: '#0E4972',
          800: '#093350',
          900: '#051C2C',
        },
        navy: {
          DEFAULT: '#082B49',
          950: '#041627',
          900: '#062037',
          800: '#0A3357',
          700: '#0E3D66',
          600: '#154E80',
        },
        aqua: {
          DEFAULT: '#63B9D1',
          light: '#8ED2E4',
          dark: '#3A9BB7',
          glow: 'rgba(99, 185, 209, 0.35)',
        },
        mist: {
          DEFAULT: '#EAF3F6',
          light: '#F5F9FA',
          dark: '#D5E6EC',
        },
        ivory: {
          DEFAULT: '#F3EEE5',
          light: '#FAF7F2',
          dark: '#E5DCce',
        },
        gold: {
          DEFAULT: '#C9A16B',
          light: '#DCBF93',
          dark: '#A67F47',
        },
        rose: {
          DEFAULT: '#E9B7BE',
          light: '#F3D4D9',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(4, 22, 39, 0.45)',
        'glow-aqua': '0 0 35px rgba(99, 185, 209, 0.28)',
        'glow-gold': '0 0 30px rgba(201, 161, 107, 0.25)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 12px 40px rgba(8, 43, 73, 0.08)',
      },
      animation: {
        'caustic': 'caustic 18s ease-in-out infinite alternate',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        caustic: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-4%, 3%) scale(1.08)' },
          '100%': { transform: 'translate(3%, -2%) scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
