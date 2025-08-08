import "../styles/LandingPage.css";
import Navbar from "../components/Navbar";
import KitSlides from "../components/KitSlides";

function LandingPage() {
    return (
        <div className="page">
            <Navbar />
            <KitSlides />
        </div>
    );
}

export default LandingPage;
