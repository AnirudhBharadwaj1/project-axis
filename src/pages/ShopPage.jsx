import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/ShopPage.css";

function ShopPage() {
    const { filter } = useParams();
    const [selectedFilters, setSelectedFilters] = useState(
        filter ? [filter] : []
    );
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the products from the database
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

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
        setLoading(false);
    }, []);

    // Update filters
    useEffect(() => {
        setSelectedFilters([filter]);
    }, [filter]);

    // Update products on display
    useEffect(() => {
        if (selectedFilters.length === 0) {
            setSelectedProducts(products);
        } else {
            setSelectedProducts(
                products.filter((product) =>
                    product.tags.some((tag) => selectedFilters.includes(tag))
                )
            );
        }
    }, [products, selectedFilters]);

    if (loading) return <Loader />;

    return (
        <div className="page scrollbar">
            <Navbar />
            <div className="shop-page-content">
                <Filter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
                <div className="shop-page-products">
                    {selectedProducts.map((product, key) => (
                        <ProductCard key={key} product={product} />
                    ))}

                    {/* TODO: Delete these, but for testing purposes, leave them in */}
                    {selectedProducts.map((product, key) => (
                        <ProductCard key={key} product={product} />
                    ))}
                    {selectedProducts.map((product, key) => (
                        <ProductCard key={key} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShopPage;
