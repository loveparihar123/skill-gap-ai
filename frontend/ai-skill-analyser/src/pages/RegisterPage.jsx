import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../Services/api";
import { useAuth } from "../context/AuthContext";
import styles from "./RegisterPage.module.css";
import { UserPlus } from "lucide-react";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account 🚀</h2>
        <p className={styles.subtitle}>Start your skill journey</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            <UserPlus size={20} />
            Register
          </button>
        </form>
        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.switchLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
