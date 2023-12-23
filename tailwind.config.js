const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  {
      relateive: true,
      files: [
        "./_includes/layouts/**/*.{html,js}",
        "./content/**/*.{html,js}"
      ]
  },
  theme: {
    
    extend: {
      colors: {
        'hf-green': '#00cc33',
        'hf-yellow': '#ffcc33',
        'hf-red': '#ff3366',
        'hf-blue': '#3333ff',
        'hf-light-blue': '#00ccff',
        'haxe': {
          '50': '#fff200',
          '100': '#ffcb08',
          '200': '#fdb813',
          '300': '#faa61a',
          '400': '#EA8220',
          '500': '#f58220',
          '600': '#f36f21',
          '700': '#f15922',
          '800': '#f68b2d',
          DEFAULT: '#EA8220',
        },
        'social': {
          "github": colors.purple,
          "twitter": "#1DA1F2",
          "discord": "#5865F2",
          "patreon": "#F96854",
          
        },

      }
    },
  },
  plugins: [],
}