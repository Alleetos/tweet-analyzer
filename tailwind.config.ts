import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#1E90FF', // Azul forte
        secondary: '#FFD700', // Dourado
        accent: '#FF6347', // Tomate
        neutral: '#2F4F4F', // Cinza escuro
        background: '#F0F8FF', // Alice blue
      },
    },
  },
  plugins: [],
};
export default config;
