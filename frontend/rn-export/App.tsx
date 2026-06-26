import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import "./global.css";

import HomeScreen from "./src/screens/HomeScreen";
import ActiveWorkoutScreen from "./src/screens/ActiveWorkoutScreen";
import StatsScreen from "./src/screens/StatsScreen";

/**
 * 데모용 셸 — 실제로는 @react-navigation/bottom-tabs + native-stack 사용 권장.
 * (운동 시작은 풀스크린 모달 stack으로 띄우면 됨)
 */
type Tab = "home" | "stats" | "active";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <View className="flex-1">
          {tab === "home" && <HomeScreen onStart={() => setTab("active")} />}
          {tab === "stats" && <StatsScreen />}
          {tab === "active" && <ActiveWorkoutScreen />}
        </View>

        {/* 탭바 */}
        <View className="flex-row items-end justify-around border-t border-[#F0F2F1] bg-white px-7 pt-3 pb-7">
          <TabIcon label="홈" active={tab === "home"} onPress={() => setTab("home")}>
            <Path d="M3 10.5 12 3l9 7.5" /><Path d="M5 9.5V21h14V9.5" />
          </TabIcon>
          <TabIcon label="루틴" onPress={() => {}}>
            <Path d="M6.5 7v10M3.5 9.5v5M17.5 7v10M20.5 9.5v5M6.5 12h11" />
          </TabIcon>
          {/* 중앙 FAB: 운동 시작 */}
          <Pressable
            onPress={() => setTab("active")}
            className="w-[52px] h-[52px] rounded-full bg-signal items-center justify-center -mb-0.5"
            style={{ shadowColor: "#16A65C", shadowOpacity: 0.32, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 8 }}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round">
              <Path d="M12 5v14M5 12h14" />
            </Svg>
          </Pressable>
          <TabIcon label="진척도" active={tab === "stats"} onPress={() => setTab("stats")}>
            <Path d="M4 17l5-6 4 4 7-8" />
          </TabIcon>
          <TabIcon label="내 정보" onPress={() => {}}>
            <Circle cx={12} cy={8} r={4} /><Path d="M4 20c1.5-4 5-5.5 8-5.5S18.5 16 20 20" />
          </TabIcon>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

function TabIcon({
  children, label, active, onPress,
}: { children: React.ReactNode; label: string; active?: boolean; onPress: () => void }) {
  const color = active ? "#14181C" : "#B6BBB8";
  return (
    <Pressable onPress={onPress} className="items-center gap-1">
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </Svg>
      <Text className="font-sans font-semibold text-[10px]" style={{ color }}>{label}</Text>
    </Pressable>
  );
}
