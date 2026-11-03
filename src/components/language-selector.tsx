import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  return (
    <label className="language-switch">
      <span className="sr-only">{t("language")}</span>
      <select
        value={i18n.language}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value);
        }}
      >
        <option value="en" lang="en">
          EN
        </option>
        <option value="pt-BR" lang="pt-BR">
          PT
        </option>
        <option value="es" lang="es">
          ES
        </option>
      </select>
    </label>
  );
}
