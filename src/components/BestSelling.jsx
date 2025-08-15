import { useState } from "react";
import "../styles/BestSelling.css";

import gladius from "../assets/temp/gladius.jpeg";

function BestSelling({ products }) {
    const [hovered, setHovered] = useState(null);
    const [tiltStyle, setTiltStyle] = useState({});

    // Get the top three products sold
    const getBestSellers = () => {
        return products.sort((a, b) => b.numSold - a.numSold).slice(0, 3);
    };

    // Tilt the cards when the user's mouse hovers over
    const handleMouseMove = (e, key) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left; // mouse X inside card
        const y = e.clientY - rect.top; // mouse Y inside card

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Range of tilt (in degrees)
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        if (hovered === key) {
            setTiltStyle({
                transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
            });
        }
    };

    const resetTilt = () => {
        setTiltStyle({
            transform:
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        });
    };

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
                        style={{
                            "--glow": product.background,
                            ...(hovered === key ? tiltStyle : {}),
                        }}
                        onMouseEnter={() => setHovered(key)}
                        onMouseMove={(e) => handleMouseMove(e, key)}
                        onMouseLeave={() => {
                            setHovered(null);
                            resetTilt();
                        }}
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
