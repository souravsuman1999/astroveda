/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0e27',
          light: '#1a1f3a',
        },
        accent: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
        },
        highlight: '#7c3aed',
      },
    },
  },
  plugins: [],
}

