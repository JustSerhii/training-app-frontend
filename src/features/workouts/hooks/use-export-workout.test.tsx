import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useExportWorkout } from "./use-export-workout";
import { workoutsApi } from "../api/workouts.api";
import { toast } from "sonner";

vi.mock("../api/workouts.api", () => ({
  workoutsApi: {
    exportWorkout: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useExportWorkout", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    function TestWrapper({ children }: { children: React.ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    }

    return TestWrapper;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports workout successfully", async () => {
    const blob = new Blob(["pdf-content"], {
      type: "application/pdf",
    });

    vi.mocked(workoutsApi.exportWorkout).mockResolvedValue(blob);

    const createObjectURLSpy = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("mock-url");

    const revokeObjectURLSpy = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => {});

    const anchor = document.createElement("a");

    const clickMock = vi.fn();
    anchor.click = clickMock;

    vi.spyOn(document, "createElement").mockReturnValue(anchor);

    const appendChildSpy = vi.spyOn(document.body, "appendChild");

    const removeChildSpy = vi.spyOn(document.body, "removeChild");

    const { result } = renderHook(() => useExportWorkout(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("workout-12345678");

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(workoutsApi.exportWorkout).toHaveBeenCalledWith("workout-12345678");

    expect(createObjectURLSpy).toHaveBeenCalledWith(blob);

    expect(clickMock).toHaveBeenCalled();

    expect(revokeObjectURLSpy).toHaveBeenCalledWith("mock-url");

    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    expect(toast.success).toHaveBeenCalledWith("Workout exported successfully");
  });

  it("shows error toast when export fails", async () => {
    vi.mocked(workoutsApi.exportWorkout).mockRejectedValue(
      new Error("Server error"),
    );

    const { result } = renderHook(() => useExportWorkout(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("workout-123");

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to export: Server error");
  });
});
