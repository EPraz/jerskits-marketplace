import { test, expect } from "./fixtures";

test("changing languages preserves a bag and translates existing errors", async ({
  page,
}) => {
  await page.goto("/shirts/liverpool-home");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("banner").getByRole("combobox").selectOption("es");
  await page.getByRole("link", { name: /^Bolsa de compra/ }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("link", { name: "Continuar al checkout" }).click();
  await page
    .getByRole("button", { name: "Confirmar pedido de demostración" })
    .click();
  await page.getByRole("banner").getByRole("combobox").selectOption("pt-BR");
  await expect(page.getByText("Informe seu nome completo.")).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Resumo do pedido" }),
  ).toContainText("Liverpool");
});

const languages = [
  {
    code: "en",
    explore: "Explore the collection",
    collection: "The collection",
    add: "Add to bag",
    bag: "Shopping bag",
    checkout: "Continue to checkout",
    fill: "Fill demo details",
    confirm: "Confirm demo order",
    success: "You’re in the lineup.",
    nameRequired: "Full name is required.",
  },
  {
    code: "pt-BR",
    explore: "Explore a coleção",
    collection: "A coleção",
    add: "Adicionar à sacola",
    bag: "Sacola",
    checkout: "Ir para finalizar",
    fill: "Preencher demonstração",
    confirm: "Confirmar pedido de demonstração",
    success: "Você está no time.",
    nameRequired: "Informe seu nome completo.",
  },
  {
    code: "es",
    explore: "Explora la colección",
    collection: "La colección",
    add: "Añadir a la bolsa",
    bag: "Bolsa de compra",
    checkout: "Continuar al checkout",
    fill: "Rellenar datos de ejemplo",
    confirm: "Confirmar pedido de demostración",
    success: "Ya estás en el equipo.",
    nameRequired: "El nombre completo es obligatorio.",
  },
];

for (const language of languages)
  test(`a guest completes the purchase in ${language.code}`, async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("banner")
      .getByRole("combobox")
      .selectOption(language.code);
    await page.getByRole("link", { name: language.explore }).click();
    await expect(
      page.getByRole("heading", { name: language.collection, exact: true }),
    ).toBeVisible();
    await page
      .getByRole("article")
      .filter({ hasText: "Liverpool" })
      .getByRole("link")
      .click();
    await page.getByRole("button", { name: "M", exact: true }).click();
    await page.getByRole("button", { name: language.add, exact: true }).click();
    await page.reload();
    await expect(page.getByRole("banner").getByRole("combobox")).toHaveValue(
      language.code,
    );
    await page
      .getByRole("link", { name: new RegExp(`^${language.bag}`) })
      .click();
    await expect(page.getByRole("article")).toHaveCount(1);
    await page
      .getByRole("link", { name: language.checkout, exact: true })
      .click();
    await page.getByRole("button", { name: language.confirm }).click();
    await expect(page.getByText(language.nameRequired)).toBeVisible();
    await page
      .getByRole("button", { name: language.fill, exact: true })
      .click();
    await page
      .getByRole("button", { name: language.confirm, exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: language.success, exact: true }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", language.code);
  });
