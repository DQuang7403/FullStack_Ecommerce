/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DB4444",
        primary_hover: "#BB232D",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        bubble_gum: "#ff77e9",
        bermuda: "#78dcca",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DB4444",

          secondary: "#BB232D",

          accent: "#0ea5e9",

          neutral: "#d1d5db",

          "base-100": "#ffffff",

          info: "#06b6d4",

          success: "#34d399",

          warning: "#fcd34d",

          error: "#f43f5e",
        },
      },
    ],
  },
};
