import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/shared/tests/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/e2e/**", "**/.next/**"],
    globals: true,

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],

      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },

    pool: "threads",

    testTimeout: 10000,

    server: {
      deps: {
        inline: ["@testing-library/jest-dom"],
      },
    },
  },
});
