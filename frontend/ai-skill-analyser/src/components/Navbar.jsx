// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";
import logo from "../../../../Images/logo.png";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="" />
        <h1 className={styles.title}>Skill Gap AI</h1>
      </Link>
      <div className={styles.links}>
        {user ? (
          <>
            <Link to="/history" className={styles.link}>
              History
            </Link>
            <span className={styles.username}>👤 {user.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link to="/register" className={styles.registerBtn}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
