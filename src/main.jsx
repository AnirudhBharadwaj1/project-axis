import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./pages/ShopPage";
import FreePage from "./pages/FreePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/shop/:filter?" element={<ShopPage />} />
                    <Route path="/shop/free-kits" element={<FreePage />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                    />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </Router>
        </CartProvider>
    </StrictMode>
);
