import { GoogleGenAI } from "@google/genai";
import ChatSession from "../models/ChatSession.js";
import Analysis from "../models/Analysis.js";
import dotenv from "dotenv";

dotenv.config();

// === CRITICAL FIX 1: Object format me apiKey pass karein ===
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
console.log("Chat GoogleGenAI Client Created Successfully");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// === CRITICAL FIX 2: Helper function ko sahi parameters ke sath config kiya ===
const generateWithRetry = async (
  historyData,
  systemInstructionText,
  retries = 3,
) => {
  let delay = 10000;
  for (let i = 0; i < retries; i++) {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: historyData, // Puri formatted chat history yahan aayegi
        config: {
          systemInstruction: systemInstructionText, // System instruction sahi jagah par set kiya
          maxOutputTokens: 1000,
          // Chat box ke liye responseMimeType: "application/json" HATA DIYA hai taaki raw response aaye
        },
      });
      return result;
    } catch (error) {
      if ((error.status === 503 || error.status === 429) && i < retries - 1) {
        console.log(`Retry ${i + 1}... waiting ${delay / 1000} seconds`);
        await sleep(delay);
        delay *= 2; // Exponential delay logic
        continue;
      }
      throw error;
    }
  }
};

export const sendMessage = async (req, res) => {
  console.log("data coming from frontend :", req.body);
  const { message, analysisId, chatHistory } = req.body;

  // Input validations sabse upar
  if (!message) {
    return res.status(400).json({ error: "Message is required!" });
  }
  if (!analysisId) {
    return res.status(400).json({ error: "Analysis ID is required!" });
  }

  try {
    // Analysis context lo
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found!" });
    }

    // History format naye SDK ke mutabik
    const formattedHistory =
      chatHistory?.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })) || [];

    // System instruction (Context) definition
    const systemInstruction = `
  You are an expert, friendly, and practical AI Career Coach.
  The user is targeting the role: ${analysis.roleName}
  Their resume match score is: ${analysis.matchScore}/100
  Their matching skills: ${analysis.matchingSkills ? analysis.matchingSkills.join(", ") : "None"}
  Their missing skills: ${analysis.missingSkills ? analysis.missingSkills.join(", ") : "None"}
  
  CRITICAL RESPONSE FORMATTING RULES (Mandatory):
  1. DO NOT write long, dense paragraphs. Keep the text brief and easy to read.
  2. ALWAYS structure your answer into clear modules or topics using Markdown headings (e.g., ### 🚀 Quick Roadmap).
  3. Use bold text (**keyword**) for important skills, tools, platforms, or critical action points.
  4. Use clean bullet points ( - ) or numbered lists ( 1. ) to lay out steps, strategies, or learning pathways.
  5. Suggest real, specific learning resources (e.g., Coursera, Udemy, YouTube channels, MDN Docs) tailored to their missing skills.
  6. Maintain a friendly, motivating, polite, and highly practical tone throughout.
`;

    // Current message push kiya history me
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    console.log("Sending chat message to Gemini via modern SDK...");

    // === CRITICAL FIX 3: Sahi parameters pass kiye function me ===
    const response = await generateWithRetry(
      formattedHistory,
      systemInstruction,
    );

    // Naye SDK me response nikalne ka sahi tarika
    const reply = response.text;

    if (!reply) {
      return res
        .status(500)
        .json({ error: "AI could not generate a response!" });
    }

    // Chat history MongoDB mein save karo
    await ChatSession.findOneAndUpdate(
      { analysisId },
      {
        $set: {
          userId: req.user?._id || null,
          roleName: analysis.roleName,
        },
        $push: {
          messages: [
            { role: "user", content: message },
            { role: "assistant", content: reply },
          ],
        },
      },
      { upsert: true, new: true },
    );

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    return res.status(500).json({ error: "Chat failed! Please try again." });
  }
};
