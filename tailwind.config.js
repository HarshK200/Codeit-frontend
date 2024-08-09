/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar-bg": "#282828",
        "navbar-boder": "#464646",
        "main-body-bg": "#1A1A1A",
        "main-white": "#FFFFFF",
        "easy-green": "#00B8A3",
        "main-grey": "#D9D9D9",
        "main-dark": "#AAAAAA",
        "hover-blue": "#0A84FF",
        "code-bg": "#282828",
        "example-text": "#A8A8A8",
        "case-bg-code":"#3C3C3C",
        "testcase-green": "#02B128",
      },
      padding: {
        84: "22rem",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        "signup-box": "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
