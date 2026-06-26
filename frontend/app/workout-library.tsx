import { Pressable, ScrollView, View } from "react-native";
import { ExerciseInfo, useWorkout } from "../src/context/WorkoutContext";
import { defaultExercises } from "../src/api/workoutData";
import Text from "../src/components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function WorkoutLibraryScreen() {
  const router = useRouter();
  const { selectedExercises, setSelectedExercises } = useWorkout();

  const handleToggleExercise = (id: string) => {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(selectedExercises.filter((exId) => exId != id));
    } else {
      setSelectedExercises([...selectedExercises, id]);
    }
  };

  const hasSelection = selectedExercises.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="p-6">
        <Text className="font-extrabold text-[26px] text-ink mb-6">
          운동 라이브러리
        </Text>

        {defaultExercises.map((exercise: ExerciseInfo) => {
          const isSelected = selectedExercises.includes(exercise.id);
          return (
            // map 돌릴때 가장 바깥에 있는 요소면 반드시 key가 필요함
            <Pressable
              key={exercise.id}
              onPress={() => handleToggleExercise(exercise.id)}
              className={`p-4 mb-3 rounded-xl border ${
                isSelected
                  ? "bg-signal-light border-signal"
                  : "bg-surface border-line"
              }`}
            >
              <Text
                className={`font-bold text-[16px] ${isSelected ? "text-signal-deep" : "text-ink"}`}
              >
                {exercise.name}
              </Text>
              <Text className="text-[12px] text-muted mt-1">
                {exercise.category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Pressable
        disabled={!hasSelection}
        onPress={() => router.push("/workout-active")}
        className={`m-6 p-4 rounded-2xl items-center ${
          hasSelection ? "bg-signal active:opacity-90" : "bg-line"
        }`}
      >
        <Text
          className={`font-bold text-[16px] ${hasSelection ? "text-white" : "text-muted"}`}
        >
          운동 시작
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
