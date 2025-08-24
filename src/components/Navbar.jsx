import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import "../styles/Navbar.css";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("uid") != null
    );

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const res = await fetch("http://localhost:5000/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (data.success) {
                localStorage.removeItem("uid");
                setLoggedIn(false);

                if (location.pathname === "/account") {
                    navigate("/login");
                } else {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

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
                                    onClick={() => handleLogOut()}
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
