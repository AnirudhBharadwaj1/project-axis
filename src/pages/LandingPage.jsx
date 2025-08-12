import { useState, useEffect } from "react";
import "../styles/LandingPage.css";
import Navbar from "../components/Navbar";
import KitSlides from "../components/KitSlides";
import BestSelling from "../components/BestSelling";
import WhiteButton from "../components/WhiteButton";
import Footer from "../components/Footer";

import gladius from "../assets/temp/gladius.jpeg";
import gladiusfree from "../assets/temp/gladiusfree.jpeg";

function LandingPage() {
    const [products, setProducts] = useState([]);

    // Get the products from the database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/getProducts");

                const data = await res.json();

                const sorted = data.sort(
                    (a, b) => new Date(b.time) - new Date(a.time)
                );

                setProducts(sorted);
            } catch (error) {
                console.error(
                    "Error fetching products on frontend side:",
                    error
                );
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="page scrollbar">
            <Navbar />
            {products.length > 0 && <KitSlides products={products} />}
            {/* TODO: Remove this div */}
            {products.length > 0 && <BestSelling products={products} />}
            <div className="shop-now-div">
                {/*  */}
                <h3 className="section-title">Browse the Shop</h3>
                <div className="browse-shop-row">
                    <img
                        src={gladius}
                        alt="Shop Image"
                        className="browse-shop-image"
                    />
                    <div className="browse-shop-col">
                        <h3 className="browse-shop-header">
                            Discover the Shop
                        </h3>
                        <p className="browse-shop-desc"></p>
                    </div>
                </div>
                <div className="browse-shop-row">
                    <div className="browse-shop-col">
                        <h3 className="browse-shop-header">
                            Discover Free Kits
                        </h3>
                        <p className="browse-shop-desc"></p>
                    </div>
                    <img
                        src={gladiusfree}
                        alt="Shop Image"
                        className="browse-shop-image"
                    />
                </div>
                <h3>Filler</h3>
                <WhiteButton text={"Visit Shop"} link={"/shop"} />
                <WhiteButton text={"Visit Free Kits"} link={"/free"} />
            </div>
            <Footer />
        </div>
    );
}

export default LandingPage;
