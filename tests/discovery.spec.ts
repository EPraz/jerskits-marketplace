import { test, expect } from "./fixtures";

test("a guest discovers a shirt from the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "LIVERPOOL", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore the collection" }).click();
  await expect(
    page.getByRole("heading", { name: "The collection", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: /Liverpool Home Shirt/ })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Liverpool Home Shirt" }),
  ).toBeVisible();
  await expect(page.getByText("$90.00").first()).toBeVisible();
});
