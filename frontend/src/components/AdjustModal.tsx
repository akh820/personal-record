import React from "react";
import { Modal, View, Pressable, ScrollView } from "react-native";
import Text from "./AppText";

type Mode = "time" | "count";

type Props = {
  visible: boolean;
  onClose: () => void;
  label: string; // "운동", "휴식", "세트", "싸이클"
  value: string; // 표시값 "00:20" 또는 "8"
  mode: Mode;
};

// 빠른 조절 키 (모드별)
const QUICK: Record<Mode, string[]> = {
  time: ["−30", "−10", "+10", "+30"],
  count: ["−5", "−1", "+1", "+5"],
};

// 휠 치수
const ROW = 44; // 한 칸 높이
const PICKER_H = ROW * 5; // 5칸 보임 (가운데가 선택)
const NUMBERS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

// 드래그로 돌리는 숫자 휠 (분/초 공용)
function Wheel() {
  return (
    <View style={{ height: PICKER_H }} className="flex-1">
      {/* 선택 밴드 (뒤) */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: ROW * 2,
          height: ROW,
          left: 0,
          right: 0,
        }}
        className="bg-signal-tint border-y border-signal-line"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ROW}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: ROW * 2 }}
      >
        {NUMBERS.map((n) => (
          <View
            key={n}
            style={{ height: ROW }}
            className="items-center justify-center"
          >
            <Text className="font-mono font-semibold text-[24px] text-ink">
              {n}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* 위/아래 페이드 (앞) */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: ROW * 2,
        }}
        className="bg-white opacity-70"
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: ROW * 2,
        }}
        className="bg-white opacity-70"
      />
    </View>
  );
}

export default function AdjustModal({
  visible,
  onClose,
  label,
  value,
  mode,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* 어두운 배경 — 누르면 닫힘 (시트 뒤에 깔림) */}
        <Pressable
          onPress={onClose}
          className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"
        />
        {/* 시트 본체 — 일반 View (Pressable로 감싸면 안의 휠 스크롤이 막힘) */}
        <View className="bg-white rounded-t-[28px] px-5 pt-3 pb-9">
          {/* 핸들 */}
          <View className="w-[44px] h-[5px] rounded-full bg-line self-center mb-4" />

          <Text className="text-center font-semibold text-[12px] text-muted tracking-widest uppercase">
            {label}
          </Text>
          <Text className="text-center font-mono font-bold text-[54px] text-ink mt-1">
            {value}
          </Text>

          {/* 빠른 조절 */}
          <View className="flex-row gap-2 mt-5">
            {QUICK[mode].map((q) => (
              <View
                key={q}
                className="flex-1 h-[52px] rounded-2xl bg-signal-tint items-center justify-center"
              >
                <Text className="font-mono font-bold text-[16px] text-signal-deep">
                  {q}
                </Text>
              </View>
            ))}
          </View>

          {/* 드래그 휠 (시간 모드만) — 분 : 초 */}
          {mode === "time" && (
            <View className="mt-4">
              <View className="flex-row items-center">
                <Wheel />
                <Text className="w-6 text-center font-mono font-bold text-[26px] text-muted">
                  :
                </Text>
                <Wheel />
              </View>
            </View>
          )}

          {/* 확인 */}
          <Pressable
            onPress={onClose}
            className="h-[54px] rounded-2xl bg-signal items-center justify-center mt-5 active:opacity-90"
          >
            <Text className="font-bold text-[16px] text-white">확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
