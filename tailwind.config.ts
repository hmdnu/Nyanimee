import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#282C3A",
        "primary-hover": "#3F465F",
        secondary: "#1F222E",
        "secondary-hover": "#33374b",
        tertiary: "#33344E",
      },
    },
  },
  plugins: [],
} satisfies Config;
