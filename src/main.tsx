import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/500.css";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/700.css";
import "@fontsource/bebas-neue/400.css";
import "./i18n";
import "./styles.css";
import "./catalog/catalog.css";
import "./commerce.css";
import "./checkout/checkout.css";
import "./locales/language.css";
import "./presentation.css";
import "./components/featured-hero.css";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Catalog } from "./pages/catalog";
import { ProductPage, NotFound } from "./pages/product";
import { CartProvider } from "./store/cart";
import { CartPage } from "./pages/cart";
import { CheckoutPage, ConfirmationPage } from "./pages/checkout";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="shirts/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CartProvider>,
);
