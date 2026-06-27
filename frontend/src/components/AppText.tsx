import { Text, TextProps } from "react-native";

/**
 * className에 적힌 굵기 토큰 → 실제 등록된 Hanken Grotesk 폰트 파일명 매핑.
 * (NativeWind의 font-bold는 fontWeight:700만 줄 뿐, 별도 파일로 등록된
 *  HankenGrotesk-Bold를 자동으로 골라주지 못하므로 직접 매핑한다.)
 */
const SANS_BY_WEIGHT: Record<string, string> = {
  "500": "HankenGrotesk-Medium",
  "600": "HankenGrotesk-SemiBold",
  "700": "HankenGrotesk-Bold",
  "800": "HankenGrotesk-ExtraBold",
  "900": "HankenGrotesk-Black",
};

// className 문자열에서 굵기 토큰을 숫자 weight로
function weightFromClassName(className: string): string {
  if (/\bfont-black\b/.test(className)) return "900";
  if (/\bfont-extrabold\b/.test(className)) return "800";
  if (/\bfont-bold\b/.test(className)) return "700";
  if (/\bfont-semibold\b/.test(className)) return "600";
  if (/\bfont-medium\b/.test(className)) return "500";
  return "400";
}

export default function AppText({ style, className = "", ...props }: TextProps) {
  const isMono = /\bfont-mono\b/.test(className);
  const weight = weightFromClassName(className);
  const isHeavy = weight === "600" || weight === "700" || weight === "800" || weight === "900";

  // mono는 Regular/Bold 두 파일만 등록되어 있어 굵으면 Bold로 수렴
  const fontFamily = isMono
    ? isHeavy
      ? "IBMPlexMono-Bold"
      : "IBMPlexMono"
    : SANS_BY_WEIGHT[weight] ?? "HankenGrotesk";

  return (
    <Text
      className={className}
      // 폰트 파일 자체가 굵기를 가지므로 fontWeight는 normal로 눌러
      // 브라우저의 가짜 볼드(faux-bold) 중복을 막는다
      style={[style, { fontFamily, fontWeight: "normal" }]}
      {...props}
    />
  );
}
