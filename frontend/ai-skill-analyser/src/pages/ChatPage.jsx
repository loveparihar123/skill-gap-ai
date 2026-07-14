import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendChatMessage } from "src/services/api.js";
import ReactMarkdown from "react-markdown";
import styles from "./ChatPage.module.css";

function ChatPage() {
  const { state } = useLocation();
  const result = state?.result;

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm your AI Career Coach 🤖 I can see you're targeting the ${result?.role || "Selected"} role with a ${result?.matchScore || 0}% match score. Ask me anything about improving your skills!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Yahan console me check kariye ki 'analysisId' aa raha hai ya '_id' ya 'id'
    console.log("Result Object Checklist: ", result);

    // Fallback taaki agar analysisId na mile toh unique ID ya result._id utha sake
    const targetAnalysisId = result?.analysisId || result?._id || result?.id;
    console.log("Extracted Analysis ID: ", targetAnalysisId);

    if (!targetAnalysisId) {
      console.error(
        "Error: Analysis ID missing hai! Backend ko request nahi jayegi.",
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Session Context missing. Please re-upload resume.",
        },
      ]);
      return;
    }

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Sahi aur clean data object backend ko bheja
      const res = await sendChatMessage({
        message: input,
        chatHistory: messages,
        analysisId: targetAnalysisId, // 100% Valid ID pass ho rahi hai ab
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      console.error("Frontend Chat Call Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>💬 AI Career Coach</h2>
      <div className={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={styles.message} // 👈 FIX: className me sirf string variable rakha
            style={{
              // 👈 FIX: Dynamic styles ko 'style' tag me daala
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#7c3aed" : "#1a1a2e",
            }}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className={styles.message} style={{ background: "#1a1a2e" }}>
            Thinking... ⏳
          </div>
        )}
      </div>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about your career..."
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send ➤"}
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
