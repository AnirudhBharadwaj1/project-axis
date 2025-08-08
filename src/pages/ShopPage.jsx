import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ShopPage() {
    const { filter } = useParams();

    return (
        <div className="page">
            <Navbar />
            <h3>SHOP: {filter}</h3>
        </div>
    );
}

export default ShopPage;
