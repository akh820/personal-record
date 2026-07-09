import { useEffect, useRef, useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../src/components/AppText";
import Svg, { Path, Line } from "react-native-svg";
import ScreenHeader from "../src/components/ScreenHeader";
import AdjustModal from "../src/components/AdjustModal";
import { formatTimeMMSS as formatTimeMMSS } from "../src/utils";

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

// key = config에서 조절할 필드, mode = 시간/개수
const CHIP_META = [
  {
    key: "workSec",
    label: "운동",
    mode: "time",
    border: "#16A65C",
    text: "#0C7A40",
  },
  {
    key: "restSec",
    label: "휴식",
    mode: "time",
    border: "#C4C8C6",
    text: "#14181C",
  },
  {
    key: "sets",
    label: "세트",
    mode: "count",
    border: "#E8EAE8",
    text: "#14181C",
  },
  {
    key: "cycles",
    label: "싸이클",
    mode: "count",
    border: "#E8EAE8",
    text: "#14181C",
  },
] as const;

type Chip = (typeof CHIP_META)[number];

export default function IntervalTimerScreen() {
  // 어떤 칩 모달이 열렸는지 (null이면 닫힘)
  const [openChip, setOpenChip] = useState<Chip | null>(null);

  // useRef의 구조는 => { current: 값(초기 null) }
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isRunning, setIsRunning] = useState(false);

  const [config, setConfig] = useState({
    workSec: 5,
    restSec: 3,
    sets: 3,
    cycles: 1,
  });

  const [progress, setProgress] = useState({
    phase: "work", // "work", "rest"
    remaining: 0, // 현재 단계 남은 초
    elapsed: 0, // 총 경과 초
    curSet: 1, // 현재 세트 (1부터)
    curCycle: 1, // 현재 싸이클 (1부터)
    done: false, // 전체 종료 여부
  });

  const start = () => {
    //운동 진행중인지 아닌지?
    if (intervalRef.current) return;

    setProgress((prev) =>
      prev.remaining === 0
        ? {
            phase: "work",
            remaining: config.workSec,
            elapsed: 0,
            curSet: 1,
            curCycle: 1,
            done: false,
          }
        : prev,
    );

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        //이미 끝난 타이머가 혹시모르게 한번 더돌 안전장치
        if (prev.done) return prev;

        const next = prev.remaining - 1;

        if (next) {
          // 0이면 falsy라 0이 되는순간
          return {
            ...prev,
            phase: "rest",
            remaining: config.workSec,
            elapsed: prev.elapsed + 1,
          };
        }

        const isLastSet = prev.curSet >= config.sets;
        const isLastCycle = prev.curCycle >= config.cycles;

        if (isLastSet && isLastCycle) {
          return {
            ...prev,
            done: true,
            remaining: 0,
            elapsed: prev.elapsed + 1,
          };
        }

        if (isLastSet) {
          return {
            ...prev,
            phase: "work",
            remaining: config.workSec,
            elapsed: prev.elapsed + 1,
            curSet: 1,
            curCycle: prev.curCycle + 1,
          };
        }

        return {
          ...prev,
          phase: "work",
          remaining: config.workSec,
          elapsed: prev.elapsed + 1,
          curSet: prev.curSet + 1,
        };
      });
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 상단 바 */}
      <ScreenHeader title="인터벌 타이머" />

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
          {/* 현재 단계 (운동/휴식) */}
          <View
            className={`px-3 py-1 rounded-full ${
              progress.phase === "work" ? "bg-signal-tint" : "bg-surface"
            }`}
          >
            <Text
              className={`font-bold text-[12px] tracking-wider ${
                progress.phase === "work" ? "text-signal-deep" : "text-muted"
              }`}
            >
              {progress.phase === "work" ? "운동" : "휴식"}
            </Text>
          </View>
          {/* 현재 카운트다운 */}
          <Text
            className={`font-mono font-bold text-[60px] tracking-tight mt-2 ${
              progress.phase === "work" ? "text-signal-deep" : "text-ink"
            }`}
          >
            {formatTimeMMSS(
              progress.remaining > 0 ? progress.remaining : config.workSec,
            )}
          </Text>
          {/* 총 경과시간 (작게) */}
          <Text className="font-medium text-[12px] text-muted mt-0.5">
            총 운동시간{" "}
            <Text className="font-mono font-semibold text-ink">
              {formatTimeMMSS(progress.elapsed)}
            </Text>
          </Text>

          <Pressable
            onPress={() => {
              if (isRunning) {
                stop();
                setIsRunning(false);
              } else {
                start();
                setIsRunning(true);
              }
            }}
            className="w-[64px] h-[64px] rounded-full bg-signal items-center justify-center mt-3 active:opacity-90"
          >
            <Svg width={26} height={26} viewBox="0 0 24 24">
              {isRunning ? (
                <Path
                  d="M8 5v14M16 5v14"
                  stroke="#fff"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              ) : (
                <Path d="M8 5v14l11-7z" fill="#fff" />
              )}
            </Svg>
          </Pressable>
        </View>

        {/* 세트 / 싸이클 진행 */}
        <View className="flex-row justify-center gap-3 mt-6">
          <View className="flex-row items-center gap-2 bg-surface px-4 py-2 rounded-full">
            <Text className="font-semibold text-[12px] text-muted tracking-wider">
              세트
            </Text>
            <Text className="font-mono font-bold text-[14px] text-ink">
              {progress.curSet}
              <Text className="text-muted"> / {config.sets}</Text>
            </Text>
          </View>
          <View className="flex-row items-center gap-2 bg-surface px-4 py-2 rounded-full">
            <Text className="font-semibold text-[12px] text-muted tracking-wider">
              싸이클
            </Text>
            <Text className="font-mono font-bold text-[14px] text-ink">
              {progress.curCycle}
              <Text className="text-muted"> / {config.cycles}</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* 하단 설정 칩 */}
      <View className="flex-row justify-between px-7 pb-6">
        {CHIP_META.map((chip) => {
          const raw = config[chip.key]; // config에서 실제 값 읽기
          const display = chip.mode === "time" ? formatTimeMMSS(raw) : raw;
          return (
            <Pressable
              key={chip.key}
              onPress={() => setOpenChip(chip)}
              className="items-center gap-2 active:opacity-70"
            >
              <View
                className="w-[68px] h-[68px] rounded-full items-center justify-center border-2"
                style={{ borderColor: chip.border }}
              >
                <Text
                  className="font-mono font-bold text-[15px]"
                  style={{ color: chip.text }}
                >
                  {display}
                </Text>
              </View>
              <Text className="font-semibold text-[12px] text-muted">
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 설정 조절 모달 */}
      {openChip && (
        <AdjustModal
          visible
          onClose={() => setOpenChip(null)}
          label={openChip.label}
          mode={openChip.mode}
          value={config[openChip.key]}
          onConfirm={(newValue) => {
            setConfig((prev) => ({ ...prev, [openChip.key]: newValue }));
            setOpenChip(null);
          }}
        />
      )}
    </SafeAreaView>
  );
}
