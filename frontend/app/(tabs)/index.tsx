import React, { useRef, useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignalLine, SignalGlyph } from "../../src/components/SignalLine";
import { useRouter } from "expo-router";
import Text from "../../src/components/AppText";
import Svg, { Circle, Path } from "react-native-svg";

export default function HomeScreen() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const week: [number, number][] = [
    [6, 30],
    [54, 18],
    [102, 34],
    [150, 8],
    [198, 38],
    [246, 26],
    [294, 30],
  ];

  const onPressIn = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => Number((prev + 0.1).toFixed(1)));
    }, 100);
  };

  const onPressOut = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View className="flex-row items-center justify-between pt-2">
          <View>
            <Text className="text-[14px] text-muted">월요일, 6월 22일</Text>
            <Text className="font-extrabold text-[26px] text-ink tracking-tight mt-0.5">
              좋은 아침이에요
            </Text>
          </View>
          <View className="w-[46px] h-[46px] rounded-full bg-surface border border-line items-center justify-center">
            <Text className="font-bold text-[16px] text-[#4B5256]">민</Text>
          </View>
        </View>

        {/* 이번 주 신호 */}
        <View className="mt-5 p-[18px] border border-line rounded-[18px]">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-semibold text-[12px] text-muted tracking-widest uppercase">
              이번 주 신호
            </Text>
            <Text className="font-semibold text-[12px] text-signal-deep">
              2 / 4일
            </Text>
          </View>
          <SignalLine points={week} width={300} height={44} progressIndex={4} />
          <View className="flex-row justify-between px-0.5 pt-2">
            {["월", "화", "수", "목", "금", "토", "일"].map((d, i) => (
              <Text
                key={d}
                className={`text-[11px] ${i < 3 ? "text-ink" : "text-muted"}`}
              >
                {d}
              </Text>
            ))}
          </View>
        </View>

        {/* 오늘의 루틴 카드 */}
        <View className="mt-[18px] rounded-[22px] bg-ink p-[22px]">
          <View className="flex-row items-center gap-2 mb-3.5">
            <SignalGlyph width={20} height={11} />
            <Text className="font-semibold text-[12px] text-[#8A9094] tracking-widest uppercase">
              오늘의 루틴
            </Text>
          </View>
          <Text className="font-extrabold text-[24px] text-white tracking-tight">
            상체 A
          </Text>
          <Text className="text-[14px] text-[#8A9094] mt-1 mb-[18px]">
            운동 6 · 예상 50분 · 가슴/어깨/삼두
          </Text>
          <Pressable
            onPress={() => {
              router.push("/workout-library");
            }}
            // onPressIn={onPressIn}
            // onPressOut={onPressOut}
            className="h-[54px] rounded-[16px] bg-signal flex-row items-center justify-center gap-2 active:opacity-90"
          >
            <SignalGlyph width={20} height={11} color="#fff" />
            <Text className="font-bold text-[16px] text-white">운동 시작</Text>
          </Pressable>
        </View>

        {/* 주간 요약 */}
        <View className="flex-row gap-3 mt-4">
          <View className="flex-1 border border-line rounded-[16px] p-3.5">
            <Text className="font-semibold text-[23px] text-ink tracking-tight">
              12.4k
            </Text>
            <Text className="text-[12px] text-muted mt-0.5">주간 볼륨 kg</Text>
          </View>
          <View className="flex-1 border border-line rounded-[16px] p-3.5">
            <Text className="font-semibold text-[23px] text-ink tracking-tight">
              3.2<Text className="text-[14px] text-muted">h</Text>
            </Text>
            <Text className="text-[12px] text-muted mt-0.5">
              주간 운동 시간
            </Text>
          </View>
        </View>

        {/* 인터벌 타이머 진입 */}
        <Pressable
          onPress={() => router.push("/interval-timer")}
          className="flex-row items-center gap-3 mt-4 px-4 h-[58px] border border-line rounded-[16px] active:bg-surface"
        >
          <View className="w-[38px] h-[38px] rounded-full bg-signal-tint items-center justify-center">
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Circle cx={12} cy={12} r={9} stroke="#16A65C" strokeWidth={2} />
              <Path
                d="M12 7v5l3 2"
                stroke="#16A65C"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <Text className="flex-1 font-bold text-[15px] text-ink">
            인터벌 타이머
          </Text>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M9 6l6 6-6 6"
              stroke="#C4C8C6"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
