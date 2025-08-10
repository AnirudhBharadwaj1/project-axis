import { useState, useEffect } from "react";
import "../styles/LandingPage.css";
import Navbar from "../components/Navbar";
import KitSlides from "../components/KitSlides";

function LandingPage() {
    const [products, setProducts] = useState([]);

    // Get the products from the database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/getProducts");

                const data = await res.json();
                setProducts(data);

                // TODO: Run a sort on them
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
            {products.length > 0 && <KitSlides products={products} />}
        </div>
    );
}

export default LandingPage;
