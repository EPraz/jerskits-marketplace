import { test, expect } from "./fixtures";

test("a guest manages variants, limits and a persistent bag", async ({
  page,
}) => {
  await page.goto("/shirts/liverpool-home");
  await expect(
    page.getByRole("button", { name: "XXL", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page
    .getByRole("spinbutton", { name: "Quantity", exact: true })
    .fill("3");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("5");
  await page.getByRole("button", { name: "L", exact: true }).click();
  await page
    .getByRole("spinbutton", { name: "Quantity", exact: true })
    .fill("1");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: /^Shopping bag/ }).click();
  await expect(page.getByRole("article")).toHaveCount(2);
  await expect(
    page.getByRole("spinbutton", { name: "Quantity for Liverpool M" }),
  ).toHaveValue("5");
  await expect(
    page.getByRole("region", { name: "Order summary" }),
  ).toContainText("$540.00");
  await page.reload();
  await expect(page.getByRole("article")).toHaveCount(2);
  await page
    .getByRole("spinbutton", { name: "Quantity for Liverpool M" })
    .fill("2");
  await expect(
    page.getByRole("region", { name: "Order summary" }),
  ).toContainText("$270.00");
  await page.getByRole("button", { name: "Remove Liverpool L" }).click();
  await page.getByRole("button", { name: "Remove Liverpool M" }).click();
  await expect(
    page.getByRole("heading", { name: "Your bag is waiting." }),
  ).toBeVisible();
});
