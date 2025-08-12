import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./pages/ShopPage";
import FreePage from "./pages/FreePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop/:filter?" element={<ShopPage />} />
                <Route path="/free/" element={<FreePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* TODO: Make sure this naming convention is fine */}
                <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    </StrictMode>
);
