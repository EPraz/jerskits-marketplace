import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { priceLabel, type Product } from "../catalog/products";

export function ProductCard({
  product,
  index = 0,
  headingLevel = 3,
}: {
  product: Product;
  index?: number;
  headingLevel?: 2 | 3;
}) {
  const { t, i18n } = useTranslation();
  const title = `${product.team} ${t(`${product.kind}Shirt`)}`;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="product-card">
      <Link
        to={`/shirts/${product.id}`}
        aria-label={`${title} · ${product.season}`}
      >
        <div className="product-image">
          <span className="product-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <img
            src={product.image}
            alt={title}
            loading="lazy"
            width="480"
            height="480"
          />
          <span className="product-arrow">
            <ArrowUpRight size={19} />
          </span>
        </div>
        <div className="product-info">
          <div>
            <p className="product-season">
              {product.season} · {t(`${product.kind}Shirt`)}
            </p>
            <Heading>{product.team}</Heading>
          </div>
          <p>{priceLabel(product.price, i18n.language)}</p>
        </div>
      </Link>
    </article>
  );
}
