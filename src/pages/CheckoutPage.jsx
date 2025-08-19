import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartContext } from "../contexts/CartContext";
import "../styles/CheckoutPage.css";

function PurchasePage() {
    const { cart } = useContext(CartContext);

    return (
        <div className="page scrollbar">
            <Navbar />
            <h3>Items in cart: {cart}</h3>
            <Footer />
        </div>
    );
}

export default PurchasePage;
