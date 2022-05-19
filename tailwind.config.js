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
        brown: {
          primary: '#DB9069',
          secondary: '#DBA569'
        }
      },
      backgroundImage: {
        'cover-side': `url('../src/images/cover.jpg')`
      }
    },
  },
  plugins: [],
}