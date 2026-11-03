export const shippingFields = [
  {
    key: "name",
    label: "fullName",
    autocomplete: "name",
    required: true,
    type: "text",
  },
  {
    key: "email",
    label: "emailAddress",
    autocomplete: "email",
    required: true,
    type: "email",
  },
  {
    key: "country",
    label: "country",
    autocomplete: "country-name",
    required: true,
    type: "text",
  },
  {
    key: "city",
    label: "city",
    autocomplete: "address-level2",
    required: true,
    type: "text",
  },
  {
    key: "address",
    label: "address",
    autocomplete: "street-address",
    required: true,
    type: "text",
  },
  {
    key: "phone",
    label: "phone",
    autocomplete: "tel",
    required: false,
    type: "tel",
  },
  {
    key: "postal",
    label: "postal",
    autocomplete: "postal-code",
    required: false,
    type: "text",
  },
] as const;
export type ShippingKey = (typeof shippingFields)[number]["key"];
export type Shipping = Record<ShippingKey, string>;
export type ShippingErrors = Partial<Record<ShippingKey, string>>;
export const emptyShipping: Shipping = {
  name: "",
  email: "",
  country: "",
  city: "",
  address: "",
  phone: "",
  postal: "",
};
export const exampleShipping: Shipping = {
  name: "Alex Morgan",
  email: "alex@example.com",
  country: "United Kingdom",
  city: "Liverpool",
  address: "12 Anfield Road",
  phone: "",
  postal: "",
};
export function validateShipping(values: Shipping): ShippingErrors {
  const errors: ShippingErrors = {};
  for (const field of shippingFields) {
    if (field.required && !values[field.key].trim())
      errors[field.key] = `${field.key}Required`;
  }
  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  )
    errors.email = "emailInvalid";
  return errors;
}
