/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        prime: "#424874",
        sec: "#A6B1E1",
        acsent: "#DCD6F7",
        ter: "#F4EEFF",
      },
      fontFamily: {
        lob: "Lobster",
        pop: "Poppins",
        mont: "Montserrat",
      },
    },
  },
  plugins: [],
};
