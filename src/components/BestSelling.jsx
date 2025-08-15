import { useState } from "react";
import "../styles/BestSelling.css";

import gladius from "../assets/temp/gladius.jpeg";

function BestSelling({ products }) {
    // Get the top three products sold
    const getBestSellers = () => {
        return products.sort((a, b) => b.numSold - a.numSold).slice(0, 3);
    };

    const [hovered, setHovered] = useState(null);

    return (
        <div className="best-selling-div">
            <h3 className="section-title">Most Popular Kits</h3>
            <div className="best-selling-display">
                {getBestSellers().map((product, key) => (
                    <a
                        key={key}
                        href={`/product/` + product.id}
                        className={`best-selling-product ${
                            hovered === key ? "hovered" : ""
                        }`}
                        style={{ "--glow": product.background }}
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img
                            src={gladius}
                            alt="Product display image"
                            className="best-selling-image"
                        />
                        <h3 className="best-selling-header">
                            {product.name.toUpperCase()}
                        </h3>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default BestSelling;
