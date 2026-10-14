/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF7F0",
        sage: {
          light: "#C4CFB6",
          DEFAULT: "#93A57F",
          dark: "#5F6E4F",
        },
        beige: {
          light: "#F1E9D8",
          DEFAULT: "#E5D8BE",
          dark: "#CDB98F",
        },
        brown: {
          light: "#9C8064",
          DEFAULT: "#6F4E37",
          dark: "#4A3323",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
