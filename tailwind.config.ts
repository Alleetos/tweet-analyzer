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
        primary: "#3B3838", // Preto fosco
        sentiment: {
          positive: "#4CAF50", // Verde
          negative: "#F44336", // Vermelho
          neutral: "#FFC107", // Amarelo
        },
        // Cores para categorias
        category: {
          sadness: "#F44336", // Verde
          happiness: "#4CAF50", // Vermelho
          neutral: "#FFC107", // Amarelo
        },
      },
    },
  },
  plugins: [],
};
export default config;
