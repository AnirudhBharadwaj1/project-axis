import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Footer from "../components/Footer";
import "../styles/ShopPage.css";

function FreePage() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get the products from the database
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    "http://localhost:5000/getProducts?type=free"
                );

                const data = await res.json();

                const sorted = data.sort(
                    (a, b) => new Date(b.time) - new Date(a.time)
                );

                setProducts(sorted);
            } catch (error) {
                console.error(
                    "Error fetching free products on frontend side:",
                    error
                );
            }
        };

        fetchProducts();
        setLoading(false);
    }, []);

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

    // Show the modal if "View More" was clicked on a product
    useEffect(() => {
        if (modalProduct) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [modalProduct]);

    // Stuff to do if modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        document.body.style.overflow = showModal ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    if (loading) return <Loader />;

    return (
        <div className="page scrollbar">
            <Navbar />
            <div
                className="shop-page-content"
                style={{ filter: showModal ? "blur(7px)" : "none" }}
            >
                <Filter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
                <div className="shop-page-products">
                    {selectedProducts.map((product, key) => (
                        <ProductCard
                            key={key}
                            product={product}
                            setModalProduct={setModalProduct}
                        />
                    ))}

                    {/* TODO: Delete these, but for testing purposes, leave them in */}
                    {selectedProducts.map((product, key) => (
                        <ProductCard
                            key={key}
                            product={product}
                            setModalProduct={setModalProduct}
                        />
                    ))}
                    {selectedProducts.map((product, key) => (
                        <ProductCard
                            key={key}
                            product={product}
                            setModalProduct={setModalProduct}
                        />
                    ))}
                </div>
            </div>

            {/* PRODUCT MODAL */}
            {showModal && (
                <ProductModal
                    product={modalProduct}
                    setModalProduct={setModalProduct}
                />
            )}
            <Footer />
        </div>
    );
}

export default FreePage;
