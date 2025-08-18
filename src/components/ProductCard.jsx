import { useContext } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";
import "../styles/ProductCard.css";

import gladius from "../assets/temp/gladius.jpeg";
// import apeiron from "../assets/temp/apeiron.png";
// import chroma from "../assets/temp/chroma.jpeg";

function ProductCard({ product, setModalProduct }) {
    const { addToCart, removeFromCart } = useContext(CartContext);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    return (
        <div
            className="product-card fade-product-in"
            style={{
                "--glow":
                    product.background ||
                    "linear-gradient(to right, #ececec 0%, #2e2e2e 50%, #ececec 100%",
            }}
        >
            <div className="product-card-icons">
                {cart.includes(product.id) ? (
                    <FaTrash
                        className="product-card-icon"
                        size={25}
                        onClick={() => removeFromCart(product.id)}
                    />
                ) : (
                    <FaShoppingCart
                        className="product-card-icon"
                        size={25}
                        onClick={() => addToCart(product.id)}
                    />
                )}
                <FiEye
                    className="product-card-icon"
                    size={25}
                    onClick={() => {
                        setModalProduct(product);
                    }}
                />
            </div>

            <a href={`/product/${product.id}`} className="product-card-content">
                <img
                    // src={product.image}      // TODO: Change it back to this
                    src={gladius}
                    alt="Product image"
                    className="product-card-image"
                />
                {/* <h3 className="product-card-name">{product.name.toUpperCase()}</h3> */}
                <div className="product-card-text-div">
                    <h3 className="product-card-name">{product.name}</h3>
                    {product.price && (
                        <h3 className="product-card-name">
                            ${product.price}.00
                        </h3>
                    )}
                </div>
            </a>
        </div>
    );
}

export default ProductCard;
