import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aeth: {
          void: "#081322",
          navy: "#142A45",
          gold: "#D6B46A",
          silver: "#D7DFE8",
          teal: "#72CFC5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Cinzel", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
