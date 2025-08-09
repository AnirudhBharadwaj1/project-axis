import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gladius from "../assets/temp/gladius.jpeg";
import chroma from "../assets/temp/chroma.jpeg";
import WhiteButton from "./WhiteButton";
import "../styles/KitSlides.css";

function KitSlides() {
    const [slide, setSlide] = useState(0);

    // TODO: Pull this from the db in the future
    // List of product objects
    const products = [
        {
            image: gladius,
            name: "Gladius Drumkit",
            desc: "The Gladius Drumkit focuses on delivering hard, punchy sounds to your beat. Meant to be used for trap and hip hop, this drum kit provides essential flavor to your bounce.",
            bg: "linear-gradient(to right, #ffaaa9 0%, #dd3f3e 50%, #ffaaa9 100%)",
            productLink: "/product/12345/",
        },
        {
            image: chroma,
            name: "Chroma FX Kit",
            desc: "This FX pack be crazy crodie",
            bg: "linear-gradient(to right, #ffaaa9 0%, #dd3f3e 50%, #ffaaa9 100%)",
            productLink: "/product/56789",
        },
    ];

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
            style={{ background: products[slide].bg }}
        >
            <FaChevronLeft
                size={40}
                className="kit-slide-chevron"
                onClick={prevSlide}
            />
            <div className="kit-slide-content">
                <img
                    src={products[slide].image}
                    alt="kit image"
                    className="kit-slide-image"
                />
                <div className="kit-slide-text">
                    <h3 className="kit-slide-header">
                        {products[slide].name.toUpperCase()}
                    </h3>
                    <p className="kit-slide-desc">{products[slide].desc}</p>
                    <WhiteButton
                        text="Buy Now"
                        link={products[slide].productLink}
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
