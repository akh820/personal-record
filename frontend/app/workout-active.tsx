import { View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../src/components/AppText";
import { useRouter } from "expo-router";
import Svg, { Polyline, Circle, Path } from "react-native-svg";

const DUMMY_SETS = [
  { id: "1", weight: 60, reps: 10, isCompleted: true },
  { id: "2", weight: 60, reps: 9, isCompleted: true },
  { id: "3", weight: 60, reps: 8, isCompleted: false },
  { id: "4", weight: 60, reps: 8, isCompleted: false },
];

export default function WorkoutActiveScreen() {
  const router = useRouter();
  const currentSetIndex = 2;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pt-3 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {/* 상단 바 */}
        <View className="flex-row items-center justify-between px-5 pt-1 pb-3">
          <Pressable
            onPress={() => router.back()}
            className="w-[38px] h-[38px] rounded-xl bg-surface items-center justify-center"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 5l-7 7 7 7"
                stroke="#14181C"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
          <View className="items-center">
            <Text className="font-bold text-[17px] text-ink">상체 A</Text>
            <Text className="font-medium text-[12px] text-muted">
              운동 2 / 6
            </Text>
          </View>
          <View
            className="flex-row items-center gap-2 h-[38px] px-3 rounded-xl"
            style={{ backgroundColor: "#14181C" }}
          >
            <Svg width={18} height={10} viewBox="0 0 18 10">
              <Polyline
                points="0,8 3,7 5,2 8,9 11,7 14,1 18,6"
                fill="none"
                stroke="#16A65C"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text className="font-mono font-semibold text-[14px] text-white">
              42:18
            </Text>
          </View>
        </View>

        {/* 휴식 바 */}
        <View className="mx-5 mb-4 bg-signal-tint border border-signal-line rounded-[15px] p-3.5">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-semibold text-[13px] text-signal-deep">
              휴식 중
            </Text>
            <View className="flex-row items-center gap-2.5">
              <Text className="font-mono font-semibold text-[15px] text-signal-deep">
                01:12
              </Text>
              <View className="px-2 py-1 border border-signal-line rounded-lg">
                <Text className="font-mono font-semibold text-[12px] text-signal-deep">
                  +15s
                </Text>
              </View>
            </View>
          </View>
          <Svg width="100%" height={26} viewBox="0 0 312 26">
            <Polyline
              points="0,18 24,17 40,9 58,20 80,19 100,6 124,21 150,20 174,12"
              fill="none"
              stroke="#16A65C"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline
              points="174,12 196,21 220,8 244,18 268,17 290,13 312,15"
              fill="none"
              stroke="#C9E8D8"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle cx={174} cy={12} r={3.5} fill="#16A65C" />
          </Svg>
        </View>

        {/* 종목 카드 */}
        <View className="mx-4 border border-line rounded-[20px] overflow-hidden">
          {/* 종목 헤더 */}
          <View className="flex-row items-center justify-between px-[18px] pt-4 pb-3">
            <View>
              <Text className="font-bold text-[18px] text-ink">벤치프레스</Text>
              <Text className="font-medium text-[12px] text-muted mt-0.5">
                바벨 · 가슴
              </Text>
            </View>
            <View className="gap-[3px] items-center">
              <View className="w-1 h-1 rounded-full bg-faint" />
              <View className="w-1 h-1 rounded-full bg-faint" />
              <View className="w-1 h-1 rounded-full bg-faint" />
            </View>
          </View>

          {/* 테이블 헤더 */}
          <View className="flex-row px-[18px] pb-2">
            <Text className="w-[46px] font-semibold text-[11px] text-muted tracking-wider uppercase">
              세트
            </Text>
            <Text className="flex-1 font-semibold text-[11px] text-muted tracking-wider uppercase text-center">
              KG
            </Text>
            <Text className="flex-1 font-semibold text-[11px] text-muted tracking-wider uppercase text-center">
              횟수
            </Text>
            <View className="w-[48px]" />
          </View>

          {/* 세트 행 */}
          {DUMMY_SETS.map((set, index) => {
            const isCurrent = index === currentSetIndex;
            const isCompleted = set.isCompleted;
            const isFuture = index > currentSetIndex;

            return (
              <View
                key={set.id}
                className={`flex-row items-center px-[18px] py-3.5 border-t border-[#F0F2F1] ${
                  isCurrent
                    ? "bg-signal-tint"
                    : isCompleted
                      ? "bg-[#FAFBFA]"
                      : ""
                }`}
              >
                {/* 현재 세트 좌측 강조 바 (레이아웃을 밀지 않도록 절대 위치) */}
                {isCurrent && (
                  <View className="absolute left-0 top-0 bottom-0 w-[3px] bg-signal" />
                )}
                <Text
                  className={`w-[46px] font-mono text-[15px] ${
                    isCurrent
                      ? "font-bold text-signal-deep"
                      : isFuture
                        ? "font-medium text-faint"
                        : "font-medium text-muted"
                  }`}
                >
                  {index + 1}
                </Text>
                <Text
                  className={`flex-1 font-mono text-center ${
                    isCurrent
                      ? "font-semibold text-[18px] text-ink"
                      : isFuture
                        ? "font-medium text-[16px] text-faint"
                        : "font-medium text-[16px] text-[#4B5256]"
                  }`}
                >
                  {set.weight}
                </Text>
                <Text
                  className={`flex-1 font-mono text-center ${
                    isCurrent
                      ? "font-semibold text-[18px] text-ink"
                      : isFuture
                        ? "font-medium text-[16px] text-faint"
                        : "font-medium text-[16px] text-[#4B5256]"
                  }`}
                >
                  {set.reps}
                </Text>
                <View className="w-[48px] items-end">
                  {isCompleted ? (
                    <View className="w-6 h-6 rounded-full bg-signal items-center justify-center">
                      <Svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <Path
                          d="M5 12l5 5L20 7"
                          stroke="#fff"
                          strokeWidth={3.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  ) : (
                    <View
                      className={`w-6 h-6 rounded-full border-2 ${
                        isCurrent ? "border-signal-line" : "border-line"
                      }`}
                    />
                  )}
                </View>
              </View>
            );
          })}

          {/* 세트 추가 */}
          <Pressable className="flex-row items-center gap-2 px-[18px] py-3.5 border-t border-[#F0F2F1]">
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 5v14M5 12h14"
                stroke="#8C9296"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
            <Text className="font-semibold text-[14px] text-muted">
              세트 추가
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 하단 고정 푸터 — 항상 화면 맨 아래 */}
      <View className="px-4 py-3 border-[#F0F2F1] bg-white">
        <Pressable
          className="h-[56px] bg-signal rounded-[17px] flex-row items-center justify-center gap-2 active:opacity-90"
          style={{
            shadowColor: "#16A65C",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <Svg width={20} height={11} viewBox="0 0 20 11">
            <Polyline
              points="0,9 3,8 6,2 9,10 12,8 15,1 20,7"
              fill="none"
              stroke="#fff"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text className="font-bold text-[16px] text-white">세트 완료</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
