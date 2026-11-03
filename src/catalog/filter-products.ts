import { products, sizes, type Size } from "./products";

export const teams = [
  ...new Set(products.map((product) => product.team)),
].sort();

export function readFilters(params: URLSearchParams) {
  const price = Number(params.get("max") ?? "150");
  return {
    query: params.get("q") ?? "",
    team: teams.includes(params.get("team") ?? "") ? params.get("team")! : "",
    size: sizes.includes(params.get("size") as Size)
      ? (params.get("size") as Size)
      : "",
    max: Number.isFinite(price) ? Math.min(150, Math.max(0, price)) : 150,
    sort: ["price-asc", "price-desc"].includes(params.get("sort") ?? "")
      ? params.get("sort")!
      : "featured",
  };
}

export function filterProducts(
  filters: ReturnType<typeof readFilters>,
  shirtNames: Record<string, string>,
) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .trim();
  const result = products.filter((product) => {
    const name = `${product.team} ${shirtNames[product.kind]} ${product.season}`;
    return (
      normalize(name).includes(normalize(filters.query)) &&
      (!filters.team || product.team === filters.team) &&
      (!filters.size || product.available.includes(filters.size as Size)) &&
      product.price <= filters.max
    );
  });
  return result.sort((a, b) =>
    filters.sort === "price-asc"
      ? a.price - b.price
      : filters.sort === "price-desc"
        ? b.price - a.price
        : Number(b.featured) - Number(a.featured),
  );
}
