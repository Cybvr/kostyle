/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kostyle: {
          primary: '#ffe199',
          'primary-dark': '#e6cb8a',
        },
        background: '#0a0a0a',
        foreground: '#ededed',
        card: '#1a1a1a',
        'card-foreground': '#ededed',
        border: '#2a2a2a',
        muted: '#262626',
        'muted-foreground': '#a0a0a0',
      },
    },
  },
  plugins: [],
};
