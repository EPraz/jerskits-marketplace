import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { productById, sizes, type Size } from "../catalog/products";
import { readStored, writeStored } from "./browser-storage";
import { normalizeQuantity } from "../catalog/quantity-policy";

export type CartLine = { productId: string; size: Size; quantity: number };
const storageKey = "jerskits.cart.v1";

function loadCart(): CartLine[] {
  try {
    const stored: unknown = JSON.parse(readStored(storageKey) ?? "[]");
    if (!Array.isArray(stored)) return [];
    const lines: CartLine[] = [];
    for (const item of stored) {
      if (
        !item ||
        typeof item !== "object" ||
        typeof item.productId !== "string" ||
        !sizes.includes(item.size) ||
        !Number.isFinite(item.quantity) ||
        item.quantity < 1
      )
        continue;
      const product = productById(item.productId);
      if (!product || !product.available.includes(item.size)) continue;
      const existing = lines.find(
        (line) => line.productId === item.productId && line.size === item.size,
      );
      if (existing)
        existing.quantity = normalizeQuantity(
          existing.quantity + item.quantity,
        );
      else
        lines.push({
          productId: item.productId,
          size: item.size,
          quantity: normalizeQuantity(item.quantity),
        });
    }
    return lines;
  } catch {
    return [];
  }
}

type CartContextValue = {
  lines: CartLine[];
  addLine: (productId: string, size: Size, quantity: number) => void;
  changeQuantity: (productId: string, size: Size, quantity: number) => void;
  removeLine: (productId: string, size: Size) => void;
  clear: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  useEffect(() => {
    writeStored(storageKey, JSON.stringify(lines));
  }, [lines]);
  function addLine(productId: string, size: Size, quantity: number) {
    if (!productById(productId)?.available.includes(size)) return;
    setLines((previous) => {
      const existing = previous.find(
        (line) => line.productId === productId && line.size === size,
      );
      return existing
        ? previous.map((line) =>
            line === existing
              ? {
                  ...line,
                  quantity: normalizeQuantity(line.quantity + quantity),
                }
              : line,
          )
        : [
            ...previous,
            { productId, size, quantity: normalizeQuantity(quantity) },
          ];
    });
  }
  function changeQuantity(productId: string, size: Size, quantity: number) {
    setLines((previous) =>
      previous.map((line) =>
        line.productId === productId && line.size === size
          ? { ...line, quantity: normalizeQuantity(quantity) }
          : line,
      ),
    );
  }
  function removeLine(productId: string, size: Size) {
    setLines((previous) =>
      previous.filter(
        (line) => !(line.productId === productId && line.size === size),
      ),
    );
  }
  return (
    <CartContext.Provider
      value={{
        lines,
        addLine,
        changeQuantity,
        removeLine,
        clear: () => setLines([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is required");
  return context;
}

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce(
    (total, line) =>
      total + (productById(line.productId)?.price ?? 0) * line.quantity,
    0,
  );
