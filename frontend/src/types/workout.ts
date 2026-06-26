export interface ExerciseInfo {
  id: string;
  name: string;
  category: string; // 가슴, 등, 하체 등
}

export interface SetRecord {
  setId: string;
  weight: number;
  reps: number;
  isCompleted: boolean;
}

export interface WorkoutSession {
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  sets: SetRecord[];
}

export interface WorkoutHistory {
  historyId: string;
  date: string;
  sessions: WorkoutSession[];
}
