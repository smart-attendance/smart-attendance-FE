module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      primary: ["MaisonNeue", "monospace"],
    },
    extend: {
      colors: {
        green: {
          primary: "#66BB6A",
          secondary: "#8CDBA9",
          ternary: "#D5F591",
        },
      },
      backgroundImage: {
        "cover-side": `url('../src/images/cover.jpg')`,
      },
    },
    keyframes: {
      ping: {
        "0%": {
          opacity: "25%",
        },
        "75%, 100%": {
          transform: "scale(2)",
          opacity: "0%",
        },
      },
      rotate: {
        "0%": {
          transform: "scale(1) rotate(360deg)",
        },
        "50%": {
          transform: "scale(0.8) rotate(-360deg)",
        },
        "100%": {
          transform: "scale(1) rotate(360deg)",
        },
      },
    },
    animation: {
      ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      rotate: "rotate 5s linear infinite",
    },
  },
  plugins: [],
};