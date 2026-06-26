import React from "react";
import { Tabs } from "expo-router";
import { Pressable, ColorValue } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabBarIcon({
  children,
  color,
}: {
  children: React.ReactNode;
  color: ColorValue;
}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#14181C",
        tabBarInactiveTintColor: "#B6BBB8",
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
          height: 64 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈이아니야",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color}>
              <Path d="M3 10.5 12 3l9 7.5" />
              <Path d="M5 9.5V21h14V9.5" />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          title: "루틴",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color}>
              <Path d="M6.5 7v10M3.5 9.5v5M17.5 7v10M20.5 9.5v5M6.5 12h11" />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "진척도",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color}>
              <Path d="M4 17l5-6 4 4 7-8" />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "내 정보",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color}>
              <Circle cx={12} cy={8} r={4} />
              <Path d="M4 20c1.5-4 5-5.5 8-5.5S18.5 16 20 20" />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
