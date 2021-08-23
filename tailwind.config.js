module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ['group-focus'],
      display: ["group-hover"],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
