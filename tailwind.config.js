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
        primary: {
          50: '#f0f9ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          500: '#ec4899',
          600: '#db2777',
        },
        light: {
          50: '#fdfbff',
          100: '#f8f4ff',
          200: '#f1e8ff',
          300: '#e9d5ff',
          400: '#d8b4fe',
          500: '#c084fc',
          600: '#a855f7',
          700: '#9333ea',
          800: '#7e22ce',
          900: '#6b21a8',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s ease-in-out',
      }
    },
  },
  plugins: [],
}