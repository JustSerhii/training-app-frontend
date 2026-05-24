export type Profile = {
  name: string;
  email: string;
  createdAt: Date;
  bodyWeight: number;
};

export type ProfileUpdate = {
  name: string;
  bodyWeight: number;
};

export type ExerciseRecord = {
  maxWeight: number;
  maxReps: number;
  maxVolume: number;
  bestReps: number;
  bestWeight: number;
  estimatedOneRepMax: number;
  exerciseId: string;
  exerciseTitle: string;
};
