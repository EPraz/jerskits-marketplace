import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("the discovery and purchase screens meet accessibility checks", async ({
  page,
}) => {
  const audit = async () => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  };
  await page.goto("/");
  await audit();
  await page.goto("/catalog");
  await audit();
  await page.goto("/shirts/liverpool-home");
  await audit();
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: /^Shopping bag/ }).click();
  await audit();
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await audit();
  await page.getByRole("button", { name: "Fill demo details" }).click();
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await audit();
});

test("content fits the supported widths and the keyboard reaches the main content", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/catalog", "/shirts/liverpool-home"]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
});
