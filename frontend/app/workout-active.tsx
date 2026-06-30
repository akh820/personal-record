import { View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../src/components/AppText";
import Svg, { Path } from "react-native-svg";
import ScreenHeader from "../src/components/ScreenHeader";

type SetRow = {
  no: number;
  kg: string;
  reps: string;
  done: boolean;
  focus: "kg" | "reps" | null;
};

const SETS: SetRow[] = [
  { no: 1, kg: "60", reps: "10", done: true, focus: null },
  { no: 2, kg: "60", reps: "9", done: true, focus: null },
  { no: 3, kg: "60", reps: "8", done: false, focus: "reps" },
];

export default function WorkoutActiveScreen() {

  const addSet = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 상단 바 */}
      <ScreenHeader
        title="6월 27일"
        subtitle="상체 A · 운동 2 / 6"
        right={
          <Pressable className="w-[38px] h-[38px] rounded-xl bg-surface items-center justify-center">
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#14181C"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </Pressable>
        }
      />

      {/* 종목 카드 */}
      <View className="flex-1 mx-4 mb-3 border border-line rounded-[22px] overflow-hidden">
        {/* 카드 헤더 */}
        <View className="flex-row items-center gap-3 px-4 pt-4 pb-3">
          <Text className="font-mono font-bold text-[15px] text-signal">
            01
          </Text>
          <View className="flex-1">
            <Text className="font-bold text-[18px] text-ink">벤치프레스</Text>
            <Text className="font-medium text-[12px] text-muted mt-0.5">
              바벨 · 가슴
            </Text>
          </View>
          <View className="w-[30px] h-[30px] rounded-full border border-[#E1E4E3] items-center justify-center">
            <Text className="font-mono font-bold text-[13px] text-muted">
              i
            </Text>
          </View>
          <View className="gap-[3px] items-center px-1">
            <View className="w-1 h-1 rounded-full bg-faint" />
            <View className="w-1 h-1 rounded-full bg-faint" />
            <View className="w-1 h-1 rounded-full bg-faint" />
          </View>
        </View>

        {/* 총 볼륨 / 최근 기록 */}
        <View className="flex-row items-center justify-between px-4 pb-3">
          <Text className="font-medium text-[13px] text-[#4B5256]">
            총 볼륨{" "}
            <Text className="font-mono font-semibold text-[14px] text-ink">
              1,140 kg
            </Text>
          </Text>
          <View className="border border-line rounded-[9px] px-[11px] py-[5px]">
            <Text className="font-semibold text-[11px] text-[#4B5256]">
              최근 기록
            </Text>
          </View>
        </View>

        {/* 메모 카드 */}
        <View className="mx-[14px] mb-3 bg-surface rounded-[10px] px-3.5 py-3">
          <View className="flex-row items-center gap-2 mb-1.5">
            <Text className="font-mono font-semibold text-[11px] text-signal-deep">
              25-05-02 금
            </Text>
            <View className="bg-signal-tint border border-signal-line rounded-md px-[7px] py-0.5">
              <Text className="font-semibold text-[10px] text-signal-deep">
                메모
              </Text>
            </View>
          </View>
          <Text className="font-medium text-[13px] text-[#6B7178] leading-5">
            4×8 · 천천히 내리고 빠르게 밀기, 약지가 바에 걸치는 그립
          </Text>
        </View>

        {/* 테이블 헤더 */}
        <View className="flex-row gap-2 px-4 pb-2">
          <Text className="w-[42px] text-center font-semibold text-[11px] text-muted tracking-wider uppercase">
            세트
          </Text>
          <Text className="flex-1 text-center font-semibold text-[11px] text-muted tracking-wider uppercase">
            kg
          </Text>
          <Text className="flex-1 text-center font-semibold text-[11px] text-muted tracking-wider uppercase">
            회
          </Text>
          <Text className="w-[52px] text-center font-semibold text-[11px] text-muted tracking-wider uppercase">
            완료
          </Text>
        </View>

        {/* 세트 리스트 */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {SETS.map((set) => (
            <View
              key={set.no}
              className="flex-row gap-2 items-center px-4 py-[5px]"
            >
              {/* 세트 번호 칩 */}
              <View
                className={`w-[42px] h-[46px] rounded-[5px] items-center justify-center ${
                  set.done ? "bg-surface" : "bg-signal-tint"
                }`}
              >
                <Text
                  className={`font-mono text-[14px] ${
                    set.done
                      ? "font-semibold text-muted"
                      : "font-bold text-signal-deep"
                  }`}
                >
                  {set.no}
                </Text>
              </View>

              {/* kg 값 박스 */}
              <View
                className={`flex-1 h-[46px] rounded-[5px] items-center justify-center border ${
                  set.focus === "kg"
                    ? "bg-signal-tint border-signal"
                    : "bg-[#FAFBFA] border-line"
                }`}
              >
                <Text
                  className={`font-mono font-semibold text-[18px] ${
                    set.focus === "kg" ? "text-signal-deep" : "text-ink"
                  }`}
                >
                  {set.kg}
                </Text>
              </View>

              {/* 회 값 박스 */}
              <View
                className={`flex-1 h-[46px] rounded-[5px] items-center justify-center border ${
                  set.focus === "reps"
                    ? "bg-signal-tint border-signal"
                    : "bg-[#FAFBFA] border-line"
                }`}
              >
                <Text
                  className={`font-mono font-semibold text-[18px] ${
                    set.focus === "reps" ? "text-signal-deep" : "text-ink"
                  }`}
                >
                  {set.reps}
                </Text>
              </View>

              {/* 완료 체크 */}
              <View
                className={`w-[52px] h-[46px] rounded-[5px] items-center justify-center ${
                  set.done ? "bg-signal" : "bg-[#EFF1F0]"
                }`}
              >
                <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M5 12l5 5L20 7"
                    stroke={set.done ? "#fff" : "#C4C8C6"}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 세트 삭제 / 추가 */}
        <View className="flex-row border-t border-[#F0F2F1]">
          <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-[15px] border-r border-[#F0F2F1]">
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M6 12h12"
                stroke="#9BA1A4"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
            <Text className="font-semibold text-[14px] text-muted">
              세트 삭제
            </Text>
          </Pressable>
          <Pressable
            onPress={() => addSet()}
            className="flex-1 flex-row items-center justify-center gap-2 py-[15px]"
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 6v12M6 12h12"
                stroke="#16A65C"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
            <Text className="font-bold text-[14px] text-signal">세트 추가</Text>
          </Pressable>
        </View>
      </View>

      {/* 하단 푸터 — 휴식/운동 시간 + 운동 완료 */}
      <View className="flex-row items-center gap-3 px-4 pt-1 pb-2">
        <View className="flex-row items-center gap-3 px-3.5 py-2.5 rounded-[15px] bg-surface">
          <View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-1.5 h-1.5 rounded-full bg-signal" />
              <Text className="font-semibold text-[11px] text-signal-deep">
                휴식 중
              </Text>
            </View>
            <Text className="font-mono font-semibold text-[16px] text-ink mt-0.5">
              01:12
            </Text>
          </View>
          <View className="w-[1px] h-8 bg-[#E0E3E2]" />
          <View>
            <Text className="font-semibold text-[11px] text-muted">
              운동 시간
            </Text>
            <Text className="font-mono font-semibold text-[16px] text-ink mt-0.5">
              42:18
            </Text>
          </View>
        </View>
        <Pressable className="flex-1 h-[54px] bg-signal rounded-[16px] items-center justify-center active:opacity-90">
          <Text className="font-bold text-[16px] text-white">운동 완료</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
