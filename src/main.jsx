import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./pages/ShopPage";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    //     <LandingPage />
    // </StrictMode>
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop/:filter" element={<ShopPage />} />
            </Routes>
        </Router>
    </StrictMode>
);
