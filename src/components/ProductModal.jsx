import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import "../styles/ProductModal.css";

import chroma from "../assets/temp/chroma.jpeg";

function ProductModal({ product, setModalProduct }) {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains("product-modal-backdrop")) {
            setModalProduct(null);
        }
    };

    // TODO: ADD A WAY TO CLOSE THIS MODAL, AND ADD THE ONCLICKS
    return (
        <>
            {product && (
                <div
                    className="product-modal-backdrop"
                    onClick={handleBackgroundClick}
                >
                    <div className="product-modal scrollbar">
                        <FaTimes
                            className="product-modal-close"
                            onClick={() => setModalProduct(null)}
                        />

                        <h3 className="product-modal-header">{product.name}</h3>

                        <div className="product-modal-row">
                            <img
                                src={chroma}
                                alt="Product image"
                                className="product-modal-image"
                            />

                            <div className="product-modal-col">
                                <p className="product-modal-desc">
                                    {product.desc}
                                </p>

                                <div className="product-modal-buttons">
                                    <button
                                        className="product-modal-button"
                                        onClick={() => {
                                            cart.includes(product.id)
                                                ? removeFromCart(product.id)
                                                : addToCart(product.id);
                                        }}
                                    >
                                        {cart.includes(product.id)
                                            ? "Remove from Cart"
                                            : "Add to Cart"}
                                    </button>
                                    <a
                                        href={`/product/` + product.id}
                                        className="product-modal-link"
                                    >
                                        <button className="product-modal-button">
                                            View Product Details
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductModal;
