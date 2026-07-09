// backend/server.js
import dotenv from "dotenv";
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const OpenAI = require("openai");
const JobRole = require("./models/JobRole");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/skillgapdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multer Setup for File Uploads (in-memory)
const upload = multer({ storage: multer.memoryStorage() });

// --- ROUTES ---

// 1. Seed Database with Genuine Roles (Run once or on startup)
app.post("/api/seed-roles", async (req, res) => {
  // In a real app, this would be a massive dataset scraped or bought.
  // Here are realistic requirements for demonstration.
  const rolesData = [
    {
      title: "Full Stack Developer",
      companies: ["Google", "Microsoft", "Amazon"],
      requiredSkills: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "MongoDB",
        "AWS",
        "Docker",
        "Git",
        "System Design",
      ],
      description:
        "Responsible for developing both client-side and server-side software.",
    },
    {
      title: "Data Scientist",
      companies: ["Meta", "Netflix", "Spotify"],
      requiredSkills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "SQL",
        "Statistics",
        "Data Visualization",
      ],
      description:
        "Analyze and interpret complex digital data to assist business decisions.",
    },
    {
      title: "DevOps Engineer",
      companies: ["IBM", "Oracle", "Salesforce"],
      requiredSkills: [
        "Linux",
        "Docker",
        "Kubernetes",
        "AWS",
        "CI/CD",
        "Terraform",
        "Ansible",
        "Python",
        "Networking",
        "Security",
      ],
      description:
        "Combine software development and IT operations to shorten the development life cycle.",
    },
  ];

  try {
    await JobRole.deleteMany({}); // Clear old
    await JobRole.insertMany(rolesData);
    res.json({ message: "Database seeded with realistic role data!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Roles for Frontend Dropdown
app.get("/api/roles", async (req, res) => {
  try {
    const roles = await JobRole.find({}, "title"); // Only fetch titles
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Analyze Resume (The Core Logic)
app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Please upload a resume" });

  const { roleId } = req.body;
  if (!roleId) return res.status(400).json({ error: "Please select a role" });

  try {
    // 1. Extract Text from PDF
    const dataBuffer = req.file.buffer;
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // 2. Fetch Job Requirements from DB
    const jobDetails = await JobRole.findById(roleId);
    if (!jobDetails) return res.status(404).json({ error: "Role not found" });

    // 3. AI Prompt Engineering
    // We ask AI to strictly return JSON so we can parse it easily
    const systemPrompt = `
            You are a career coach and technical recruiter.
            Analyze the provided resume text against the Job Role Requirements.
            
            Job Role: ${jobDetails.title}
            Target Companies: ${jobDetails.companies.join(", ")}
            Required Skills: ${jobDetails.requiredSkills.join(", ")}
            
            Resume Text: 
            """
            ${resumeText}
            """
            
            Perform the following tasks:
            1. Calculate a "Match Score" (0-100) based on how well the resume fits the required skills.
            2. List "Matching Skills" (skills the user has that match requirements).
            3. List "Missing Skills" (skills required but not found in resume).
            4. List "Suggested Companies" from the target list that the user is ready for, or suggest they need improvement.
            5. Provide a "Roadmap" (array of 3 steps) to bridge the skill gap.
            
            RESPOND ONLY IN VALID JSON FORMAT LIKE THIS:
            {
                "matchScore": 75,
                "matchingSkills": ["React", "Node.js"],
                "missingSkills": ["AWS", "Docker"],
                "analysisSummary": "Short paragraph summary...",
                "suggestedCompanies": ["Company A", "Company B"],
                "roadmap": ["Learn AWS basics", "Dockerize a simple app", "Study system design"]
            }
        `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4
      messages: [{ role: "system", content: systemPrompt }],
      response_format: { type: "json_object" }, // Ensures JSON output
    });

    const aiResult = JSON.parse(completion.choices[0].message.content);

    // 4. Send result to Frontend
    res.json({
      role: jobDetails.title,
      ...aiResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed. Check server logs." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
