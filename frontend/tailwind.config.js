/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: true,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
  themes: [
    {
      mytheme: {
        primary: "#ffffff",

        secondary: "#f5f5f5",

        accent: "#db4444",

        neutral: "#ffffff",

        "base-100": "#ffffff",

        info: "#3abff8",

        success: "#1fb2A6",

        warning: "#fbbd23",

        error: "#f87272",
      },
    },
  ],
};
