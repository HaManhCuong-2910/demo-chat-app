/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      screens: {
        sm: "641px",
        md: "728px",
        lg: "984px",
        xl: "1300px",
        "2xl": "1300px",
      },
    },
    extend: {},
  },
  plugins: [],
};
