import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "nord",
      {
        mytheme: {
          primary: "#0d7377",
          secondary: "#14ffec",
          accent: "#323232",
          neutral: "#1f1f1f",
          "base-100": "#181818",
          info: "#0d7377",
          success: "#21bf73",
          warning: "#ffa41b",
          error: "#ff4f5a",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.25s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": "1rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
export default config;
