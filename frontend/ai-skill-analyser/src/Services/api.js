// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Har request mein token attach karo automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
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
