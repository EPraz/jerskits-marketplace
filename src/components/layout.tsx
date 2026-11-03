import { ArrowUpRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCart } from "../store/cart";
import { LanguageSelector } from "./language-selector";
import { ResetDemo } from "./reset-demo";

export function Layout() {
  const { t } = useTranslation();
  const { lines } = useCart();
  const count = lines.reduce((total, line) => total + line.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCatalog = location.pathname === "/catalog";
  const isCompact = isCatalog || location.pathname === "/walkthrough";
  const firstVisit = useRef(true);
  useEffect(() => {
    setMenuOpen(false);
    const initial = firstVisit.current;
    firstVisit.current = false;
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
      return;
    }
    if (initial) return;
    window.scrollTo(0, 0);
    document.getElementById("content")?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);
  return (
    <>
      <a className="skip-link" href="#content">
        {t("skip")}
      </a>
      {!isHome && (
        <div
          className={
            isCompact ? "announcement announcement--compact" : "announcement"
          }
        >
          <span>{t("tagline")}</span>
          <span>{t("demo")}</span>
          <span>{t("established")}</span>
        </div>
      )}
      <header
        className={`site-header${isHome ? " site-header--overlay" : isCompact ? " site-header--compact" : ""}`}
      >
        <button
          className="icon-button mobile-menu"
          aria-label={menuOpen ? t("close") : t("menu")}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Link className="wordmark" to="/" aria-label={t("brandHome")}>
          Jerskits<span>.</span>
        </Link>
        <nav
          id="main-navigation"
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label={t("menu")}
        >
          <NavLink to="/" end>
            {t("home")}
          </NavLink>
          <NavLink to="/catalog">{t("shop")}</NavLink>
          <Link to="/#featured" onClick={() => setMenuOpen(false)}>
            {t("edit")}
          </Link>
        </nav>
        <div className="header-actions">
          <LanguageSelector />
          <Link
            className="icon-button header-search"
            to="/catalog"
            aria-label={t("search")}
          >
            <Search size={21} />
          </Link>
          <Link
            className="icon-button bag-link"
            to="/cart"
            aria-label={`${t("cart")} (${count})`}
          >
            <ShoppingBag size={21} />
            {count > 0 && <span className="bag-count">{count}</span>}
          </Link>
        </div>
      </header>
      <main id="content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <Link className="wordmark" to="/">
              Jerskits.
            </Link>
            <p>{t("footerLine")}</p>
          </div>
          <p>{t("footerCopy")}</p>
          <Link className="text-link" to="/catalog">
            {t("shop")} <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jerskits.</span>
          <span>{t("copyright")}</span>
          <Link to="/walkthrough">{t("watchFilm")}</Link>
          <ResetDemo />
        </div>
      </footer>
    </>
  );
}
