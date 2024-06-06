/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3E59',
        secondary: '#1F2937',
        tertiary: '#5E6F7F',
        'gray-primary': '#D7D7D7',
        'gray-secondary': '#6E6E73',
        'border-primary': '#4E7DA6',
        'black-primary': '#262C3A',
        'black-secondary': '#282828',
        'primary-shade-1': '#44627F',
        'primary-shade-2': '#E5ECF2',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        catShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        card: '0px 4px 6px 2px rgba(187, 170, 204, 0.15);',
        cardHover: '0px 4px 4px 0px rgba(245, 242, 248, 1)',
        support: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
        dropDown:
          '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.20);',
        compare: '-0.874px 3.496px 6.991px 1.748px rgba(68, 52, 84, 0.20);',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};
