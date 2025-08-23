import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import "../styles/Navbar.css";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("uid") != null
    );

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

            {/* Wrapper contains icon + dropdown */}
            <div
                className="navbar-account-div"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <FiUser size={30} className="navbar-account-icon" />

                {open && (
                    <div className="navbar-account-dropdown" role="menu">
                        {loggedIn ? (
                            <>
                                <Link
                                    to="/account"
                                    className="navbar-account-link"
                                    role="menuitem"
                                >
                                    Manage Account
                                </Link>
                                <button
                                    type="button"
                                    className="navbar-account-link"
                                    onClick={() => {
                                        /* your logout logic */
                                    }}
                                    role="menuitem"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="navbar-account-link"
                                role="menuitem"
                            >
                                Log In
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
