import sharedConfig from '@sushiswap/tailwindcss-config'
import colors from 'tailwindcss/colors'

// @ts-check
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: 'class',
  presets: [sharedConfig],
  theme: {
    // screens: {
    //   vs: '425px',
    //   sm: '576px',
    //   md: '768px',
    //   lg: '992px',
    //   xl: '1200px',
    //   xxl: '1440px',
    // },
    colors: {
      primary: '#6bffff',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      red: colors.red,
      slate: colors.slate,
      neutral: colors.neutral,
      transparent: 'transparent'
    },
    extend: {
      fontFamily: {
        display: 'Metuo Personal Use, sans-serif',
      },
      display: ['group-hover'],
      visibility: ['group-hover'],
      keyframes: {
        dash: {
          to: {
            'stroke-dashoffset': '0',
          },
        },
      },
    },
  },
}

export default tailwindConfig
