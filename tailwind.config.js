/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {      
        fontFamily: {
        'times': ['Times New Roman', 'Times', 'serif'],
        'serif': ['Times New Roman', 'Times', 'serif'],
      }},
  },
  plugins: [],
}