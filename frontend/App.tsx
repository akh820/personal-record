import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { btnBase, btnPrimary, btnPrimaryPressed } from "./src/constants/styles";

export default function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const test = () => {
    console.log("loading...");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable
        className={`${btnBase} ${isPressed ? btnPrimaryPressed : btnPrimary}`}
        disabled={isLoading}
        onPress={test}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Text className="text-white">버튼</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
