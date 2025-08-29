// FILE: client/tailwind.config.js (Updated Theme)
// =======================================================
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#19dfbeff',
        'brand-card': '#3b1e20ff',
        'brand-purple': '#f65c64ff',
        'brand-purple-hover': '#20cf5aff',
        'text-light': '#c58a3cff',
        'text-muted': '#94A3B8',
      }
    },
  },
  plugins: [],
};

