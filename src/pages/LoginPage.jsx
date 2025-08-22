import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/LoginPage.css";

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh

        if (!email) {
            setError("Email is required.");
            return;
        } else if (!password) {
            setError("Password is required.");
            return;
        }
        setError("");

        try {
            const response = await fetch("/verifyUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("uid", data.id);
                navigate("/");
            } else {
                setError(data.message || "Invalid email or password.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="page scrollbar">
            <Navbar />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    {/* Error message */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Login button */}
                    <button type="submit" className="login-btn">
                        Log In
                    </button>

                    {/* Sign up link */}
                    <p className="signup-text">
                        Don’t have an account? <a href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;
