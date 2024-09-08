/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "dark-lg": "0px 3px 10px -1px rgba(0, 0, 0, 0.6)",
        "dark-hz": " 3px 0px 3px -2px rgba(0, 0, 0, 0.6)",
        "dark-bt": " 0px 3px 3px -2px rgba(0, 0, 0, 0.6)",
        // Add more custom shadows if needed
      },
      colors: {
        customgray: "#93B1A6",
        primary: "#5C8374",
        secondary: "#183D3D",
        customblack: "#040D12",
      },
      fontFamily: {
        poppins: ["Poppins"],
        playfair: ["Playfair Display"],
      },
    },
  },
};
