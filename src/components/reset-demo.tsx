import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../store/cart";

export function ResetDemo() {
  const { t, i18n } = useTranslation();
  const { clear } = useCart();
  const navigate = useNavigate();
  function reset() {
    clear();
    void i18n.changeLanguage("en");
    navigate("/", { replace: true, state: null });
    window.scrollTo(0, 0);
  }
  return (
    <button className="reset-demo" onClick={reset}>
      <RotateCcw size={12} /> {t("resetDemo")}
    </button>
  );
}
