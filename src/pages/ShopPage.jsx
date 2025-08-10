import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/ShopPage.css";

function ShopPage() {
    const { filter } = useParams();
    const [selectedFilters, setSelectedFilters] = useState(
        filter ? [filter] : []
    );
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
            <div className="shop-page-content">
                <Filter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
                {products.map((product, key) => (
                    <ProductCard key={key} product={product} />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default ShopPage;
