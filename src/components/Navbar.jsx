import { FiUser } from "react-icons/fi";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <div className="navbar-div">
            <h3 className="navbar-title">PROD.BYAXIS</h3>
            <div className="navbar-routes">
                <a href="/" className="navbar-link">
                    Home
                </a>
                <a href="/shop" className="navbar-link">
                    Free Kits
                </a>
                <a href="/shop" className="navbar-link">
                    Drum Kits
                </a>
                <a href="/shop" className="navbar-link">
                    One Shot Kits
                </a>
                <a href="/shop" className="navbar-link">
                    Loop Kits
                </a>
            </div>
            <div>
                <FiUser size={40} />
            </div>
        </div>
    );
}

export default Navbar;
