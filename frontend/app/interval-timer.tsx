import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../src/components/AppText";
import { useRouter } from "expo-router";
import Svg, { Path, Line } from "react-native-svg";

// 원형 눈금 (60칸, 5칸마다 길게)
const CENTER = 140;
const TICKS = Array.from({ length: 60 }, (_, i) => {
  const angle = ((i * 6 - 90) * Math.PI) / 180;
  const isMajor = i % 5 === 0;
  const rOuter = 132;
  const rInner = isMajor ? 118 : 124;
  return {
    key: i,
    isMajor,
    x1: CENTER + rOuter * Math.cos(angle),
    y1: CENTER + rOuter * Math.sin(angle),
    x2: CENTER + rInner * Math.cos(angle),
    y2: CENTER + rInner * Math.sin(angle),
  };
});

const CHIPS = [
  { label: "운동", value: "00:20", border: "#16A65C", text: "#0C7A40" },
  { label: "휴식", value: "00:10", border: "#C4C8C6", text: "#14181C" },
  { label: "세트", value: "8", border: "#E8EAE8", text: "#14181C" },
  { label: "싸이클", value: "4", border: "#E8EAE8", text: "#14181C" },
];

export default function IntervalTimerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 상단 바 */}
      <View className="flex-row items-center px-5 pt-1 pb-2">
        <Pressable
          onPress={() => router.back()}
          className="w-[38px] h-[38px] items-center justify-center"
        >
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 5l-7 7 7 7"
              stroke="#14181C"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
        <Text className="flex-1 text-center font-bold text-[17px] text-ink">
          인터벌 타이머
        </Text>
        <View className="w-[38px]" />
      </View>

      {/* 원형 타이머 */}
      <View className="flex-1 items-center justify-center">
        <View className="w-[280px] h-[280px] items-center justify-center">
          {/* 눈금 링 */}
          <Svg
            width={280}
            height={280}
            viewBox="0 0 280 280"
            style={{ position: "absolute" }}
          >
            {TICKS.map((t) => (
              <Line
                key={t.key}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.isMajor ? "#C4C8C6" : "#E8EAE8"}
                strokeWidth={t.isMajor ? 2.5 : 1.5}
                strokeLinecap="round"
              />
            ))}
          </Svg>

          {/* 중앙 콘텐츠 */}
          <Text className="font-semibold text-[13px] text-muted tracking-widest uppercase">
            총 운동시간
          </Text>
          <Text className="font-mono font-bold text-[60px] text-signal-deep tracking-tight mt-1">
            21:20
          </Text>
          <Pressable className="w-[64px] h-[64px] rounded-full bg-signal items-center justify-center mt-3 active:opacity-90">
            <Svg width={26} height={26} viewBox="0 0 24 24">
              <Path d="M8 5v14l11-7z" fill="#fff" />
            </Svg>
          </Pressable>
        </View>
      </View>

      {/* 하단 설정 칩 */}
      <View className="flex-row justify-between px-7 pb-6">
        {CHIPS.map((chip) => (
          <View key={chip.label} className="items-center gap-2">
            <View
              className="w-[68px] h-[68px] rounded-full items-center justify-center border-2"
              style={{ borderColor: chip.border }}
            >
              <Text
                className="font-mono font-bold text-[15px]"
                style={{ color: chip.text }}
              >
                {chip.value}
              </Text>
            </View>
            <Text className="font-semibold text-[12px] text-muted">
              {chip.label}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
