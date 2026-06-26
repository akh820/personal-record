import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignalLine, SignalGlyph } from "../components/SignalLine";

/**
 * 운동 중 화면 — 컨셉 C (신호 그래프형, 시그니처)
 * 세션 전체가 한 줄 신호. 각 세트 = 매듭. 기록하면 매듭이 찍히고 휴식 시작.
 */
export default function ActiveWorkoutScreen({ onLogSet }: { onLogSet?: () => void }) {
  // 세트별 신호 노드 (viewBox 324x150). 3번째가 현재.
  const sets: [number, number][] = [
    [16, 70], [90, 60], [164, 80], [238, 46], [308, 64],
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
        {/* 상단: 경과시간 + 진행 */}
        <View className="flex-row items-center justify-between px-[22px] pt-2">
          <View className="flex-row items-center gap-2.5">
            <SignalGlyph />
            <Text className="font-mono font-semibold text-[14px] text-ink tracking-tight">42:18</Text>
          </View>
          <Text className="font-sans font-semibold text-[13px] text-muted">상체 A · 3/6</Text>
        </View>

        {/* 종목 */}
        <View className="items-center pt-6 pb-0.5">
          <Text className="font-mono text-[12px] text-muted tracking-[2px]">SESSION SIGNAL</Text>
          <Text className="font-sans font-bold text-[26px] text-ink tracking-tight mt-2">벤치프레스</Text>
          <Text className="font-sans text-[13px] text-muted mt-0.5">바벨 · 가슴</Text>
        </View>

        {/* 세션 신호 그래프 */}
        <View className="px-[22px] pt-6">
          <SignalLine points={sets} width={324} height={150} progressIndex={2} fill baseline={125} />
          <View className="flex-row justify-between px-1.5 pt-1.5">
            {["S1", "S2", "S3", "S4", "S5"].map((s, i) => (
              <Text key={s} className={`font-mono text-[11px] ${i === 2 ? "text-signal-deep" : "text-muted"}`}>
                {s}
              </Text>
            ))}
          </View>
        </View>

        {/* 현재 세트 목표 + 기록 버튼 */}
        <View className="mx-5 mt-[18px] border border-line rounded-[20px] p-5 flex-row items-center justify-between">
          <View>
            <Text className="font-sans font-semibold text-[11px] text-muted tracking-widest uppercase">
              세트 3 · 목표
            </Text>
            <Text className="font-mono font-semibold text-[34px] text-ink tracking-tight mt-1">
              60<Text className="text-[16px] text-muted">kg</Text> × 8
            </Text>
          </View>
          <Pressable
            onPress={onLogSet}
            className="w-[62px] h-[62px] rounded-[20px] bg-signal items-center justify-center active:opacity-90"
            style={{
              shadowColor: "#16A65C",
              shadowOpacity: 0.3,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }}
          >
            <SignalGlyph color="#fff" width={22} height={13} />
          </Pressable>
        </View>

        <Text className="text-center font-sans text-[12px] text-muted pt-3">
          기록하면 신호에 매듭이 찍히고 휴식이 시작됩니다
        </Text>

        {/* 세트 로그 */}
        <View className="mx-5 mt-3 flex-row gap-2">
          {[
            { label: "SET 1", val: "60×10", active: false },
            { label: "SET 2", val: "60×9", active: false },
            { label: "SET 3", val: "·· ··", active: true },
          ].map((s) => (
            <View
              key={s.label}
              className={`flex-1 py-2.5 rounded-[12px] items-center ${
                s.active ? "bg-signal-tint border border-signal-line" : "bg-surface"
              }`}
            >
              <Text className={`font-sans text-[11px] ${s.active ? "text-signal-deep" : "text-muted"}`}>
                {s.label}
              </Text>
              <Text className={`font-mono font-semibold text-[14px] mt-0.5 ${s.active ? "text-signal-deep" : "text-[#4B5256]"}`}>
                {s.val}
              </Text>
            </View>
          ))}
        </View>

        <View className="mx-5 mt-5">
          <Pressable className="h-[54px] border border-line rounded-[16px] items-center justify-center active:bg-surface">
            <Text className="font-sans font-semibold text-[15px] text-[#4B5256]">다음 종목</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
