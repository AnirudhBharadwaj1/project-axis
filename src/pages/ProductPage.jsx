import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    // Get the product based on the id
    useEffect(() => {
        const fetchProduct = async (productId) => {
            console.log("DEBUG FRONTEND:", productId);

            try {
                // const res = await fetch(
                //     `http://localhost:5000/getProductById/${productId}`
                // );
                // const res = await fetch("http://localhost:5000/getProductById");
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
    }, []);

    return (
        <div className="page">
            <Navbar />
            {product && <h3>The product: {product.name}</h3>}
            <Footer />
        </div>
    );
}

export default ProductPage;
