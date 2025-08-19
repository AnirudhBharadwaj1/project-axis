import { useContext } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";
import "../styles/ProductCard.css";

import gladius from "../assets/temp/gladius.jpeg";
// import apeiron from "../assets/temp/apeiron.png";
// import chroma from "../assets/temp/chroma.jpeg";

function ProductCard({ product, setModalProduct }) {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    return (
        <div
            className="product-card fade-product-in"
            style={{
                "--glow": product.background,
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
                <div className="product-card-text-div">
                    <h3 className="product-card-name">{product.name}</h3>
                    {product.price !== 0 && (
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
