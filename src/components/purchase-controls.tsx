import { ArrowUpRight, Check, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sizes, type Product, type Size } from "../catalog/products";
import { useCart } from "../store/cart";

export function PurchaseControls({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { lines, addLine } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState<{ key: string; count: number } | null>(
    null,
  );
  function add() {
    if (!size) return;
    const existing =
      lines.find((line) => line.productId === product.id && line.size === size)
        ?.quantity ?? 0;
    addLine(product.id, size, quantity);
    setNotice({
      key: existing + quantity > 5 ? "limitReached" : "added",
      count: Math.min(5, existing + quantity),
    });
  }
  return (
    <div className="purchase-controls">
      <fieldset className="size-selector">
        <legend>{t("selectSize")}</legend>
        <div>
          {sizes.map((option) => (
            <button
              key={option}
              disabled={!product.available.includes(option)}
              aria-pressed={size === option}
              title={
                !product.available.includes(option) ? t("soldOut") : undefined
              }
              onClick={() => {
                setSize(option);
                setNotice(null);
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <p>{t("sizeHelp")}</p>
      </fieldset>
      <div className="purchase-actions">
        <label className="quantity-field">
          <span className="sr-only">{t("quantity")}</span>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            value={quantity}
            onChange={(event) =>
              setQuantity(
                Math.max(
                  1,
                  Math.min(5, Math.floor(Number(event.target.value) || 1)),
                ),
              )
            }
          />
        </label>
        <button className="button" disabled={!size} onClick={add}>
          {t("addBag")} <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="purchase-feedback" role="status">
        {notice && (
          <>
            <Check size={16} />
            <span>{t(notice.key, { count: notice.count })}</span>
            <Link to="/cart">{t("viewBag")}</Link>
          </>
        )}
      </div>
      <p className="shipping-note">
        <Truck size={15} /> {t("deliveryCopy")} {t("delivery")}
      </p>
    </div>
  );
}
