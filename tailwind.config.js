/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dreamy-white": "#EFF4F8",
        "dreamy-blue": "#COD3E4",
        "dreamy-pink": "#F3DBE9",
        "dreamy-dark": "#465375",
      },
    },
  },
  plugins: [],
};
