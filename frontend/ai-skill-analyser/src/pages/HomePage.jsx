import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";
import { useDropzone } from "react-dropzone";
import { fetchRoles, analyzeResume } from "../services/api";
import styles from "./HomePage.module.css";
import logo from "../../../../Images/logo.png";

function HomePage() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles().then((res) => setRoles(res.data));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (files) => setFile(files[0]),
  });

  const handleAnalyze = async () => {
    if (!file || !selectedRole) return alert("Select role and upload resume!");
    const token = localStorage.getItem("token");
    if (!token) {
      alert("required Login user:");
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("roleId", selectedRole._id);
      const res = await analyzeResume(formData);
      navigate("/result", { state: { result: res.data } });
    } catch (err) {
      alert("Analysis failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleName}>
          <h1 className={styles.title}>AI Skill Gap Analyzer </h1>
          <img className={styles.logo} src={logo} alt="" />
        </div>

        <p className={styles.subtitle}>
          Upload your resume and find out exactly what skills you need
        </p>
      </div>

      {/* Role Selection */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Step 1 — Select Your Target Role
        </h3>
        <div className={styles.roleGrid}>
          {roles.map((role) => (
            <RoleCard
              key={role._id}
              role={role}
              isSelected={selectedRole?._id === role._id}
              onClick={setSelectedRole}
            />
          ))}
        </div>
      </div>

      {/* Resume Upload */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Step 2 — Upload Your Resume</h3>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          {file ? (
            <p style={{ color: "#10b981" }}>{file.name}</p>
          ) : (
            <p>Drag & drop PDF here or click to browse</p>
          )}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        className={styles.btn}
        onClick={handleAnalyze}
        disabled={loading || !file || !selectedRole}
      >
        {loading ? "Analyzing... ⏳" : "Analyze My Skills 🚀"}
      </button>
    </div>
  );
}

export default HomePage;
