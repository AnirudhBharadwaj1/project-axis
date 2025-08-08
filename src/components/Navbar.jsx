import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <div className="navbar-div">
            <h3 className="navbar-title">PROD.BYAXIS</h3>
            <div className="navbar-routes">
                <Link to="/" className="navbar-link">
                    Home
                </Link>
                <Link to="/shop/free-kits" className="navbar-link">
                    Free Kits
                </Link>
                <Link to="/shop/drum-kits" className="navbar-link">
                    Drum Kits
                </Link>
                <Link to="/shop/one-shot-kits" className="navbar-link">
                    One Shot Kits
                </Link>
                <Link to="/shop/loop-kits" className="navbar-link">
                    Loop Kits
                </Link>
            </div>
            <div className="navbar-account-div">
                <FiUser size={30} />
            </div>
        </div>
    );
}

export default Navbar;
