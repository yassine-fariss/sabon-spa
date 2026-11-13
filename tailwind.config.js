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
        'float-mid': 'float 12s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'fade-in': 'fadeIn 0.7s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'shimmer-sweep': 'shimmerSweep 3s linear infinite',
        'orb-float': 'orbFloat 10s ease-in-out infinite',
        'drift-x': 'driftX 30s ease-in-out infinite alternate',
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
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmerSweep: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '33%': { transform: 'translateY(-18px) scale(1.04)' },
          '66%': { transform: 'translateY(10px) scale(0.97)' },
        },
        driftX: {
          '0%': { transform: 'translateX(0) scale(1.06)' },
          '100%': { transform: 'translateX(-2.5%) scale(1.06)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.35, 0.64, 1)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '107': '1.07',
        '108': '1.08',
      }
    },
  },
  plugins: [],
}
