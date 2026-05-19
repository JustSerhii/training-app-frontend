export type Profile = {
  name: string;
  email: string;
  createdAt: Date;
};

export type ProfileUpdate = {
  name: string;
};

export type ExerciseRecord = {
  maxWeight: number;
  maxReps: number;
  maxVolume: number;
  estimatedOneRepMax: number;
  exerciseId: string;
  exerciseTitle: string;
};
