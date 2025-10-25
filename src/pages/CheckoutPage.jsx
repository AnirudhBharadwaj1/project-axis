import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../styles/CheckoutPage.css";

function PurchasePage() {
    const { cart } = useContext(CartContext);

    return (
        <div className="page scrollbar">
            <h3>Items in cart: {cart}</h3>
        </div>
    );
}

export default PurchasePage;
