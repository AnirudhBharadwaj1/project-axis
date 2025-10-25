import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/LoginPage.css";

function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // new state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required.");
            return;
        } else if (!email.includes("@") || !email.includes(".")) {
            setError("Enter valid email.");
            return;
        } else if (!password) {
            setError("Password is required.");
            return;
        } else if (!confirmPassword) {
            setError("Confirm password is required.");
            return;
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const response = await fetch("http://localhost:5000/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        if (data.success === false) {
            setError(data.error);
        } else {
            // localStorage.setItem("uid", data.id);
            navigate("/login"); // redirect to homepage after signup
        }
    };

    return (
        <div className="page scrollbar">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSignup}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            // type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                // required
                            />
                            <span
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Sign up button */}
                    <button type="submit" className="login-btn">
                        Sign Up
                    </button>

                    {/* Log in link */}
                    <p className="signup-text">
                        Already have an account? <a href="/login">Log In</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
