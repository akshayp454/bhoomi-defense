import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06080e",
        surface: "#0c111c",
        "surface-raised": "#121926",
        "surface-border": "#1e293b",
        tactical: {
          emerald: "#10b981",
          cyan: "#06b6d4",
          amber: "#f59e0b",
          red: "#ef4444",
          purple: "#8b5cf6",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radar 4s linear infinite",
        "scan-line": "scanline 6s linear infinite",
        "glow-slow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        glow: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.8" },
        },
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
        "tactical-gradient": "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
      },
    },
  },
  plugins: [],
};

export default config;
