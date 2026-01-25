/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        bgSoft: "#EFF6FF",
        textMain: "#0F172A",
        textSecondary: "#475569",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
}