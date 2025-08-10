import "../styles/ProductCard.css";

import gladius from "../assets/temp/gladius.jpeg";

function ProductCard({ product }) {
    return (
        <a href={`/product/product.id`} className="product-card">
            <img
                // src={product.image}      // TODO: Change it back to this
                src={gladius}
                alt="Product Image"
                className="product-card-image"
            />
            <h3 className="product-card-name">{product.name.toUpperCase()}</h3>
        </a>
    );
}

export default ProductCard;
