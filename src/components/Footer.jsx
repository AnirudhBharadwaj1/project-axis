import { FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";
import logo from "../assets/logo_light.png";

function Footer() {
    return (
        <footer className="footer-div">
            <img src={logo} alt="Logo" className="footer-logo" />
            <p className="footer-copyright">
                © {new Date().getFullYear()} prod.byaxis. All rights reserved.
            </p>
            <div className="footer-socials-div">
                <a
                    href="https://instagram.com/prod.byaxis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-socials"
                >
                    <FaInstagram size={28} />
                </a>
                <a
                    href="https://www.youtube.com/@prod.byaxis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-socials"
                >
                    <FaYoutube size={28} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
