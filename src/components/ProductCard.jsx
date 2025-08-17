import { FaShoppingCart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import "../styles/ProductCard.css";

// import gladius from "../assets/temp/gladius.jpeg";
import apeiron from "../assets/temp/apeiron.png";
// import chroma from "../assets/temp/chroma.jpeg";

function ProductCard({ product }) {
    return (
        <a
            href={`/product/` + product.id}
            className="product-card fade-product-in"
            style={{ "--glow": product.background }}
        >
            <div className="product-card-icons">
                <FaShoppingCart className="product-card-icon" size={30} />
                <FiEye className="product-card-icon" size={30} />
            </div>

            <img
                // src={product.image}      // TODO: Change it back to this
                src={apeiron}
                alt="Product image"
                className="product-card-image"
            />
            {/* <h3 className="product-card-name">{product.name.toUpperCase()}</h3> */}
            <div className="product-card-text-div">
                <h3 className="product-card-name">{product.name}</h3>
                <h3 className="product-card-name">${product.price}.00</h3>
            </div>
        </a>
    );
}

export default ProductCard;
