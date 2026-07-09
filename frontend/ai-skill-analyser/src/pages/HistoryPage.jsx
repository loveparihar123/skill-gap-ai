import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/api";
import styles from "./HistoryPage.module.css";
import axios from "axios";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🎯 1. Pure data ko ek sath delete karne ke liye
  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      "Do you confirm to delete Entire Data?",
    );
    if (!confirmClear) return;

    try {
      const response = await axios.delete("/api/analyze/clear-all");
      if (response.data.success) {
        setHistory([]);
        alert("Entire History deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while clearing history.");
    }
  };

  // 🎯 2. Kisi ek single report ko delete karne ke liye
  const handleDeleteSingle = async (id) => {
    const confirmDelete = window.confirm("Do you want to Delete this report?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/analyze/single-history/${id}`);
      if (response.data.success) {
        setHistory(history.filter((item) => item._id !== id));
        alert("Deleted successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data?.data || []);
      } catch (err) {
        console.error("fetching History get Error", err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  // 🛠️ CHNAGE HERE: Isolated Loading Screen (Main container classes removed from here)
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>
          ⏳ Syncing your analysis records...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 🎯 Header row jisme Title aur Clear All button sath me rahenge */}
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>📜 Your Analysis History</h2>
        {history.length > 0 && (
          <button className={styles.clearAllBtn} onClick={handleClearAll}>
            🗑️ Clear All History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className={styles.empty}>No analyses yet. Go analyze your resume!</p>
      ) : (
        history.map((item) => (
          // 🎯 Unique key ke liye item._id lagaya hai taaki deletion smoothly kaam kare
          <div key={item._id} className={styles.card}>
            {/* 🎯 Single Delete button jo card ke top-right me rahega */}
            <button
              className={styles.deleteSingleBtn}
              onClick={() => handleDeleteSingle(item._id)}
              title="Delete this report"
            >
              ❌
            </button>

            <div className={styles.cardTop}>
              <h3 className={styles.role}>
                {item.roleId?.title || "Target Job Role"}
              </h3>
              <span className={styles.score}>{item.matchScore}%</span>
            </div>

            <p className={styles.date}>
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

            <div className={styles.tags}>
              {item.missingSkills?.slice(0, 3).map((s, j) => (
                <span key={j} className={styles.tag}>
                  {s}
                </span>
              ))}
            </div>

            <button
              className={styles.btn}
              onClick={() =>
                navigate("/historyResult", { state: { result: item } })
              }
            >
              View Details →
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryPage;
