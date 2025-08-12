import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/FreePage.css";

function FreePage() {
    return (
        <div className="page" style={{ height: "100vh" }}>
            <Navbar />
            <h3 className="section-title">Free Kits</h3>
            <Footer />
        </div>
    );
}

export default FreePage;
