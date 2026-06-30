type Props = { onPress?: () => void };

export default function BackButton({ onPress }: Props) {
  const router = useRouter();
  return (
    <Pressable
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
