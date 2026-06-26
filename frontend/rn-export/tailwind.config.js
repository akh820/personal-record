/** record — NativeWind theme tokens (matches the HTML design system) */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#14181C",          // 본문/제목 텍스트
        signal: {
          DEFAULT: "#16A65C",    // 시그널 그린 (primary)
          deep: "#0C7A40",       // 그린 텍스트 on light
          tint: "#EAF6F0",       // 그린 옅은 배경
          line: "#C9E8D8",       // 그린 옅은 보더
        },
        surface: "#F4F6F5",      // 옅은 회색 면
        line: "#E8EAE8",         // 보더
        muted: "#9BA1A4",        // 보조 텍스트
        faint: "#C4C8C6",        // 비활성 텍스트
      },
      fontFamily: {
        // 폰트 파일 링크 후 이름 일치시킬 것 (아래 README 참고)
        sans: ["HankenGrotesk"],
        mono: ["IBMPlexMono"],
      },
    },
  },
  plugins: [],
};
