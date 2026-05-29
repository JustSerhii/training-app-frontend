import { test as setup } from "@playwright/test";

const AUTH_FILE = "e2e/tests/.auth/user.json";

setup("authenticate test user", async ({ page }) => {
  const email = `e2e-${Date.now()}@test.com`;

  await page.goto("/auth/register");

  await page.locator("#name").fill("E2E Test User");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill("Test123!@#?wW");
  await page.locator("#passwordRepeat").fill("Test123!@#?wW");

  await page.getByRole("button", { name: /sign up/i }).click();

  await page.waitForURL(/workouts/);

  await page.context().storageState({ path: AUTH_FILE });
});
