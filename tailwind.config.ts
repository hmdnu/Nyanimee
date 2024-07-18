import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#282C3A",
        secondary: "#1F222E",
        tertiary: "#33344E",
      },
    },
  },
  plugins: [],
} satisfies Config;
