import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export default function ScreenLayout({ children, scrollable = true }: Props) {
  if (scrollable) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerClassName="px-6 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pb-8">
      {children}
    </SafeAreaView>
  );
}
