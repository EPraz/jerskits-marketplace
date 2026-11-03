import { test, expect } from "./fixtures";

test("a guest searches, combines filters and recovers from no results", async ({
  page,
}) => {
  await page.goto("/catalog");
  await expect(page.getByRole("article")).toHaveCount(12);
  await page
    .getByRole("searchbox", { name: "Search shirts or teams" })
    .fill("Liverpool");
  await expect(page.getByRole("article")).toHaveCount(1);
  await page
    .getByRole("combobox", { name: "Size", exact: true })
    .selectOption("XXL");
  await expect(
    page.getByRole("heading", { name: "No shirts in this lineup." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).first().click();
  await expect(page.getByRole("article")).toHaveCount(12);
  await page
    .getByRole("combobox", { name: "Team", exact: true })
    .selectOption("Argentina");
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByLabel("Maximum price").fill("50");
  await expect(page.getByRole("article")).toHaveCount(0);
  await page.getByRole("button", { name: "Clear filters" }).first().click();
  await page
    .getByRole("combobox", { name: "Sort by" })
    .selectOption("price-asc");
  await expect(page.getByRole("article").first()).toContainText("Portugal");
  await page
    .getByRole("combobox", { name: "Sort by" })
    .selectOption("price-desc");
  await expect(page.getByRole("article").first()).toContainText("Real Madrid");
  await page.reload();
  await expect(page.getByRole("combobox", { name: "Sort by" })).toHaveValue(
    "price-desc",
  );
});
