import { test, expect } from "@playwright/test";

test.use({ storageState: "e2e/tests/.auth/user.json" });

test.describe("Authenticated user", () => {
  test("can access workouts page", async ({ page }) => {
    await page.goto("/workouts");
    await expect(page.getByText("My Workouts")).toBeVisible();
    await expect(page).toHaveURL(/workouts/);
  });

  test("can logout", async ({ page }) => {
    await page.goto("/workouts");

    await page.getByRole("button", { name: /log out/i }).click();

    await expect(page).toHaveURL(/auth\/login/);
    await expect(page.getByText("Welcome back")).toBeVisible();
  });
});
