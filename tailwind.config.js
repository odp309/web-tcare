/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        greenPrimary: "#004F65",
        bluePrimary: "#0092BB",
        redDanger: "#F24538",
      },
    },
  },
  plugins: [require("daisyui")],
};
