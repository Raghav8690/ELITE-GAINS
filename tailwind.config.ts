import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: "#FFCA28",
          500: "#FFC107",
          600: "#FFB300",
        },
        dark: {
          900: "#000000",
          800: "#0a0a0a",
          700: "#111111",
          600: "#1a1a1a",
          500: "#222222",
          400: "#2a2a2a",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "scroll-indicator": "scrollIndicator 1.5s ease-in-out infinite",
        "counter-up": "counterUp 0.5s ease-out",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 193, 7, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 193, 7, 0.8), 0 0 60px rgba(255, 193, 7, 0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollIndicator: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(12px)", opacity: "0" },
        },
        counterUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "yellow-glow": "radial-gradient(circle, rgba(255,193,7,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
