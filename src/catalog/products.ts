import assets from "./assets.json";

export const sizes = ["S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof sizes)[number];
export type Product = {
  id: string;
  team: string;
  price: number;
  image: string;
  season: string;
  kind: "home" | "away" | "third";
  available: readonly Size[];
  featured: boolean;
};

const demoPrices: Record<string, number> = {
  liverpool: 90,
  barcelona: 95,
  "real-madrid": 110,
  arsenal: 85,
  psg: 95,
  bayern: 100,
  juventus: 80,
  "manchester-city": 90,
  brazil: 85,
  argentina: 95,
  france: 90,
  portugal: 75,
};
const displayTeams: Record<string, string> = {
  liverpool: "Liverpool",
  barcelona: "Barcelona",
  bayern: "Bayern Munich",
};
export const products: Product[] = assets
  .filter((asset) => asset.id !== "liverpool-hero")
  .map((asset, index) => ({
    id: `${asset.id}-${asset.design === "third" ? "third" : "home"}`,
    team: displayTeams[asset.id] ?? asset.team,
    price: demoPrices[asset.id],
    image: `/images/${asset.filename}`,
    season: asset.season,
    kind: asset.design === "third" ? "third" : "home",
    available: index % 3 === 0 ? ["S", "M", "L", "XL"] : sizes,
    featured: ["liverpool", "barcelona", "brazil", "argentina"].includes(
      asset.id,
    ),
  }));

export const productById = (id: string) =>
  products.find((product) => product.id === id);
export const priceLabel = (price: number, language = "en") =>
  new Intl.NumberFormat(language, {
    style: "currency",
    currency: "USD",
  }).format(price);
