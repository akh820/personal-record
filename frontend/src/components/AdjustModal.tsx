import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Pressable, ScrollView } from "react-native";
import Text from "./AppText";
import { formatTimeMMSS } from "../utils";

type Mode = "time" | "count";

type Props = {
  visible: boolean;
  onClose: () => void; // 그냥 닫기 (저장 안 함)
  onConfirm: (value: number) => void; // 확인 → 새 값 저장
  label: string; // "운동", "휴식", "세트", "싸이클"
  value: number; // 현재 값 (시간이면 초, 개수면 그 수)
  mode: Mode;
};

// 빠른 조절 델타 (모드별)
const QUICK: Record<Mode, number[]> = {
  time: [-30, -10, 10, 30],
  count: [-5, -1, 1, 5],
};

// 값 범위 (모드별)
const RANGE: Record<Mode, { min: number; max: number }> = {
  time: { min: 0, max: 59 * 60 + 59 }, // 00:00 ~ 59:59
  count: { min: 1, max: 99 },
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

// 휠 치수
const ROW = 44;
const PICKER_H = ROW * 5;
const NUMBERS = Array.from({ length: 60 }, (_, i) => i); // 0~59

// 드래그로 돌리는 숫자 휠
function Wheel({
  scrollRef,
  initialIndex,
  onSelect,
}: {
  scrollRef: React.RefObject<ScrollView | null>;
  initialIndex: number;
  onSelect: (idx: number) => void;
}) {
  // 열릴 때 현재 값 위치로 스크롤
  useEffect(() => {
    const t = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: initialIndex * ROW, animated: false });
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ height: PICKER_H }} className="flex-1">
      {/* 선택 밴드 */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", top: ROW * 2, height: ROW, left: 0, right: 0 }}
        className="bg-signal-tint border-y border-signal-line"
      />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ROW}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: ROW * 2 }}
        onMomentumScrollEnd={(e) =>
          onSelect(Math.round(e.nativeEvent.contentOffset.y / ROW))
        }
      >
        {NUMBERS.map((n) => (
          <View
            key={n}
            style={{ height: ROW }}
            className="items-center justify-center"
          >
            <Text className="font-mono font-semibold text-[24px] text-ink">
              {String(n).padStart(2, "0")}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* 위/아래 페이드 */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: ROW * 2 }}
        className="bg-white opacity-70"
      />
      <View
        pointerEvents="none"
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: ROW * 2 }}
        className="bg-white opacity-70"
      />
    </View>
  );
}

export default function AdjustModal({
  visible,
  onClose,
  onConfirm,
  label,
  value,
  mode,
}: Props) {
  // 편집 중인 임시 값 (확인 눌러야 실제 저장)
  const [draft, setDraft] = useState(value);
  const { min, max } = RANGE[mode];

  const minRef = useRef<ScrollView>(null);
  const secRef = useRef<ScrollView>(null);

  const mm = Math.floor(draft / 60);
  const ss = draft % 60;

  // 휠을 특정 값 위치로 스크롤
  const scrollWheels = (total: number) => {
    minRef.current?.scrollTo({ y: Math.floor(total / 60) * ROW, animated: true });
    secRef.current?.scrollTo({ y: (total % 60) * ROW, animated: true });
  };

  // 빠른 버튼(±)
  const applyQuick = (delta: number) => {
    const next = clamp(draft + delta, min, max);
    setDraft(next);
    if (mode === "time") scrollWheels(next);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* 어두운 배경 — 누르면 닫힘 */}
        <Pressable
          onPress={onClose}
          className="absolute top-0 bottom-0 left-0 right-0 bg-black/40"
        />
        {/* 시트 본체 */}
        <View className="bg-white rounded-t-[28px] px-5 pt-3 pb-9">
          {/* 핸들 */}
          <View className="w-[44px] h-[5px] rounded-full bg-line self-center mb-4" />

          <Text className="text-center font-semibold text-[12px] text-muted tracking-widest uppercase">
            {label}
          </Text>
          <Text className="text-center font-mono font-bold text-[54px] text-ink mt-1">
            {mode === "time" ? formatTimeMMSS(draft) : draft}
          </Text>

          {/* 빠른 조절 */}
          <View className="flex-row gap-2 mt-5">
            {QUICK[mode].map((delta) => (
              <Pressable
                key={delta}
                onPress={() => applyQuick(delta)}
                className="flex-1 h-[52px] rounded-2xl bg-signal-tint items-center justify-center active:opacity-70"
              >
                <Text className="font-mono font-bold text-[16px] text-signal-deep">
                  {delta > 0 ? `+${delta}` : `−${Math.abs(delta)}`}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* 드래그 휠 (시간 모드만) — 분 : 초 */}
          {mode === "time" && (
            <View className="mt-4">
              <View className="flex-row items-center">
                <Wheel
                  scrollRef={minRef}
                  initialIndex={mm}
                  onSelect={(idx) =>
                    setDraft((prev) => clamp(idx * 60 + (prev % 60), min, max))
                  }
                />
                <Text className="w-6 text-center font-mono font-bold text-[26px] text-muted">
                  :
                </Text>
                <Wheel
                  scrollRef={secRef}
                  initialIndex={ss}
                  onSelect={(idx) =>
                    setDraft((prev) =>
                      clamp(Math.floor(prev / 60) * 60 + idx, min, max),
                    )
                  }
                />
              </View>
            </View>
          )}

          {/* 확인 — 저장 후 닫기 */}
          <Pressable
            onPress={() => onConfirm(draft)}
            className="h-[54px] rounded-2xl bg-signal items-center justify-center mt-5 active:opacity-90"
          >
            <Text className="font-bold text-[16px] text-white">확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
