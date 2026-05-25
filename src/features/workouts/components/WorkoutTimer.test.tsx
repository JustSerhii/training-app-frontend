import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WorkoutTimer } from "./WorkoutTimer";

const { mockUseWorkoutTimer } = vi.hoisted(() => {
  return {
    mockUseWorkoutTimer: vi.fn(),
  };
});

vi.mock("@/shared/hooks", () => ({
  useWorkoutTimer: mockUseWorkoutTimer,
}));

beforeEach(() => {
  mockUseWorkoutTimer.mockReset();
});

describe("WorkoutTimer", () => {
  it("displays formatted time when active", () => {
    mockUseWorkoutTimer.mockReturnValue({
      formattedTime: "12:34",
      isActive: true,
    });

    render(<WorkoutTimer />);

    expect(screen.getByText("12:34")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("displays saved duration when provided", () => {
    mockUseWorkoutTimer.mockReturnValue({
      formattedTime: "00:00",
      isActive: false,
    });

    render(<WorkoutTimer savedDuration={1800} />);

    expect(screen.getByText("30:00")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
  });

  it("formats duration with hours when savedDuration >= 3600", () => {
    mockUseWorkoutTimer.mockReturnValue({
      formattedTime: "00:00",
      isActive: false,
    });

    render(<WorkoutTimer savedDuration={3665} />);

    expect(screen.getByText("1:01:05")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
  });

  it("displays 'Time' when timer is inactive and no saved duration", () => {
    mockUseWorkoutTimer.mockReturnValue({
      formattedTime: "00:00",
      isActive: false,
    });

    render(<WorkoutTimer />);

    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });
});
