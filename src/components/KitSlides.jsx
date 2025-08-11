import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WhiteButton from "./WhiteButton";
import "../styles/KitSlides.css";

import gladius from "../assets/temp/gladius.jpeg";

function KitSlides({ products }) {
    const [slide, setSlide] = useState(0);
    const [fading, setFading] = useState(false);
    const displayProducts = products.slice(0, 3);

    // Go to the next slide
    const nextSlide = () => {
        setFading(true);

        setTimeout(() => {
            setSlide((slide + 1) % 3);
            setFading(false);
        }, 500);
    };

    // Go to the previous slide
    const prevSlide = () => {
        setFading(true);

        setTimeout(() => {
            if (slide === 0) {
                setSlide(2);
            } else {
                setSlide(slide - 1);
            }
            setFading(false);
        }, 500);
    };

    // Automatically change slides
    useEffect(() => {
        const interval = setInterval(() => {
            setFading(true);

            setTimeout(() => {
                setSlide((prev) => (prev + 1) % 3);
                setFading(false);
            }, 500);
        }, 8000);

        return () => clearInterval(interval);
    }, [displayProducts.length]);

    return (
        <div
            className="kit-slides-div"
            style={{ background: displayProducts[slide].background }}
        >
            <FaChevronLeft
                size={40}
                className="kit-slide-chevron"
                onClick={prevSlide}
            />
            <div className="kit-slide-column">
                <div
                    className={`kit-slide-content ${
                        fading ? "kit-slide-fade-out" : "kit-slide-fade-in"
                    }`}
                    key={slide}
                >
                    <img
                        // TODO: Change this to use product.image
                        src={gladius}
                        alt="kit image"
                        className="kit-slide-image"
                    />
                    <div className="kit-slide-text">
                        <h3 className="kit-slide-header">
                            {displayProducts[slide].name.toUpperCase()}
                        </h3>
                        <p className="kit-slide-desc">
                            {displayProducts[slide].desc}
                        </p>
                    </div>
                </div>
                <WhiteButton
                    text="Buy Now"
                    link={`/product/` + displayProducts[slide].id}
                    style={{ marginTop: "auto", marginBottom: "4rem" }}
                />
            </div>
            <FaChevronRight
                size={40}
                className="kit-slide-chevron"
                onClick={nextSlide}
            />
        </div>
    );
}

export default KitSlides;
