import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ptBR } from "./locales/pt-BR";
import { es } from "./locales/es";
import { readStored, writeStored } from "./store/browser-storage";

const saved = readStored("jerskits.language");
const language = saved && ["en", "pt-BR", "es"].includes(saved) ? saved : "en";
i18n.on("languageChanged", (selected) => {
  document.documentElement.lang = selected;
  document.title = `Jerskits. — ${i18n.t("footerLine")}`;
  writeStored("jerskits.language", selected);
});
void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
    es: { translation: es },
  },
  lng: language,
  fallbackLng: "en",
  supportedLngs: ["en", "pt-BR", "es"],
  load: "currentOnly",
  interpolation: { escapeValue: false },
});
export default i18n;
