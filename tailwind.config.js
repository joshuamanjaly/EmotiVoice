/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070A12',
          900: '#0B0F19',
          850: '#111726',
          800: '#1A2234',
          750: '#232D42',
          700: '#2E3A52',
          600: '#475569',
        },
        emotion: {
          happy: '#F59E0B',
          sad: '#3B82F6',
          angry: '#EF4444',
          fear: '#8B5CF6',
          neutral: '#14B8A6',
          disgust: '#10B981',
          surprise: '#EC4899',
          calm: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.0)' },
        }
      }
    },
  },
  plugins: [],
}
