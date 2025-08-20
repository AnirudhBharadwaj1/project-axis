import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import "../styles/Navbar.css";

function Navbar() {
    // TODO: Replace this with actual auth
    const [loggedIn, setLoggedIn] = useState(false);

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
                <Link to="/shop/free-kits" className="navbar-link">
                    Free Kits
                </Link>
            </div>
            <div className="navbar-account-div">
                <FiUser size={30} />

                <div className="navbar-account-dropdown">
                    {loggedIn ? (
                        <>
                            <a
                                href="/manage-account"
                                className="navbar-account-link"
                            >
                                Manage Account
                            </a>
                            <button className="navbar-account-link">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <a href="/login" className="navbar-account-link">
                            Log In
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
