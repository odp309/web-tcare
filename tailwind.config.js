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
        greenStatus: "#00B14A",
        blueStatus: "#1274D7",
        orangeStatus: "#F5980C",
        blueBgStatus: "#E8F2FC",
        greenBgStatus: "#E6F8ED",
        orangeBgStatus: "#FFF5E7",
        neutral300: "#858585",
        neutral50: "#E0E0E0",
        neutral200: "#A3A3A3",
      },
      backgroundImage: {
        landingPage: "url('/assets/backgroundLanding.png')",
        landingPage2: "url('/assets/backgroundLanding-2.png')",
        card1: "url('/assets/card-1.png')",
        card2: "url('/assets/card-2.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
