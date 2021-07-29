const { colors, fontFamily } = require('./config')
module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './shared/components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      fontFamily,
      animation: {
        float: 'float 6s linear infinite',
        wiggle: 'wiggle 6s linear infinite',
        scale: 'scale 6s ease-in infinite',
        fade: 'fade 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-100px)' },
        },
        wiggle: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-20px)' },
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '90%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        fade: {
          '0%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl'),
    require('@tailwindcss/typography'),
  ],
}
