// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Roles
export const fetchRoles = () => API.get("/roles");

// Analysis
export const analyzeResume = (formData) => API.post("/analyze", formData);

// Chat
export const sendChatMessage = (data) => API.post("/chat", data);

// History
export const getHistory = () => API.get("analyze/history");
