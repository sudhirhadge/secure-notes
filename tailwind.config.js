/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg: '#0c0c0e',
        surface: '#141418',
        surface2: '#1c1c22',
        surface3: '#24242c',
        border: '#2e2e3a',
        accent: '#e8c87a',
        accent2: '#c9a85c',
        danger: '#e05c5c',
        success: '#5cb88a',
        text1: '#f0ede8',
        text2: '#9e9ba8',
        text3: '#5e5b6a',
      },
    },
  },
  plugins: [],
}
