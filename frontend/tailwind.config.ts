import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { coral: "#ff4d60" } } },
  plugins: [],
} satisfies Config;
