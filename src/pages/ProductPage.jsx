import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/ProductPage.css";

import gladius from "../assets/temp/gladius.jpeg";

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get the product based on the id
    useEffect(() => {
        const fetchProduct = async (productId) => {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:5000/getProductById?productId=${productId}`
                );

                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(
                    "Error fetching product on frontend side:",
                    error
                );
            }
        };

        fetchProduct(productId);
        setLoading(false);
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="page scrollbar">
            <Navbar />
            {product && (
                <div className="product-page-div">
                    <div className="product-videos">
                        {/* PUT THE VIDEOS HERE IN THE FUTURE */}
                        <img src={gladius} className="product-video" />
                        <img src={gladius} className="product-video" />
                        <img src={gladius} className="product-video" />
                    </div>
                    <div className="product-details">
                        <h3 className="product-header">{product.name}</h3>
                        <h3 className="product-price">${product.price}.00</h3>
                        <button className="product-page-button">
                            Add to Cart
                        </button>
                        <button className="product-page-button">Buy Now</button>
                        <h3 className="product-includes-item">
                            This pack includes:
                        </h3>
                        <ul className="product-includes-section">
                            {product.includes.map((item, key) => (
                                <li key={key} className="product-includes-item">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ProductPage;
