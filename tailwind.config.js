/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        greenPrimary: "#004F65",
        bluePrimary: "#0092BB",
        lightBlue: "#CEE2E8",
        redDanger: "#F24538",
      },
    },
  },
  plugins: [require("daisyui")],
};
