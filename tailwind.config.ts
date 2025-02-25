import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        nit: "#ABAAB8", // NOT IMPORTANT TEXT
        secondary: "#121212",
        primary: "#00FF99",
        container: "#242424",
        hover_container: "#292929",
        card_item: "#363636",
      },
    },
  },
  plugins: [],
} satisfies Config;
