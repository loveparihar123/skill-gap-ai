import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AnalysisPage.module.css";

function AnalysisPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  console.log(result);

  if (!result) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Heading */}
      <h2 className={styles.heading}>Analysis for {result.role} 🎯</h2>

      {/* Score Circle */}
      <div className={styles.scoreBox}>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreNumber}>{result.matchScore}%</span>
        </div>
        <p className={styles.scoreLabel}>Match Score</p>
      </div>

      {/* Score Breakdown */}
      {result.scoreBreakdown && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 Score Breakdown</h3>
          <div className={styles.breakdownGrid}>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Skills</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${result.scoreBreakdown.skillScore}%`,
                    background: "#7c3aed",
                  }}
                />
              </div>
              <span className={styles.breakdownScore}>
                {result.scoreBreakdown.skillScore}%
              </span>
            </div>

            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Education</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${result.scoreBreakdown.educationScore}%`,
                    background: "#10b981",
                  }}
                />
              </div>
              <span className={styles.breakdownScore}>
                {result.scoreBreakdown.educationScore}%
              </span>
            </div>

            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Projects</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${result.scoreBreakdown.projectScore}%`,
                    background: "#f59e0b",
                  }}
                />
              </div>
              <span className={styles.breakdownScore}>
                {result.scoreBreakdown.projectScore}%
              </span>
            </div>

            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Certifications</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${result.scoreBreakdown.certificationScore}%`,
                    background: "#3b82f6",
                  }}
                />
              </div>
              <span className={styles.breakdownScore}>
                {result.scoreBreakdown.certificationScore}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 style={{ color: "#10b981", marginBottom: "1rem" }}>
            ✅ Skills You Have
          </h3>
          <div className={styles.tagsContainer}>
            {result.matchingSkills.map((s, i) => (
              <span key={i} className={styles.tagGreen}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h3 style={{ color: "#ef4444", marginBottom: "1rem" }}>
            ❌ Missing Skills
          </h3>
          <div className={styles.tagsContainer}>
            {result.missingSkills.map((s, i) => (
              <span key={i} className={styles.tagRed}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Company Eligibility */}
      {result.companyEligibility && result.companyEligibility.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🏢 Company Eligibility</h3>

          <h4 style={{ color: "#10b981", marginBottom: "0.8rem" }}>
            ✅ You Are Eligible For:
          </h4>
          {result.companyEligibility
            .filter((c) => c.eligible)
            .map((c, i) => (
              <div key={i} className={styles.companyEligible}>
                <div>
                  <span className={styles.companyName}>{c.companyName}</span>
                  <p className={styles.companyReason}>{c.reason}</p>
                </div>
                <span className={styles.companyScoreGreen}>
                  {c.matchPercentage}%
                </span>
              </div>
            ))}

          {result.companyEligibility.filter((c) => !c.eligible).length > 0 && (
            <>
              <h4 style={{ color: "#ef4444", margin: "1.2rem 0 0.8rem" }}>
                ❌ Need More Work For:
              </h4>
              {result.companyEligibility
                .filter((c) => !c.eligible)
                .map((c, i) => (
                  <div key={i} className={styles.companyNotEligible}>
                    <div>
                      <span className={styles.companyNameRed}>
                        {c.companyName}
                      </span>
                      <p className={styles.companyReason}>{c.reason}</p>
                    </div>
                    <span className={styles.companyScoreRed}>
                      {c.matchPercentage}%
                    </span>
                  </div>
                ))}
            </>
          )}
        </div>
      )}

      {/* Resume Improvements */}
      {result.resumeImprovements && result.resumeImprovements.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>✍️ Resume Improvements</h3>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {result.resumeImprovements.map((tip, i) => (
              <li key={i} className={styles.roadmapItem}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Roadmap */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>🗺️ Your Roadmap</h3>
        <ol style={{ paddingLeft: "1.2rem" }}>
          {result.roadmap.map((step, i) => (
            <li key={i} className={styles.roadmapItem}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Interview Questions */}
      {result.interviewQuestions && result.interviewQuestions.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎤 Interview Questions</h3>
          {result.interviewQuestions.map((q, i) => (
            <div key={i} className={styles.questionItem}>
              <p className={styles.questionText}>
                Q{i + 1}: {q.question}
              </p>
              <div className={styles.questionMeta}>
                <span className={styles.topicTag}>{q.topic}</span>
                <span
                  className={styles.difficultyTag}
                  style={{
                    background:
                      q.difficulty === "Easy"
                        ? "#064e3b"
                        : q.difficulty === "Medium"
                          ? "#78350f"
                          : "#450a0a",
                    color:
                      q.difficulty === "Easy"
                        ? "#10b981"
                        : q.difficulty === "Medium"
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                >
                  {q.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Career Path */}
      {result.careerPath && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🚀 Career Path</h3>
          <div className={styles.careerItem}>
            <span className={styles.careerLabel}>📍 Where You Are Now:</span>
            <p className={styles.careerText}>
              {result.careerPath.currentLevel}
            </p>
          </div>
          <div className={styles.careerItem}>
            <span className={styles.careerLabel}>🎯 3-6 Months Goal:</span>
            <p className={styles.careerText}>
              {result.careerPath.shortTermGoal}
            </p>
          </div>
          <div className={styles.careerItem}>
            <span className={styles.careerLabel}>🌟 1-2 Years Goal:</span>
            <p className={styles.careerText}>
              {result.careerPath.longTermGoal}
            </p>
          </div>
          {result.careerPath.alternativeRoles?.length > 0 && (
            <div className={styles.careerItem}>
              <span className={styles.careerLabel}>💡 Alternative Roles:</span>
              <div className={styles.tagsContainer}>
                {result.careerPath.alternativeRoles.map((role, i) => (
                  <span key={i} className={styles.tagBlue}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Motivational Message */}
      {result.motivationalMessage && (
        <div className={styles.motivationCard}>
          <h3 className={styles.cardTitle}>💪 Your Personal Message</h3>
          <p className={styles.motivationText}>{result.motivationalMessage}</p>
        </div>
      )}

      {/* Timeline */}
      {result.timelineToReady && (
        <div className={styles.timelineCard}>
          <span>⏰ You can be ready in:</span>
          <strong>{result.timelineToReady}</strong>
        </div>
      )}

      {/* AI Summary */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>💡 AI Career Advice</h3>
        <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
          {result.analysisSummary}
        </p>
      </div>

      {/* Chat Button */}
      <button
        className={styles.chatBtn}
        onClick={() => navigate("/chat", { state: { result } })}
      >
        💬 Chat with AI Career Coach
      </button>
    </div>
  );
}

export default AnalysisPage;
