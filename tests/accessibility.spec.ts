import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import type { Locator } from "@playwright/test";

test("a guest completes a purchase using only the keyboard", async ({
  page,
}) => {
  async function tabTo(target: Locator) {
    for (let step = 0; step < 80; step++) {
      if (
        await target.evaluate((element) => element === document.activeElement)
      )
        return;
      await page.keyboard.press("Tab");
    }
    throw new Error("The control was not reachable using Tab");
  }
  async function activate(target: Locator) {
    await tabTo(target);
    await page.keyboard.press("Enter");
  }
  await page.goto("/");
  await activate(page.getByRole("link", { name: "Explore the collection" }));
  await expect(
    page.getByRole("heading", { name: "The collection", exact: true }),
  ).toBeVisible();
  await activate(page.getByRole("link", { name: /^Liverpool Home Shirt/ }));
  await expect(
    page.getByRole("heading", { name: "Liverpool Home Shirt" }),
  ).toBeVisible();
  await activate(page.getByRole("button", { name: "M", exact: true }));
  await activate(page.getByRole("button", { name: "Add to bag", exact: true }));
  await activate(page.getByRole("link", { name: "View bag", exact: true }));
  const quantity = page.getByRole("spinbutton", {
    name: "Quantity for Liverpool M",
  });
  await tabTo(quantity);
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("2");
  await expect(
    page.getByRole("region", { name: "Order summary" }),
  ).toContainText("$180.00");
  await activate(page.getByRole("link", { name: "Continue to checkout" }));
  await activate(page.getByRole("button", { name: "Confirm demo order" }));
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toBeFocused();
  await expect(page.getByText("Full name is required.")).toBeVisible();
  await activate(page.getByRole("button", { name: "Fill demo details" }));
  await activate(page.getByRole("button", { name: "Confirm demo order" }));
  await expect(
    page.getByRole("heading", { name: "You’re in the lineup." }),
  ).toBeVisible();
});

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
