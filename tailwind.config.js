/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar-bg": "#E4E4E4",
        "main-white": "#FFFFFF",
        "main-green": "#6DFF96",
        "main-grey": "#D9D9D9",
        "main-dark": "#AAAAAA",
      },
    },
  },
  plugins: [],
};
