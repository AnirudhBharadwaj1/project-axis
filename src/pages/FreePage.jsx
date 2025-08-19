import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/FreePage.css";

function FreePage() {
    const [products, setProducts] = useState([]);
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
                    "Error fetching products on frontend side:",
                    error
                );
            }
        };

        fetchProducts();
        setLoading(false);
    }, []);

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

        const handleEscape = (e) => {
            if (e.key === "Escape" && showModal) {
                setModalProduct(null);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [showModal]);

    if (loading) return <Loader />;

    return (
        <div className="page">
            <Navbar />
            <div className="shop-page-products">
                {products.map((product, key) => (
                    <ProductCard
                        key={key}
                        product={product}
                        setModalProduct={setModalProduct}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default FreePage;
