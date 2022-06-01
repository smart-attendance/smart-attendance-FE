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
    keyframes: {
      ping: {
        "0%": {
          opacity: "25%"
        },
        "75%, 100%": {
          transform: "scale(2)",
          opacity: "0%"
        }
      }
    },
    animation: {
      ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
    }
  },
  plugins: [],
}