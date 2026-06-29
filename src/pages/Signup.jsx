import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Signup.module.css';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://hidecrypt-backend.onrender.com/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({ username: "", email: "", password: "" });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Connection error. Make sure backend is running!");
        } finally {
            setLoading(false);
        }
    };

    return (

        <section className={styles.signup}>

            <div className={styles.section}>

                <div className={styles.head}>
                    <h2>HideCrypt starts here</h2>
                    <p>Make your app Hidecrypt easy and secure!</p>
                </div>

                {error && (
                    <div style={{
                        color: "red",
                        marginBottom: "10px",
                        padding: "10px",
                        backgroundColor: "#ffe6e6",
                        borderRadius: "4px"
                    }}>
                        ❌ {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        color: "green",
                        marginBottom: "10px",
                        padding: "10px",
                        backgroundColor: "#e6ffe6",
                        borderRadius: "4px"
                    }}>
                        ✅ Registration successful! Redirecting to login...
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className={styles.inputBox}>
                        <input
                            type="text"
                            name="username"
                            className={styles.userBox}
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className={styles.emailBox}
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className={styles.passwordBox}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            required
                        />
                        <label htmlFor="remember">
                            <Link><span className={styles.agree}>I agree to</span> privacy policy & terms</Link>
                        </label>
                    </div>

                    <div className={styles.loginBtnDiv}>
                        <button
                            type="submit"
                            className={styles.loginBtn}
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className={styles.createAcc}>
                    <p>Already have an account?</p>
                    <Link to="/login">Sign in instead</Link>
                </div>

            </div>

        </section>
    )


}

export default Signup;