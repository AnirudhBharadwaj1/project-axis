import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProductPage() {
    const { product } = useParams();

    return (
        <div className="page">
            <Navbar />
            <h3>The product</h3>
            <h3>More product</h3>
        </div>
    );
}

export default ProductPage;
