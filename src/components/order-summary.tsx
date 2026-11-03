import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { priceLabel, productById } from "../catalog/products";
import { cartTotal, type CartLine } from "../store/cart";

export function OrderSummary({
  lines,
  checkoutLink = false,
  showItems = false,
}: {
  lines: CartLine[];
  checkoutLink?: boolean;
  showItems?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const total = priceLabel(cartTotal(lines), i18n.language);
  return (
    <section className="order-summary" aria-label={t("orderSummary")}>
      <h2>{t("orderSummary")}</h2>
      {showItems && (
        <div className="summary-items">
          {lines.map((line) => {
            const product = productById(line.productId)!;
            return (
              <div key={`${line.productId}-${line.size}`}>
                <img src={product.image} alt="" width="60" height="70" />
                <div>
                  <p>{product.team}</p>
                  <span>
                    {line.size} · {t("quantity")}: {line.quantity}
                  </span>
                </div>
                <p>
                  {priceLabel(product.price * line.quantity, i18n.language)}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <div className="summary-row">
        <span>{t("subtotal")}</span>
        <span>{total}</span>
      </div>
      <div className="summary-row">
        <span>{t("delivery")}</span>
        <span>{t("free")}</span>
      </div>
      <div className="summary-row summary-total">
        <span>{t("total")}</span>
        <span>{total}</span>
      </div>
      <p className="price-note">{t("finalPrices")}</p>
      {checkoutLink && (
        <Link className="button full-width" to="/checkout">
          {t("checkout")} <ArrowUpRight size={18} />
        </Link>
      )}
      <p className="demo-note">
        <LockKeyhole size={13} /> {t("demoCheckout")}
      </p>
    </section>
  );
}
