/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['DM Serif Display', 'DM Serif Text', 'Times New Roman', 'serif'],
        'body': ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        'sans': ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        'serif': ['DM Serif Display', 'DM Serif Text', 'Times New Roman', 'serif'],
        'mono': ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        umber: {
          50: '#F7F6F4',
          100: '#EDEAE5',
          200: '#DDD7CC',
          300: '#C8BCA8',
          400: '#B09E85',
          500: '#998772',
          600: '#535147',
          700: '#3F3E37',
          800: '#2A2A24',
          900: '#1A1A16',
        },
        moss: {
          50: '#F2F4F2',
          100: '#E3E7E2',
          200: '#C9D2C7',
          300: '#A8B8A4',
          400: '#819681',
          500: '#6B7D67',
          600: '#5B6F57',
          700: '#485449',
          800: '#353A34',
          900: '#242622',
        },
        ochre: {
          50: '#FBF8F3',
          100: '#F5EFE4',
          200: '#EDDCC5',
          300: '#E2C39F',
          400: '#CDA47D',
          500: '#B8915F',
          600: '#A07A47',
          700: '#7A5D36',
          800: '#574028',
          900: '#3A2A1A',
        },
      },
    },
  },
  plugins: [],
}
