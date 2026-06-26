/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,tsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#14181C",
        signal: {
          DEFAULT: "#16A65C",
          deep: "#0C7A40",
          tint: "#EAF6F0",
          line: "#C9E8D8",
        },
        surface: "#F4F6F5",
        line: "#E8EAE8",
        muted: "#9BA1A4",
        faint: "#C4C8C6",
      },
      fontFamily: {
        sans: ["HankenGrotesk"],
        mono: ["IBMPlexMono"],
      },
    },
  },
  plugins: [],
};
