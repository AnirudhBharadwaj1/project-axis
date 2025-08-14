import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WhiteButton from "./WhiteButton";
import "../styles/KitSlides.css";
import gladius from "../assets/temp/gladius.jpeg";

const FADE_MS = 600; // keep in sync with CSS var --fadeMs

function KitSlides({ products }) {
    const displayProducts = products.slice(0, 3);
    const len = displayProducts.length || 1;

    const [slide, setSlide] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Two-layer gradient crossfade
    const [bottomBg, setBottomBg] = useState(
        displayProducts[0]?.background || "linear-gradient(90deg,#fff,#eee)"
    );
    const [topBg, setTopBg] = useState(
        displayProducts[0]?.background || "linear-gradient(90deg,#fff,#eee)"
    );

    const crossfadeTo = (nextIndex) => {
        if (isFading || len < 2) return;
        const idx =
            ((typeof nextIndex === "function" ? nextIndex(slide) : nextIndex) +
                len) %
            len;
        const newBg = displayProducts[idx].background;

        // Start both animations in the same frame
        setTopBg(newBg);
        setIsFading(true);

        // After fade: commit slide & background
        setTimeout(() => {
            setSlide(idx);
            setBottomBg(newBg);
            setIsFading(false);
        }, FADE_MS);
    };

    const nextSlide = () => crossfadeTo((slide + 1) % len);
    const prevSlide = () => crossfadeTo((slide - 1 + len) % len);

    // Auto-advance without stale closure
    useEffect(() => {
        const id = setTimeout(() => {
            nextSlide();
        }, 8000);
        return () => clearTimeout(id);
    }, [slide, len]); // re-arm after each change

    return (
        <div
            className="kit-slides-div"
            style={{
                "--bottomBg": bottomBg,
                "--topBg": topBg,
                "--topOpacity": isFading ? 1 : 0,
                "--fadeMs": `${FADE_MS}ms`,
            }}
        >
            <FaChevronLeft
                size={50}
                className={`kit-slide-chevron ${isFading ? "disabled" : ""}`}
                onClick={prevSlide}
            />

            <div className="kit-slide-column">
                <div
                    className={`kit-slide-content ${
                        isFading ? "kit-slide-fade-out" : "kit-slide-fade-in"
                    }`}
                    key={slide}
                >
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
                    </div>
                </div>

                <WhiteButton
                    text="Download Now"
                    link={`/product/${displayProducts[slide].id}`}
                    style={{ marginTop: "auto", marginBottom: "4rem" }}
                />
            </div>

            <FaChevronRight
                size={50}
                className={`kit-slide-chevron ${isFading ? "disabled" : ""}`}
                onClick={nextSlide}
            />
        </div>
    );
}

export default KitSlides;
