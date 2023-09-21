/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    colors:{
      primary:{
        800:'#b141fc'
      },
      secondary:{
        400:'#ffd8fc'
      }
    }
  },
},
  plugins: [],
}