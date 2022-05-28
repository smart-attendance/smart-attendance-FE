module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      primary: ['OpenSans', 'sans-serif'],
    },
    extend: {
      colors: {
        green: {
          primary: '#33FF33',
          secondary: '#8CDBA9',
          ternary: '#D5F591'
        }
      },
      backgroundImage: {
        'cover-side': `url('../src/images/cover.jpg')`
      }
    },
  },
  plugins: [],
}