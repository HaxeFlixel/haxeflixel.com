const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        'vscode-theme-dark': {
          'background': '#1e1e1e',
          'function-declarations': '#DCDCAA',
          'types-declaration-and-references': '#4EC9B0',
          'types-declaration-and-references-ts': '#4EC9B0',
          'control-flow-special-keywords': '#C586C0',
          'variable-and-parameter-name': '#9CDCFE',
          'constants-and-enums': '#4FC1FF',
          'object-keys-ts': '#9CDCFE',
          'css-property-value': '#CE9178',
          'regular-expression-groups': '#CE9178',
          'character-class-regexp': '#d16969',
          'or-regexp': '#DCDCAA',
          'quantifier-regexp': '#d7ba7d',
          'character': '#569cd6',
          'character-escape': '#d7ba7d',
          'entity-name-label': '#C8C8C8',
          'newOperator': '#C586C0',
          'stringLiteral': '#ce9178',
          'customLiteral': '#DCDCAA',
          'numberLiteral': '#b5cea8',
          "comment": "#6A9955",
          "selector": "#569cd6",
          "attribute-name": "#9cdcfe",
          "punctuation": "#d4d4d4",
        },
        'vscode-theme-light': {
          'background': '#ffffff',
          'function-declarations': '#795E26',
          'types-declaration-and-references': '#267f99',
          'types-declaration-and-references-ts': '#267f99',
          'control-flow-special-keywords': '#AF00DB',
          'variable-and-parameter-name': '#001080',
          'constants-and-enums': '#0070C1',
          'object-keys-ts': '#001080',
          'css-property-value': '#0451a5',
          'regular-expression-groups': '#d16969',
          'character-class-regexp': '#811f3f',
          'quantifier-regexp': '#000000',
          'or-regexp': '#EE0000',
          'character': '#0000ff',
          'character-escape': '#EE0000',
          'entity-name-label': '#000000',
          'newOperator': '#AF00DB',
          'stringLiteral': '#a31515',
          'customLiteral': '#795E26',
          'numberLiteral': '#098658',
          'comment': '#008000',
          'selector': '#800000',
          "attribute-name": "#001080",
          "puncutation": "#000000",
          
        },
      }
    },
  },
  plugins: [],
}