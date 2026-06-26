import "./global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { WorkoutProvider } from "../src/context/WorkoutContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    HankenGrotesk: require("../assets/Hanken_Grotesk/static/HankenGrotesk-Regular.ttf"),
    "HankenGrotesk-Medium": require("../assets/Hanken_Grotesk/static/HankenGrotesk-Medium.ttf"),
    "HankenGrotesk-SemiBold": require("../assets/Hanken_Grotesk/static/HankenGrotesk-SemiBold.ttf"),
    "HankenGrotesk-Bold": require("../assets/Hanken_Grotesk/static/HankenGrotesk-Bold.ttf"),
    "HankenGrotesk-ExtraBold": require("../assets/Hanken_Grotesk/static/HankenGrotesk-ExtraBold.ttf"),
    "HankenGrotesk-Black": require("../assets/Hanken_Grotesk/static/HankenGrotesk-Black.ttf"),
    IBMPlexMono: require("../assets/IBM_Plex_Mono/IBMPlexMono-Regular.ttf"),
    "IBMPlexMono-Bold": require("../assets/IBM_Plex_Mono/IBMPlexMono-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <WorkoutProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="before-workout" options={{ title: "운동 시작" }} />
      </Stack>
    </WorkoutProvider>
  );
}
