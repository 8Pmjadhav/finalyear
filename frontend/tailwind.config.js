/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'smmd':'700px',

      'md': '940px',
      // => @media (min-width: 960px) { ... }
      
      'mdlg':'1340px',
      'mglglg':'1420px',
      'lg': '1740px',

      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}

