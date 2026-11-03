import { FeaturedHero } from "../components/featured-hero";
import { ArrowUpRight, Globe2, Shirt, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "../catalog/products";
import { ProductCard } from "../components/product-card";

const benefits = [
  { Icon: Shirt, titleKey: "authentic", copyKey: "authenticCopy" },
  { Icon: Truck, titleKey: "delivery", copyKey: "deliveryCopy" },
  { Icon: Globe2, titleKey: "guest", copyKey: "guestCopy" },
] as const;

export function Home() {
  const { t } = useTranslation();
  return (
    <>
      <FeaturedHero />
      <section className="benefits" aria-label={t("authentic")}>
        {benefits.map(({ Icon, titleKey, copyKey }) => (
          <div key={titleKey}>
            <Icon size={26} strokeWidth={1.3} />
            <div>
              <h2>{t(titleKey)}</h2>
              <p>{t(copyKey)}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="section-wrap featured" id="featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("featured")}</p>
            <h2>{t("findColors")}</h2>
          </div>
          <Link className="text-link" to="/catalog">
            {t("viewAll")} <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((product) => product.featured)
            .slice(0, 4)
            .map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
      </section>
      <section className="manifesto">
        <p className="eyebrow">JERSKITS. / {t("beautiful")}</p>
        <h2>
          {t("manifestoFirst")}
          <br />
          <span>{t("manifestoSecond")}</span>
        </h2>
        <p>{t("footerCopy")}</p>
        <Link className="button button-light" to="/catalog">
          {t("shop")} <ArrowUpRight size={18} />
        </Link>
        <span className="manifesto-number" aria-hidden="true" />
      </section>
    </>
  );
}
