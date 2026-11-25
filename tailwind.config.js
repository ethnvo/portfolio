/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // onda teaser palette
        ink: "#080B09",
        paper: "#F9FAFB",
        sky: "#8EE0F0",
        ice: "#D3E3EE",
        pink: "#F63386",
        sun: "#FFD12E",
        live: "#00E676",
        mute: "#8B93A6",
        // Roles that change with the theme. Their values live in src/index.css.
        frame: "var(--frame)",
        "on-frame": "var(--on-frame)",
        calm: "var(--calm)",
        "on-calm": "var(--on-calm)",
        bench: "var(--bench)",
        soft: "var(--soft)",
        rule: "var(--rule)",
      },
      fontFamily: {
        sans: [
          "Allo",
          '"Allo Fallback"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
