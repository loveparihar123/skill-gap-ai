import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./resultHistoryPage.module.css";

const ResultHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.result;
  const [openQuestion, setOpenQuestion] = useState(null);

  if (!data) {
    return (
      <div className={styles.errorContainer}>
        <h2>No Report Selected!</h2>
        <p>please select any report from history Page.</p>
        <button className={styles.backBtn} onClick={() => navigate("/history")}>
          Go to History
        </button>
      </div>
    );
  }

  return (
    <div className={styles.resultPageWrapper}>
      {/* Top Action Bar */}
      <div className={styles.topActionBar}>
        <button className={styles.backArrowBtn} onClick={() => navigate(-1)}>
          ← Back to History
        </button>
        <span className={styles.fileTag}>📊 Detailed AI Report</span>
      </div>

      {/* Main Header */}
      <header className={styles.resultHeader}>
        <h1>AI Analysis Summary</h1>
        <p className={styles.summaryText}>
          {data.analysisSummary ||
            "Profile report successfully processed by AI."}
        </p>
      </header>

      {/* DEEP DIVE AI SECTIONS */}
      <div className={styles.insightsGrid}>
        {/* SECTION 1: Score Breakdown Object */}
        {data.scoreBreakdown && (
          <div className={styles.insightCard}>
            <div className={styles.cardIcon}>
              <i className="fas fa-chart-pie"></i>
            </div>
            <h3>Score Breakdown</h3>
            <div className={styles.scoreList}>
              <p>
                🎯 <strong>Skills Score:</strong>{" "}
                {data.scoreBreakdown.skillScore || 0}
              </p>
              <p>
                🎓 <strong>Education Score:</strong>{" "}
                {data.scoreBreakdown.educationScore || 0}
              </p>
              <p>
                💻 <strong>Project Score:</strong>{" "}
                {data.scoreBreakdown.projectScore || 0}
              </p>
              <p>
                📜 <strong>Certification Score:</strong>{" "}
                {data.scoreBreakdown.certificationScore || 0}
              </p>
            </div>
          </div>
        )}

        {/* SECTION 2: Career Path Object */}
        {data.careerPath && (
          <div className={styles.insightCard}>
            <div className={styles.cardIcon}>
              <i className="fas fa-map-signs"></i>
            </div>
            <h3>Career Path Insights</h3>
            <div className={styles.careerDetails}>
              <p>
                🚀 <strong>Current Level:</strong>{" "}
                {data.careerPath.currentLevel || "N/A"}
              </p>
              <p>
                🎯 <strong>Short Term Goal:</strong>{" "}
                {data.careerPath.shortTermGoal || "N/A"}
              </p>
              <p>
                🔮 <strong>Long Term Goal:</strong>{" "}
                {data.careerPath.longTermGoal || "N/A"}
              </p>
              {data.careerPath.alternativeRoles?.length > 0 && (
                <div>
                  <strong>Alternative Roles:</strong>
                  <div className={styles.miniBadges}>
                    {data.careerPath.alternativeRoles.map((role, i) => (
                      <span key={i} className={styles.altRoleTag}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 3: Resume Improvements Array */}
        <div className={styles.insightCard}>
          <div className={styles.cardIcon}>
            <i className="fas fa-tools"></i>
          </div>
          <h3>Resume Improvements</h3>
          <ul className={styles.styledList}>
            {data.resumeImprovements?.length > 0 ? (
              data.resumeImprovements.map((tip, i) => <li key={i}>{tip}</li>)
            ) : (
              <p className={styles.cleanStatus}>
                ✨ Your resume looks great! No improvements suggested.
              </p>
            )}
          </ul>
        </div>

        {/* SECTION 4: Target Company Eligibility Array */}
        <div className={styles.insightCard}>
          <div className={styles.cardIcon}>
            <i className="fas fa-building"></i>
          </div>
          <h3>Company Eligibility & Scope</h3>
          <div className={styles.companyTimelineBox}>
            ⏱️ <strong>Timeline to Ready:</strong>{" "}
            {data.timelineToReady || "Immediate"}
          </div>
          <div className={styles.eligibilityScrollBox}>
            {data.companyEligibility?.length > 0 ? (
              data.companyEligibility.map((company, i) => (
                <div key={company._id || i} className={styles.companyItem}>
                  <div className={styles.companyHeaderRow}>
                    <strong>{company.companyName}</strong>
                    <span
                      className={
                        company.eligible
                          ? styles.eligibleTag
                          : styles.notEligibleTag
                      }
                    >
                      {company.eligible ? "✅ Eligible" : "❌ Gap Present"}
                    </span>
                  </div>
                  <p className={styles.companyReason}>
                    Match: {company.matchPercentage}% | {company.reason}
                  </p>
                </div>
              ))
            ) : (
              <p className={styles.noDataText}>
                No specific company eligibility criteria mapped.
              </p>
            )}
          </div>
        </div>

        {/* SECTION 5: Skills Gap Analyzer (Arrays) */}
        <div className={`${styles.insightCard} ${styles.fullWidthCard}`}>
          <div className={styles.cardIcon}>
            <i className="fas fa-exchange-alt"></i>
          </div>
          <h3>Skills Gap Analyzer</h3>
          <div className={styles.skillsSplit}>
            <div className={styles.skillsBox}>
              <h4>Missing Skills (Learn These)</h4>
              <div className={styles.badgesCloud}>
                {data.missingSkills?.length > 0 ? (
                  data.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className={`${styles.badgeItem} ${styles.missing}`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className={styles.cleanStatus}>
                    Perfect! No missing skills.
                  </p>
                )}
              </div>
            </div>
            <div className={styles.skillsBox}>
              <h4>Matching Skills (You Have)</h4>
              <div className={styles.badgesCloud}>
                {data.matchingSkills?.length > 0 ? (
                  data.matchingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className={`${styles.badgeItem} ${styles.matching}`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className={styles.noDataText}>None detected</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Roadmap Array */}
      <section className={`${styles.insightCard} ${styles.fullWidthCard}`}>
        <h3>
          <i className="fas fa-route"></i> Actionable Roadmap
        </h3>
        <div className={styles.roadmapTimeline}>
          {data.roadmap?.length > 0 ? (
            data.roadmap.map((step, index) => (
              <div className={styles.roadmapStep} key={index}>
                <div className={styles.stepMarker}>{index + 1}</div>
                <div className={styles.stepDetails}>
                  <h4>Phase/Task {index + 1}</h4>
                  <p>{step}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noDataText}>
              No explicit roadmap steps generated.
            </p>
          )}
        </div>
      </section>

      {/* SECTION 7: Interview Questions Upgraded Accordion Layout */}
      <section className={`${styles.insightCard} ${styles.fullWidthCard}`}>
        <h3>
          <i className="fas fa-user-tie"></i> AI Interview Preparation Simulator
        </h3>
        <div className={styles.qaAccordionList}>
          {data.interviewQuestions?.length > 0 ? (
            data.interviewQuestions.map((item, i) => {
              const isOpen = openQuestion === i;
              return (
                <div
                  key={item._id || i}
                  className={`${styles.qaItem} ${isOpen ? styles.active : ""}`}
                >
                  {/* Accordion Header Trigger */}
                  <div
                    className={styles.qaHeader}
                    onClick={() => setOpenQuestion(isOpen ? null : i)}
                  >
                    <h4>
                      Q{i + 1}: {item.question}
                      <span className={styles.metaBadge}>
                        {item.topic} • {item.difficulty}
                      </span>
                    </h4>
                    <span className={styles.toggleIndicator}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  {/* Accordion Body Container (Always in DOM for slide effect) */}
                  <div className={styles.qaBody}>
                    {/* 🎯 New Inner Wrapper to calculation dynamic layout height */}
                    <div className={styles.qaBodyInner}>
                      <p>
                        <strong>Topic Focus:</strong> {item.topic} (
                        {item.difficulty})
                      </p>
                      <p
                        style={{
                          marginTop: "10px",
                          color: "var(--text-primary)",
                        }}
                      >
                        Best approach to answer this will depend on your core
                        concepts mentioned in matching skills.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.noDataText}>
              No mock questions available for this profile.
            </p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      {data.motivationalMessage && (
        <footer className={styles.motivationalFooter}>
          <div className={styles.quoteIcon}>“</div>
          <p>{data.motivationalMessage}</p>
        </footer>
      )}
    </div>
  );
};

export default ResultHistoryPage;
