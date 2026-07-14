import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "src/Services/api.js";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back 👋</h2>
        <p className={styles.subtitle}>Login to continue</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className={styles.btn} type="submit">
            Login
          </button>
        </form>
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.switchLink}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
