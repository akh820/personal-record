import { Text, TextProps, StyleSheet } from "react-native";

/**
 * fontWeight → 등록된 폰트 파일명 매핑
 * NativeWind의 font-semibold(600), font-bold(700), font-extrabold(800) 등이
 * 올바른 폰트 파일을 사용하도록 변환
 */
const WEIGHT_MAP: Record<string, string> = {
  "100": "HankenGrotesk",
  "200": "HankenGrotesk",
  "300": "HankenGrotesk",
  "400": "HankenGrotesk",
  normal: "HankenGrotesk",
  "500": "HankenGrotesk-Medium",
  "600": "HankenGrotesk-SemiBold",
  "700": "HankenGrotesk-Bold",
  bold: "HankenGrotesk-Bold",
  "800": "HankenGrotesk-ExtraBold",
  "900": "HankenGrotesk-Black",
};

export default function AppText({ style, className, ...props }: TextProps) {
  // NativeWind가 className → style로 변환한 결과에서 fontWeight 추출
  const flatStyle = StyleSheet.flatten(style) || {};
  const weight = String(flatStyle.fontWeight ?? "400");
  const fontFamily = WEIGHT_MAP[weight] ?? "HankenGrotesk";

  return (
    <Text
      className={className}
      style={[style, { fontFamily, fontWeight: undefined }]}
      {...props}
    />
  );
}
