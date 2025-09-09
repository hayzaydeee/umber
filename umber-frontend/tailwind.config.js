/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // No need for darkMode config in v4 - handled by @custom-variant in CSS
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Serif Display', 'DM Serif Text', 'Times New Roman', 'serif'],
        body: ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}