import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  WandSparkles,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart, type CartLine } from "../store/cart";
import { OrderSummary } from "../components/order-summary";
import { EmptyCart } from "./cart";
import {
  emptyShipping,
  exampleShipping,
  shippingFields,
  validateShipping,
  type Shipping,
  type ShippingErrors,
} from "../checkout/shipping";
type Receipt = { number: string; lines: CartLine[] };

export function CheckoutPage() {
  const { t } = useTranslation();
  const { lines, clear } = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useState<Shipping>(emptyShipping);
  const [errors, setErrors] = useState<ShippingErrors>({});
  const submitted = useRef(false);
  if (!lines.length) return <EmptyCart />;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateShipping(values);
    setErrors(nextErrors);
    const firstError = shippingFields.find((field) => nextErrors[field.key]);
    if (firstError) {
      document.getElementById(`shipping-${firstError.key}`)?.focus();
      return;
    }
    if (submitted.current) return;
    submitted.current = true;
    const receipt: Receipt = {
      number: `JK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      lines: lines.map((line) => ({ ...line })),
    };
    clear();
    navigate("/confirmation", { state: { receipt }, replace: true });
  }
  return (
    <div className="section-wrap commerce-page checkout-page">
      <Link className="back-link" to="/cart">
        <ArrowLeft size={16} /> {t("backBag")}
      </Link>
      <ol className="checkout-steps">
        <li>
          <Check size={13} /> {t("cart")}
        </li>
        <li className="current">
          <span>02</span> {t("shippingDetails")}
        </li>
        <li>
          <span>03</span> {t("confirmation")}
        </li>
      </ol>
      <div className="page-heading">
        <p className="eyebrow">{t("checkoutEyebrow")}</p>
        <h1>{t("makeYours")}</h1>
        <p>{t("checkoutCopy")}</p>
      </div>
      <div className="commerce-grid">
        <form noValidate onSubmit={submit} className="shipping-form">
          <div className="form-heading">
            <h2>{t("shippingDetails")}</h2>
            <button
              type="button"
              className="demo-fill"
              onClick={() => {
                setValues({ ...exampleShipping });
                setErrors({});
              }}
            >
              <WandSparkles size={14} /> {t("fillDemo")}
            </button>
          </div>
          <div className="form-fields">
            {shippingFields.map((field) => (
              <div className={`form-field field-${field.key}`} key={field.key}>
                <label htmlFor={`shipping-${field.key}`}>
                  {t(field.label)}
                </label>
                <input
                  id={`shipping-${field.key}`}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autocomplete}
                  required={field.required}
                  maxLength={field.key === "address" ? 200 : 120}
                  value={values[field.key]}
                  aria-invalid={!!errors[field.key]}
                  aria-describedby={
                    errors[field.key] ? `error-${field.key}` : undefined
                  }
                  onChange={(event) => {
                    setValues((previous) => ({
                      ...previous,
                      [field.key]: event.target.value,
                    }));
                    setErrors((previous) => ({
                      ...previous,
                      [field.key]: undefined,
                    }));
                  }}
                />
                {errors[field.key] && (
                  <p className="field-error" id={`error-${field.key}`}>
                    {t(errors[field.key]!)}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="form-note">{t("shippingPrivacy")}</p>
          <button className="button full-width" type="submit">
            {t("confirmDemo")} <ArrowRight size={18} />
          </button>
          <p className="demo-purchase-copy">{t("demoPurchaseCopy")}</p>
        </form>
        <OrderSummary lines={lines} showItems />
      </div>
    </div>
  );
}

export function ConfirmationPage() {
  const { t } = useTranslation();
  const state = useLocation().state as { receipt?: Receipt } | null;
  const receipt = state?.receipt;
  if (!receipt?.lines?.length) return <EmptyCart />;
  return (
    <div className="section-wrap confirmation-page">
      <div className="confirmation-intro">
        <span className="confirmation-check">
          <Check size={30} strokeWidth={1.5} />
        </span>
        <p className="eyebrow">{t("fullTime")}</p>
        <h1>{t("orderSuccess")}</h1>
        <p>{t("orderSuccessCopy")}</p>
        <span className="order-reference">
          {t("orderNumber")} <strong>{receipt.number}</strong>
        </span>
      </div>
      <OrderSummary lines={receipt.lines} showItems />
      <div className="confirmation-actions">
        <Link className="button" to="/catalog">
          {t("continueShopping")} <ArrowUpRight size={18} />
        </Link>
        <p>{t("demoPurchaseCopy")}</p>
      </div>
    </div>
  );
}
