import { createContext, useContext, useState } from "react";
import { ExerciseInfo, WorkoutSession } from "../types/workout";
import { generateId } from "../utils";

interface WorkoutContextType {
  selectedExercises: string[];
  //Dispatch<React.SetStateAction<string[]>>는 리액트의 useState 변경 함수가 가지는 고유한 타입형태
  setSelectedExercises: React.Dispatch<React.SetStateAction<string[]>>;
  activeWorkout: WorkoutSession[];
  setActiveWorkout: React.Dispatch<React.SetStateAction<WorkoutSession[]>>;
  startWorkout: (exercise: ExerciseInfo[]) => void;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

//React 화면에 렌더링 될 수 있는 모든 요소(컴포넌트, 텍스트 등)의 타입이 ReactNode이다.
export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  //children <a>네이버</a> 에서 네이버가 children, 내가 감싸 안고 있는 하위 화면들
  //문자열 배열만 담을 수 있다
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession[]>([]);

  const startWorkout = (exercises: ExerciseInfo[]) => {
    const initialSessions: WorkoutSession[] = exercises.map((ex) => ({
      sessionId: generateId("session"),
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets: [
        {
          setId: generateId("set"),
          weight: 0,
          reps: 0,
          isCompleted: false,
        },
      ],
    }));
  };
  return (
    <WorkoutContext.Provider
      value={{
        selectedExercises,
        setSelectedExercises,
        activeWorkout,
        setActiveWorkout,
        startWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout은 WorkoutProvider안에서만 사용되어야 합니다");
  }
  return context;
}
