/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // onda design language
        ground: "#080B09",
        surface: "#10120F",
        "surface-2": "#191B17",
        ink: "#F9FAFB",
        "ink-soft": "#B0B8C4",
        "ink-muted": "#8B93A6",
        brand: {
          DEFAULT: "#F03E8C",
          dark: "#C5286B",
        },
        live: "#00E676", // presence / active
        wave: "#40E8FF", // cyan accent
        gold: "#F59E0B", // amber accent
      },
      fontFamily: {
        display: [
          "Fredoka",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        zain: ["Zain", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 2s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
      backgroundSize: {
        400: "400% 400%",
      },
    },
  },
  plugins: [],
};
