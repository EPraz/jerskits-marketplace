import { ArrowLeft, ArrowUpRight, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { priceLabel, productById } from "../catalog/products";
import { useCart } from "../store/cart";
import { OrderSummary } from "../components/order-summary";
import { MAX_VARIANT_QUANTITY } from "../catalog/quantity-policy";

export function EmptyCart() {
  const { t } = useTranslation();
  return (
    <div className="empty-state section-wrap">
      <ShoppingBag size={48} strokeWidth={1} />
      <h1>{t("emptyBag")}</h1>
      <p>{t("emptyBagCopy")}</p>
      <Link className="button" to="/catalog">
        {t("viewAll")} <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}

export function CartPage() {
  const { t, i18n } = useTranslation();
  const { lines, changeQuantity, removeLine } = useCart();
  if (!lines.length) return <EmptyCart />;
  return (
    <div className="section-wrap commerce-page">
      <Link className="back-link" to="/catalog">
        <ArrowLeft size={16} /> {t("continueShopping")}
      </Link>
      <div className="page-heading">
        <p className="eyebrow">{t("bagEyebrow")}</p>
        <h1>{t("cart")}</h1>
        <p>{t("bagCopy")}</p>
      </div>
      <div className="commerce-grid">
        <section className="cart-lines" aria-label={t("cart")}>
          {lines.map((line) => {
            const product = productById(line.productId)!;
            return (
              <article
                className="cart-line"
                key={`${line.productId}-${line.size}`}
              >
                <Link className="cart-image" to={`/shirts/${product.id}`}>
                  <img
                    src={product.image}
                    alt={`${product.team} ${t(`${product.kind}Shirt`)}`}
                    width="160"
                    height="180"
                  />
                </Link>
                <div className="cart-line-info">
                  <p className="eyebrow">
                    {product.season} · {t(`${product.kind}Shirt`)}
                  </p>
                  <Link to={`/shirts/${product.id}`}>
                    <h2>{product.team}</h2>
                  </Link>
                  <p>
                    {t("size")}: {line.size}
                  </p>
                  <label className="quantity-field">
                    <span className="sr-only">
                      {t("quantityFor", {
                        team: product.team,
                        size: line.size,
                      })}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max={MAX_VARIANT_QUANTITY}
                      step="1"
                      value={line.quantity}
                      onChange={(event) =>
                        changeQuantity(
                          line.productId,
                          line.size,
                          Number(event.target.value),
                        )
                      }
                    />
                  </label>
                </div>
                <div className="cart-line-end">
                  <p>
                    {priceLabel(product.price * line.quantity, i18n.language)}
                  </p>
                  <button
                    className="icon-button"
                    aria-label={t("removeItem", {
                      team: product.team,
                      size: line.size,
                    })}
                    onClick={() => removeLine(line.productId, line.size)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            );
          })}
          <p className="cart-limit-note">
            {t("bagLimit", { max: MAX_VARIANT_QUANTITY })}
          </p>
        </section>
        <OrderSummary lines={lines} checkoutLink />
      </div>
    </div>
  );
}
