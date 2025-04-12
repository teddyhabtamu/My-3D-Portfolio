/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  safelist: [
    "text-white",
    "text-secondary",
    "bg-tertiary",
    "rounded-2xl",
    "w-full",
    "h-full",
    "object-cover",
    "text-[14px]",
    "text-[24px]",
    "flex",
    "flex-wrap",
    "gap-2",
    "justify-center",
    "items-center",
    "cursor-pointer",
    "w-10",
    "h-10",
    "black-gradient",
    "absolute",
    "inset-0",
    "m-3",
    "card-img_hover",
    // Add your tag colors if they're dynamic
    "text-blue-500",
    "text-green-500",
    "text-pink-500",
    "text-yellow-500",
    "text-purple-500",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
