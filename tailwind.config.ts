import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stroman: {
          50: "#f0f8f4",
          100: "#dbf0e4",
          200: "#b8e1cc",
          300: "#8acbb0",
          400: "#55ae8e",
          500: "#008f57",
          600: "#006C41", // Stroman primary green
          700: "#005634",
          800: "#00452a",
          900: "#003923",
          950: "#002013",
        },
        steel: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-lato)", "Lato", "var(--font-roboto)", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
