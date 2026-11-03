import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productById } from "../catalog/products";

const slides = [
  {
    id: "liverpool-home",
    image: "/images/liverpool-nike.png",
    badge: "LFC",
    club: "LIVERPOOL FC",
    motto: "YOU’LL NEVER WALK ALONE",
    tone: "liverpool",
  },
  {
    id: "barcelona-home",
    image: "/images/barcelona-hero.png",
    badge: "FCB",
    club: "FC BARCELONA",
    motto: "MÉS QUE UN CLUB",
    tone: "barcelona",
  },
  {
    id: "brazil-home",
    image: "/images/brazil-hero.png",
    badge: "BRA",
    club: "BRASIL",
    motto: "ORDEM E PROGRESSO",
    tone: "brazil",
  },
] as const;

export function FeaturedHero() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const product = productById(slide.id)!;
  function move(direction: number) {
    setIndex(
      (current) => (current + direction + slides.length) % slides.length,
    );
  }
  return (
    <section
      className="hero"
      data-team={slide.tone}
      aria-labelledby="hero-title"
      aria-roledescription={t("featuredCarousel")}
    >
      <div className="hero-lines" aria-hidden="true" />
      <div className="hero-top">
        <span>
          <span className="live-dot" /> {t("newSeason")}
        </span>
        <span>
          {String(index + 1).padStart(2, "0")} — {slide.badge}
        </span>
      </div>
      <div className="hero-team">
        <span className="team-emblem">{slide.badge}</span>
        <span>
          {slide.club}
          <br />
          <small>{slide.motto}</small>
        </span>
      </div>
      <p className="hero-kicker">
        {t("official")} · {product.season}
      </p>
      <h1 id="hero-title" aria-live="polite" aria-atomic="true">
        {product.team.toUpperCase()}
      </h1>
      <img
        key={slide.id}
        className="hero-shirt"
        src={slide.image}
        alt={`${product.team} ${t(`${product.kind}Shirt`)}`}
        width="1000"
        height="1000"
        fetchPriority={index === 0 ? "high" : "auto"}
      />
      <div className="hero-story">
        <span className="story-mark" aria-hidden="true">
          {slide.badge}
        </span>
        <div>
          <p className="eyebrow">{t("storyEyebrow")}</p>
          <h2>{t("storyTitle")}</h2>
          <p>{t("storyCopy")}</p>
        </div>
      </div>
      <div className="hero-description">
        <p>{t("heroCopy")}</p>
        <Link className="button button-light" to={`/shirts/${product.id}`}>
          {t("shopShirt")} <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="hero-bottom">
        <Link to="/catalog">
          {t("explore")} <ArrowRight size={17} />
        </Link>
        <div
          className="hero-controls"
          role="group"
          aria-label={t("featuredControls")}
        >
          <button onClick={() => move(-1)} aria-label={t("previousShirt")}>
            <ArrowLeft size={18} />
          </button>
          <span aria-hidden="true">
            {String(index + 1).padStart(2, "0")}{" "}
            <span>/ {String(slides.length).padStart(2, "0")}</span>
          </span>
          <button onClick={() => move(1)} aria-label={t("nextShirt")}>
            <ArrowRight size={18} />
          </button>
        </div>
        <span className="hero-scroll">
          {t("scroll")} <ArrowDown size={14} />
        </span>
      </div>
    </section>
  );
}
