export const MAX_VARIANT_QUANTITY = 5;

export function normalizeQuantity(quantity: number): number {
  return Math.max(
    1,
    Math.min(
      MAX_VARIANT_QUANTITY,
      Math.floor(Number.isFinite(quantity) ? quantity : 1),
    ),
  );
}
