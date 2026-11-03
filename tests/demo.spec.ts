import { test, expect } from "./fixtures";

test("a guest resets the demo including the bag and language", async ({
  page,
}) => {
  await page.goto("/shirts/liverpool-home");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("banner").getByRole("combobox").selectOption("es");
  await page.getByRole("button", { name: "Reiniciar demo" }).click();
  await expect(
    page.getByRole("heading", { name: "LIVERPOOL", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("banner").getByRole("combobox")).toHaveValue(
    "en",
  );
  await page.getByRole("link", { name: /^Shopping bag/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your bag is waiting." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Your bag is waiting." }),
  ).toBeVisible();
});
