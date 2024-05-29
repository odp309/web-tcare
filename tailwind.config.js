/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        greenPrimary: "#004F65",
        green500Primary: "#006885",
        bluePrimary: "#0092BB",
        lightBlue: "#CEE2E8",
        redDanger: "#F24538",
        yellowStar: "#FFB84D",
      },
    },
  },
  plugins: [require("daisyui")],
};
