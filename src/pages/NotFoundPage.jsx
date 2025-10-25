import "../styles/LandingPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFoundPage() {
    return (
        <div className="page scrollbar">
            <Navbar />
            <h1 className="section-title">404 - Page Not Found</h1>
            <Footer />
        </div>
    );
}

export default NotFoundPage;
