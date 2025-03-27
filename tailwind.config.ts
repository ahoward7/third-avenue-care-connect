/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    colors: {
      purple: '#AD92B1',
      green: '#BBCCBF',
      yellow: '#E2B146',
      white: '#FFFFFF',
      gray: '#828282',
      lightgray: '#E8E8E8',
      red: '#FF0000',
    },
    extend: {
      fontFamily: {
        wedges: ['Wedges'],
        hand: ['Just Another Hand'],
        inter: ['Inter'],
      },
    },
  },
}
