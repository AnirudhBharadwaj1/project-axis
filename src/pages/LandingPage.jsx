import { useState, useEffect } from "react";
import "../styles/LandingPage.css";
import Navbar from "../components/Navbar";
import KitSlides from "../components/KitSlides";
import Footer from "../components/Footer";

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
        <div className="page">
            <Navbar />
            <div style={{ position: "relative" }}>
                {products.length > 0 && <KitSlides products={products} />}
            </div>
            {/* TODO: Remove this div */}
            <div
                style={{
                    height: "100rem",
                    zIndex: "10",
                    position: "relative",
                    backgroundColor: "white",
                }}
            ></div>
            <Footer />
        </div>
    );
}

export default LandingPage;
