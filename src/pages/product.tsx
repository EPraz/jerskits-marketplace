import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { priceLabel, productById } from "../catalog/products";
import { PurchaseControls } from "../components/purchase-controls";

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="empty-state section-wrap">
      <span className="empty-number">404</span>
      <h1>{t("notFound")}</h1>
      <p>{t("notFoundCopy")}</p>
      <Link className="button" to="/catalog">
        {t("backCollection")} <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const product = productById(id ?? "");
  const { t, i18n } = useTranslation();
  if (!product) return <NotFound />;
  const title = `${product.team} ${t(`${product.kind}Shirt`)}`;
  return (
    <div className="section-wrap product-page">
      <Link className="back-link" to="/catalog">
        <ArrowLeft size={16} /> {t("backCollection")}
      </Link>
      <div className="product-detail">
        <div className="detail-image">
          <span className="eyebrow">JERSKITS. / {product.season}</span>
          <img src={product.image} alt={title} width="800" height="800" />
        </div>
        <div className="detail-info">
          <p className="eyebrow">
            {product.team} · {product.season}
          </p>
          <h1>{title}</h1>
          <p className="detail-price">
            {priceLabel(product.price, i18n.language)}
          </p>
          <p className="description">{t("detailsCopy")}</p>
          <PurchaseControls key={product.id} product={product} />
          <details open>
            <summary>{t("details")}</summary>
            <p>{t("fit")}</p>
          </details>
          <details>
            <summary>{t("shippingTitle")}</summary>
            <p>{t("shippingCopy")}</p>
          </details>
        </div>
      </div>
    </div>
  );
}
