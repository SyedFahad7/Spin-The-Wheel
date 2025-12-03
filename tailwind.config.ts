import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./prizes.ts"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A84FF",
        secondary: "#111111",
        accent: "#F2F2F2",
        success: "#28C840",
        error: "#FF453A"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
};

export default config;


