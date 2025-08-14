import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WhiteButton from "./WhiteButton";
import "../styles/KitSlides.css";
import gladius from "../assets/temp/gladius.jpeg";

function KitSlides({ products }) {
    const [slide, setSlide] = useState(0);
    const [bg1, setBg1] = useState(products[0].background); // bottom layer
    const [bg2, setBg2] = useState(products[0].background); // top layer
    const [textFade, setTextFade] = useState(false);
    const [fadeTopIn, setFadeTopIn] = useState(false);
    const displayProducts = products.slice(0, 3);

    const crossfadeTo = (newIndex) => {
        const newBg = displayProducts[newIndex].background;
        setBg2(newBg); // put new gradient in top layer
        setFadeTopIn(true); // fade it in
        setTextFade(true);

        setTimeout(() => {
            setSlide(newIndex);
            setBg1(newBg); // make it the bottom layer after fade
            setFadeTopIn(false); // hide top layer again
            setTextFade(false);
        }, 500); // matches CSS transition duration
    };

    const nextSlide = () => {
        crossfadeTo((slide + 1) % 3);
    };

    const prevSlide = () => {
        crossfadeTo(slide === 0 ? 2 : slide - 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            crossfadeTo((slide + 1) % 3);
        }, 3000); // TODO: Change this to 8s

        return () => clearInterval(interval);
    }, [slide]);

    return (
        <div
            className="kit-slides-div"
            style={{
                "--bg1": bg1,
                "--bg2": bg2,
                "--top-opacity": fadeTopIn ? 1 : 0,
            }}
        >
            <FaChevronLeft
                size={50}
                className="kit-slide-chevron"
                onClick={prevSlide}
            />
            <div className="kit-slide-column">
                <div
                    className={`kit-slide-content ${
                        textFade ? "kit=slide-fade-out" : "kit-slide-fade-in"
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
                    link={`/product/` + displayProducts[slide].id}
                    style={{ marginTop: "auto", marginBottom: "4rem" }}
                />
            </div>
            <FaChevronRight
                size={50}
                className="kit-slide-chevron"
                onClick={nextSlide}
            />
        </div>
    );
}

export default KitSlides;
