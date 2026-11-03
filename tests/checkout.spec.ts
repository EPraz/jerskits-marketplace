import { test, expect } from "./fixtures";

test("shipping details are not restored after a reload", async ({ page }) => {
  await page.goto("/shirts/liverpool-home");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/checkout");
  await page.getByRole("button", { name: "Fill demo details" }).click();
  await page.reload();
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("");
  await expect(
    page.getByRole("region", { name: "Order summary" }),
  ).toContainText("Liverpool");
});

test("a guest validates shipping and confirms a simulated order", async ({
  page,
}) => {
  await page.goto("/shirts/liverpool-home");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page
    .getByRole("spinbutton", { name: "Quantity", exact: true })
    .fill("2");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: /^Shopping bag/ }).click();
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await expect(page.getByText("Full name is required.")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Full name", exact: true })
    .fill("   ");
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("invalid-email");
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await expect(page.getByText("Full name is required.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByRole("button", { name: "Fill demo details" }).click();
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("Alex Morgan");
  await expect(
    page.getByRole("textbox", { name: "Phone (optional)", exact: true }),
  ).toHaveValue("");
  await expect(
    page.getByRole("textbox", { name: "Postal code (optional)", exact: true }),
  ).toHaveValue("");
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await expect(
    page.getByRole("heading", { name: "You’re in the lineup." }),
  ).toBeVisible();
  await expect(page.getByText(/JK-/)).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Order summary" }),
  ).toContainText("$180.00");
  await expect(
    page.getByRole("region", { name: "Order summary" }),
  ).toContainText("M · Quantity: 2");
  await page.getByRole("link", { name: /^Shopping bag/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your bag is waiting." }),
  ).toBeVisible();
  await page.goto("/checkout");
  await expect(
    page.getByRole("heading", { name: "Your bag is waiting." }),
  ).toBeVisible();
});
