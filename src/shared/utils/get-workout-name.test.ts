import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { getTimeBasedWorkoutName } from "./get-workout-name";

describe("getTimeBasedWorkoutName", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const setSystemHour = (hour: number) => {
    const date = new Date("2024-01-01");
    date.setHours(hour, 0, 0, 0);
    vi.setSystemTime(date);
  };

  it('returns "Morning Workout" for hours 5-11', () => {
    setSystemHour(5);
    expect(getTimeBasedWorkoutName()).toBe("Morning Workout");
    setSystemHour(11);
    expect(getTimeBasedWorkoutName()).toBe("Morning Workout");
  });

  it('returns "Afternoon Workout" for hours 12-16', () => {
    setSystemHour(12);
    expect(getTimeBasedWorkoutName()).toBe("Afternoon Workout");
    setSystemHour(16);
    expect(getTimeBasedWorkoutName()).toBe("Afternoon Workout");
  });

  it('returns "Evening Workout" for hours 17-20', () => {
    setSystemHour(17);
    expect(getTimeBasedWorkoutName()).toBe("Evening Workout");
    setSystemHour(20);
    expect(getTimeBasedWorkoutName()).toBe("Evening Workout");
  });

  it('returns "Night Workout" for hours 21-4', () => {
    setSystemHour(21);
    expect(getTimeBasedWorkoutName()).toBe("Night Workout");
    setSystemHour(23);
    expect(getTimeBasedWorkoutName()).toBe("Night Workout");
    setSystemHour(0);
    expect(getTimeBasedWorkoutName()).toBe("Night Workout");
    setSystemHour(4);
    expect(getTimeBasedWorkoutName()).toBe("Night Workout");
  });
});
