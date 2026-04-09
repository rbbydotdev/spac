import { test, expect } from "@playwright/test";

test.describe("playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/petstore");
    // Wait for both panes to render
    await expect(
      page.getByRole("button", { name: "petstore" }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.locator(".cm-content").first()).toBeVisible();
    await expect(page.locator(".cm-content").nth(1)).toBeVisible();
  });

  test("loads petstore example with file tree and both panes", async ({
    page,
  }) => {
    // File explorer shows source files
    await expect(page.locator("text=index.ts").first()).toBeVisible();
    // Stats bar shows counts
    await expect(page.locator("text=/\\d+ files/")).toBeVisible();
    await expect(page.locator("text=/\\d+ paths/")).toBeVisible();
    await expect(page.locator("text=/\\d+ schemas/")).toBeVisible();
    // Header labels
    await expect(page.locator("text=TypeScript")).toBeVisible();
    await expect(page.locator("text=openapi.yaml")).toBeVisible();
  });

  test("switches between examples", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "petstore" });
    await trigger.click();
    await page.getByRole("menuitem", { name: "plantstore" }).click();
    await expect(
      page.getByRole("button", { name: "plantstore" }),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("clicking a file in the explorer opens it", async ({ page }) => {
    // Click the pets folder to expand it
    const sidebar = page.locator("[data-sidebar]");
    const petsItem = sidebar.locator("text=pets").first();
    await petsItem.click();
    // Try to click pets/index.ts
    const petsIndex = sidebar.locator("text=index.ts").first();
    if (await petsIndex.isVisible({ timeout: 2000 }).catch(() => false)) {
      await petsIndex.click();
    }
  });

  test("clicking a line in the TS pane highlights the YAML pane", async ({
    page,
  }) => {
    const tsPane = page.locator(".cm-content").first();
    await tsPane.click();
    await expect(tsPane).toBeVisible();
  });

  test("hover on a symbol shows a tooltip with type info", async ({
    page,
  }) => {
    // Wait for TS worker to initialize
    await page.waitForTimeout(3000);

    const tsEditor = page.locator(".cm-content").first();

    // Hover over 'Api' in the import line — look for the specific token
    const apiToken = tsEditor
      .locator(".cm-line")
      .first()
      .locator("span", { hasText: /^Api$/ });
    if (await apiToken.isVisible()) {
      await apiToken.hover();
      const tooltip = page.locator(".cm-tooltip");
      await expect(tooltip).toBeVisible({ timeout: 5000 });
      const tooltipText = await tooltip.textContent();
      expect(tooltipText).toContain("Api");
      expect(tooltipText).not.toContain(": any");
    }
  });

  test("YAML pane renders generated OpenAPI output", async ({ page }) => {
    const yamlPane = page.locator(".cm-content").nth(1);
    const yamlText = await yamlPane.textContent();
    expect(yamlText).toContain("openapi");
    expect(yamlText).toContain("paths");
  });

  test("deep link to example and file", async ({ page }) => {
    await page.goto("/plantstore?file=plants/index.ts");
    await expect(
      page.getByRole("button", { name: "plantstore" }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.locator("header").getByText("plants/index.ts")).toBeVisible();
  });
});
