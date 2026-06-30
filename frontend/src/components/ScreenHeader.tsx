import React from "react";
import { View } from "react-native";
import Text from "./AppText";
import BackButton from "./BackButton";

type Props = {
  title: string;
  subtitle?: string; // 제목 아래 보조 텍스트 (예: "상체 A · 운동 2/6")
  onBack?: () => void; // 안 넘기면 BackButton이 router.back()
  right?: React.ReactNode; // 오른쪽 액션 (햄버거 메뉴 등), 없으면 빈 칸
};

export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: Props) {
  return (
    <View className="flex-row items-center px-5 py-2">
      {/* 왼쪽: 뒤로 (38px 고정) */}
      <View className="w-[38px] items-start">
        <BackButton onPress={onBack} />
      </View>

      {/* 가운데: 제목 (flex-1로 중앙) */}
      <View className="flex-1 items-center">
        <Text className="font-bold text-[17px] text-ink">{title}</Text>
        {subtitle ? (
          <Text className="font-medium text-[12px] text-muted">{subtitle}</Text>
        ) : null}
      </View>

      {/* 오른쪽: 액션 (38px 고정 — 좌우 대칭으로 제목 중앙 유지) */}
      <View className="w-[38px] items-end">{right}</View>
    </View>
  );
}
