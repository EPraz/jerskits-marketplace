import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Shirt,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "../catalog/products";
import { ProductCard } from "../components/product-card";

export function Home() {
  const { t } = useTranslation();
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-lines" aria-hidden="true" />
        <div className="hero-top">
          <span>
            <span className="live-dot" /> {t("newSeason")}
          </span>
          <span>01 — LFC</span>
        </div>
        <div className="hero-team">
          <span className="team-emblem">LFC</span>
          <span>
            LIVERPOOL FC
            <br />
            <small>YOU’LL NEVER WALK ALONE</small>
          </span>
        </div>
        <p className="hero-kicker">
          {t("official")} · {products[0].season}
        </p>
        <h1 id="hero-title">LIVERPOOL</h1>
        <img
          className="hero-shirt"
          src="/images/liverpool-nike.png"
          alt={`Liverpool ${t("homeShirt")}`}
          width="700"
          height="700"
          fetchPriority="high"
        />
        <div className="hero-story">
          <span className="story-mark" aria-hidden="true">
            LFC
          </span>
          <div>
            <p className="eyebrow">{t("storyEyebrow")}</p>
            <h2>{t("storyTitle")}</h2>
            <p>{t("storyCopy")}</p>
          </div>
        </div>
        <div className="hero-description">
          <p>{t("heroCopy")}</p>
          <Link className="button button-light" to="/shirts/liverpool-home">
            {t("shopShirt")} <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="hero-bottom">
          <Link to="/catalog">
            {t("explore")} <ArrowRight size={17} />
          </Link>
          <span>
            {t("scroll")} <ArrowDown size={14} />
          </span>
        </div>
      </section>
      <section className="benefits" aria-label={t("authentic")}>
        {[
          [Shirt, "authentic", "authenticCopy"],
          [Truck, "delivery", "deliveryCopy"],
          [Globe2, "guest", "guestCopy"],
        ].map(([Icon, title, copy]) => {
          const Symbol = Icon as typeof Shirt;
          return (
            <div key={String(title)}>
              <Symbol size={26} strokeWidth={1.3} />
              <div>
                <h2>{t(String(title))}</h2>
                <p>{t(String(copy))}</p>
              </div>
            </div>
          );
        })}
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
