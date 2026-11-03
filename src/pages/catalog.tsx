import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { sizes } from "../catalog/products";
import { filterProducts, readFilters, teams } from "../catalog/filter-products";
import { ProductCard } from "../components/product-card";

export function Catalog() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const filters = readFilters(params);
  const result = filterProducts(filters, {
    home: t("homeShirt"),
    away: t("awayShirt"),
    third: t("thirdShirt"),
  });
  function update(key: string, value: string) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  const active =
    filters.query || filters.team || filters.size || filters.max < 150;
  return (
    <div className="section-wrap catalog-page">
      <div className="page-heading">
        <p className="eyebrow">{t("catalogEyebrow")}</p>
        <h1>{t("collection")}</h1>
        <p>{t("catalogCopy")}</p>
      </div>
      <div className="catalog-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input
            type="search"
            aria-label={t("searchPlaceholder")}
            placeholder={t("searchPlaceholder")}
            value={filters.query}
            onChange={(event) => update("q", event.target.value)}
          />
        </label>
        <label className="sort-field">
          <span>{t("sort")}</span>
          <select
            value={filters.sort}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="featured">{t("sortFeatured")}</option>
            <option value="price-asc">{t("sortLow")}</option>
            <option value="price-desc">{t("sortHigh")}</option>
          </select>
        </label>
      </div>
      <fieldset className="catalog-filters">
        <legend className="sr-only">{t("filters")}</legend>
        <span className="filters-title">
          <SlidersHorizontal size={15} /> {t("filters")}
        </span>
        <label>
          {t("team")}
          <select
            value={filters.team}
            onChange={(event) => update("team", event.target.value)}
          >
            <option value="">{t("allTeams")}</option>
            {teams.map((team) => (
              <option key={team}>{team}</option>
            ))}
          </select>
        </label>
        <label>
          {t("size")}
          <select
            value={filters.size}
            onChange={(event) => update("size", event.target.value)}
          >
            <option value="">{t("allSizes")}</option>
            {sizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </label>
        <label className="price-filter">
          {t("maxPrice")}
          <span>
            <span aria-hidden="true">$</span>
            <input
              type="number"
              min="0"
              max="150"
              step="5"
              value={filters.max}
              aria-label={t("maxPrice")}
              onChange={(event) => update("max", event.target.value)}
            />
          </span>
        </label>
        {active && (
          <button className="clear-filter" onClick={() => setParams({})}>
            {t("clear")}
          </button>
        )}
      </fieldset>
      <p className="result-count" role="status">
        {t("results", { count: result.length })}
      </p>
      {result.length ? (
        <div className="product-grid">
          {result.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              headingLevel={2}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={38} strokeWidth={1} />
          <h2>{t("noResults")}</h2>
          <p>{t("noResultsCopy")}</p>
          <button className="button" onClick={() => setParams({})}>
            {t("clear")}
          </button>
        </div>
      )}
    </div>
  );
}
