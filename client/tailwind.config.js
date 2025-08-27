/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { mono: ['"Roboto Mono"', 'monospace'] },
      colors: {
        'ruby-darkest': '#2b0e0e',
        'ruby-dark': '#5b0000',
        'ruby-primary': '#a11d25',
        'ruby-bright': '#d10010',
        'text-light': '#ffffff',
        'text-muted': '#cccccc',
      },
      backgroundImage: { 'shining-diamond': 'linear-gradient(135deg, var(--tw-gradient-stops))' },
      boxShadow: {
        'diamond': '0 4px 8px rgba(255, 255, 255, 0.3)',
        'diamond-hover': '0 8px 16px rgba(255, 255, 255, 0.5)',
      }
    },
  },
  plugins: [],
};