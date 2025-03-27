/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class', // Enable dark mode using 'class'
  theme: {
    extend: {
      screens: {        
        'sm': '640px',    // Small devices (phones in landscape mode)
        'md': '768px',    // Medium devices (tablets)
        'lg': '1024px',   // Large devices (desktops, laptops)
        'xl': '1280px',   // Extra large devices (large desktops, laptops)
        '2xl': '1536px',  // 2X large devices (larger desktops)
        '3xl': '1920px',  // 3X large devices (Full HD monitors)
        '4k': '3840px',   // 4K monitors
        '8k': '7680px',   // 8K monitors
      }
    },
  },
  plugins: [],
}

