/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DB4444",

          secondary: "#ef4444",

          accent: "#0ea5e9",

          neutral: "#93c5fd ",

          "base-100": "#f3f4f6",

          info: "#67e8f9",

          success: "#34d399",

          warning: "#fcd34d",

          error: "#f43f5e",
        },
      },
    ],
  },
};
