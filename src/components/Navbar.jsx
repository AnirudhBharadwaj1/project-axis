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
                <Link to="/shop/drum-kits" className="navbar-link">
                    Drum Kits
                </Link>
                <Link to="/shop/one-shot-kits" className="navbar-link">
                    One Shot Kits
                </Link>
                <Link to="/shop/fx-kits" className="navbar-link">
                    FX Kits
                </Link>
                <Link to="/shop/loop-kits" className="navbar-link">
                    Loop Kits
                </Link>
                {/* <Link to="/free" className="navbar-link">
                    Free Kits
                </Link> */}
            </div>
            <div className="navbar-account-div">
                <FiUser size={30} />
            </div>
        </div>
    );
}

export default Navbar;
