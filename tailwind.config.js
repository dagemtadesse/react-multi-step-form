/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        aquaBlue: "hsl(213, 96%, 18%)",
        marineblue: "hsl(213, 96%, 18%)",
        purplishblue: "hsl(243, 100%, 62%)",
        pastelblue: "hsl(228, 100%, 84%)",
        lightblue: "hsl(206, 94%, 87%)",
        strawberryred: " hsl(354, 84%, 57%)",

        coolgray: " hsl(231, 11%, 63%)",
        lightgray: "hsl(229, 24%, 87%)",
        magnolia: "hsl(217, 100%, 97%)",
        alabaster: "hsl(231, 100%, 99%)",
        white: "hsl(0, 0%, 100%)",
      },
      backgroundImage: {
        sidebarBgDesktop: 'url("/bg-sidebar-desktop.svg")',
        sidebarBgMobile: 'url("/bg-sidebar-mobile.svg")',
      },
      fontFamily: {
        'ubuntu': "Ubuntu"
      }
    },
  },
  plugins: [],
};
