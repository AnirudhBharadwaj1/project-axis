import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gladius from "../assets/temp/gladius.jpeg";
import WhiteButton from "./WhiteButton";
import "../styles/KitSlides.css";

function KitSlides({ products }) {
    const [slide, setSlide] = useState(0);
    const displayProducts = products.slice(0, 3);

    console.log("DEBUG: displayProducts:", displayProducts);

    // Go to the next slide
    const nextSlide = () => {
        setSlide((slide + 1) % 3);
    };

    // Go to the previous slide
    const prevSlide = () => {
        if (slide === 0) {
            setSlide(2);
        } else {
            setSlide(slide - 1);
        }
    };

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
            <div className="kit-slide-content">
                <img
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
                    <WhiteButton
                        text="Buy Now"
                        link={displayProducts[slide].productLink}
                        style={{ marginTop: "auto" }}
                    />
                </div>
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
