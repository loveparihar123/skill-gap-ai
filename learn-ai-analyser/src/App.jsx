import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // --- DEFINING ROLES DIRECTLY IN FRONTEND (UI) ---
  // This ensures the user always sees roles immediately.
  const IT_ROLES = [
    { id: 1, title: "Full Stack Developer", icon: "💻" },
    { id: 2, title: "Frontend Developer", icon: "🎨" },
    { id: 3, title: "Backend Developer", icon: "⚙️" },
    { id: 4, title: "DevOps Engineer", icon: "🔧" },
    { id: 5, title: "Data Scientist", icon: "📊" },
    { id: 6, title: "Cyber Security Analyst", icon: "🛡️" },
    { id: 7, title: "Cloud Architect", icon: "☁️" },
    { id: 8, title: "Mobile App Developer", icon: "📱" },
    { id: 9, title: "AI/ML Engineer", icon: "🤖" },
    { id: 10, title: "Software Tester (QA)", icon: "🐞" },
  ];

  // Handle Role Card Click
  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setResult(null); // Clear previous results
  };

  // Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });

  const handleAnalyze = async () => {
    if (!file || !selectedRole) {
      alert("Please select a role AND upload a resume.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    // We send the role TITLE to the backend
    formData.append("roleId", selectedRole.id);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <center className="App">
      <header className="App-header">
        <h1>AI Skill Gap Analyzer</h1>
        <p>Select your dream role and upload your resume.</p>
      </header>

      <div className="container">
        {/* --- STEP 1: ROLE SELECTION CARDS --- */}
        <div className="role-section">
          <h3>Step 1: Select Your Target Role</h3>
          <div className="role-grid">
            {IT_ROLES.map((role) => (
              <div
                key={role.id}
                className={`role-card ${selectedRole?.id === role.id ? "selected" : ""}`}
                onClick={() => handleRoleClick(role)}
              >
                <div className="icon">{role.icon}</div>
                <h4>{role.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* --- STEP 2: UPLOAD RESUME --- */}
        <div className="upload-section">
          <h3>Step 2: Upload Resume (PDF)</h3>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {file ? (
              <p className="file-name">✅ Selected: {file.name}</p>
            ) : (
              <p>Drag & drop your PDF here, or click to browse</p>
            )}
          </div>
        </div>

        {/* --- ANALYZE BUTTON --- */}
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading || !file || !selectedRole}
        >
          {loading ? "Analyzing..." : "Analyze My Skills"}
        </button>

        {/* --- RESULTS SECTION --- */}
        {result && (
          <div className="results-card">
            <h2>Analysis for {result.role}</h2>

            {/* Score Circle */}
            <div className="score-container">
              <div
                className="score-circle"
                style={{ "--score": `${result.matchScore}%` }}
              >
                <span>{result.matchScore}%</span>
              </div>
              <p className="score-label">Match Score</p>
            </div>

            <div className="grid-section">
              <div className="col">
                <h3>✅ Skills You Have</h3>
                <ul>
                  {result.matchingSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <h3>❌ Missing Skills</h3>
                <ul>
                  {result.missingSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="section">
              <h3>🏢 Suggested Companies</h3>
              <div className="tags">
                {result.suggestedCompanies.map((c, idx) => (
                  <span key={idx} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="section">
              <h3>🗺️ Roadmap to Success</h3>
              <div className="roadmap-box">
                <ol>
                  {result.roadmap.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="section summary">
              <h3>💡 AI Career Advice</h3>
              <p>{result.analysisSummary}</p>
            </div>
          </div>
        )}
      </div>
    </center>
  );
}

export default App;
