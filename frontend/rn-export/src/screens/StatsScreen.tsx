import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignalLine, SignalGlyph } from "../components/SignalLine";

/** 통계 · 진척도 — 볼륨 추이와 개인 기록(PR) */
export default function StatsScreen() {
  // 주간 볼륨 추이 (viewBox 320x150, baseline 130). 목요일이 피크.
  const trend: [number, number][] = [
    [10, 96], [60, 72], [110, 84], [160, 40], [210, 100], [260, 118], [310, 118],
  ];
  const prs = [
    { name: "벤치프레스", kg: 100 },
    { name: "데드리프트", kg: 160 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 pb-8" showsVerticalScrollIndicator={false}>
        <Text className="font-sans font-extrabold text-[26px] text-ink tracking-tight pt-2">진척도</Text>

        {/* 기간 토글 */}
        <View className="mt-4 flex-row bg-surface rounded-[13px] p-1">
          {["주", "월", "년"].map((p, i) => (
            <View
              key={p}
              className={`flex-1 items-center py-2.5 rounded-[10px] ${i === 0 ? "bg-white" : ""}`}
              style={i === 0 ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 2, elevation: 1 } : undefined}
            >
              <Text className={`font-sans font-semibold text-[13px] ${i === 0 ? "text-ink" : "text-muted"}`}>{p}</Text>
            </View>
          ))}
        </View>

        {/* 히어로 지표 */}
        <View className="mt-[18px]">
          <Text className="font-sans text-[13px] text-muted">총 볼륨 · 이번 주</Text>
          <View className="flex-row items-baseline gap-2.5 mt-1">
            <Text className="font-mono font-semibold text-[40px] text-ink tracking-tight">
              12,400<Text className="text-[18px] text-muted">kg</Text>
            </Text>
            <Text className="font-mono font-semibold text-[13px] text-signal-deep bg-signal-tint px-2 py-0.5 rounded-[7px]">
              ▲ 12%
            </Text>
          </View>
        </View>

        {/* 추이 그래프 */}
        <View className="mt-[22px]">
          <SignalLine points={trend} width={320} height={150} progressIndex={3} fill baseline={130} />
          <View className="flex-row justify-between px-1 pt-2">
            {["월", "화", "수", "목", "금", "토", "일"].map((d, i) => (
              <Text key={d} className={`font-sans text-[11px] ${i === 3 ? "text-signal-deep" : "text-muted"}`}>
                {d}
              </Text>
            ))}
          </View>
        </View>

        {/* PR */}
        <Text className="font-sans font-bold text-[13px] text-ink mt-[22px]">최근 개인 기록</Text>
        <View className="mt-3 gap-2.5">
          {prs.map((pr) => (
            <View key={pr.name} className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-[10px] bg-signal-tint items-center justify-center">
                <SignalGlyph width={18} height={11} />
              </View>
              <Text className="flex-1 font-sans font-semibold text-[15px] text-ink">{pr.name}</Text>
              <Text className="font-mono font-semibold text-[16px] text-ink">
                {pr.kg}<Text className="text-[12px] text-muted">kg</Text>
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
