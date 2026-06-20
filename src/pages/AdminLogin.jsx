import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("Sending login request:", formData);
            const response = await fetch("hhttps://hidecrypt-backend.onrender.com//auth/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log("Response received");
            console.log("Status:", response.status);
            console.log("OK:", response.ok);

            const data = await response.json();

            console.log("LOGIN RESPONSE:", data);

            if (response.ok) {

                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("role", data.role);

                setSuccess(true);
                setFormData({
                    email: "",
                    password: ""
                });

                setTimeout(() => {

                    if (data.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/dashboard");
                    }

                }, 1000);

            }

            else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error("FULL ERROR:", err);
            console.error("ERROR NAME:", err.name);
            console.error("ERROR MESSAGE:", err.message);
            console.error("ERROR STACK:", err.stack);

            setError("Connection error. Make sure backend is running!");
        } finally {
            setLoading(false);
        }
    };

    return (

        <section className={styles.login}>


            <div className={styles.section}>

                <div className={styles.head}>
                    <h2>Welcome Back, Admin!</h2>
                    <p>Sign in to access the HideCrypt administration <br /> dashboard and manage system activities.</p>
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
                        ✅ Login successful! Redirecting...
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className={styles.inputBox}>
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
                        <div className={styles.remem}>
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <Link>forgot password?</Link>
                    </div>

                    <div className={styles.loginBtnDiv}>
                        <button
                            type="submit"
                            className={styles.loginBtn}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Log In"}
                        </button>
                    </div>
                </form>

                <div className={styles.createAcc}>
                    <p>Not an administrator?</p>
                    <Link to="/login">Sign in as a user</Link>
                </div>

            </div>

        </section>
    )


}

export default Login;