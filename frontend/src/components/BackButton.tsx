import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

type Props = { onPress?: () => void };

export default function BackButton({ onPress }: Props) {
  const router = useRouter();
  return (
    <Pressable
      //괄호로 한번더 감싸서 이건 하나의 값이라고 명시함
      onPress={onPress ?? (() => router.back())}
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
  );
}
