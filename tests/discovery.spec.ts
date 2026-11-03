import { test, expect } from "./fixtures";

test("a guest switches featured shirts and opens the selected product", async ({
  page,
}) => {
  await page.goto("/");
  const next = page.getByRole("button", { name: "Next shirt", exact: true });
  await expect(next).toBeVisible({ timeout: 1000 });
  await next.click();
  await expect(
    page.getByRole("heading", { name: "BARCELONA", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Shop this shirt", exact: true }),
  ).toHaveAttribute("href", "/shirts/barcelona-home");
  await expect(next).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "BRAZIL", exact: true }),
  ).toBeVisible();
  await next.click();
  await expect(
    page.getByRole("heading", { name: "LIVERPOOL", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Previous shirt", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "BRAZIL", exact: true }),
  ).toBeVisible();
  await page.getByRole("banner").getByRole("combobox").selectOption("es");
  await page
    .getByRole("button", { name: "Siguiente camiseta", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Ver esta camiseta", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Liverpool Camiseta local",
      exact: true,
    }),
  ).toBeVisible();
});

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
