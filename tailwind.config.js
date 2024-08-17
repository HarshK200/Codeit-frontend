/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-text-color": "#ECE2E7",
        "logo-color": "#B88BB5",
        "secondary-body-bg": "#3E315E",
        "body-bg": "#1B0929",
        "navbar-bg": "#140323",
        "navbar-boder": "#464646",
        "main-body-bg": "#1A1A1A",
        "problem-page-bg": "#121212",
        "main-white": "#FFFFFF",
        "easy-green": "#00B8A3",
        "main-grey": "#D9D9D9",
        "main-dark": "#AAAAAA",
        "hover-blue": "#0A84FF",
        "code-bg": "#282828",
        "example-text": "#A8A8A8",
        "case-bg-code": "#3C3C3C",
        "testcase-green": "#02B128",
        //catpuccin colors
        "catppuccin-green": "#a6e3a1",
        "catppuccin-yellow": "#f9e2af",
        "catppuccin-red": "#f38ba8",
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
