import JobRole from "../models/JobRole.js";
import Analysis from "../models/Analysis.js";
import CompanyProfile from "../models/CompanyProfile.js";
import { GoogleGenAI } from "@google/genai";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (prompt, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });
      return result;
    } catch (error) {
      if ((error.status === 503 || error.status === 429) && i < retries - 1) {
        console.log(`Retry ${i + 1}... waiting 10 seconds`);
        await sleep(10000);
        continue;
      }
      throw error;
    }
  }
};

export const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a resume!" });
  }

  const { roleId } = req.body;
  if (!roleId) {
    return res.status(400).json({ error: "Please select a role!" });
  }

  try {
    // 1.extract text from PDF.....
    const uint8Array = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    let resumeText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      resumeText += textContent.items.map((item) => item.str).join(" ") + "\n";
    }

    // 2. get job details.............
    const jobDetails = await JobRole.findById(roleId);
    if (!jobDetails) {
      return res.status(404).json({ error: "Role not found!" });
    }

    // 3. fetch all companies of this role from the databases.............
    const companiesInDB = await CompanyProfile.find({ roleId: roleId });

    // please make a list of companies giving for AI........
    const companyList = companiesInDB.map((c) => ({
      name: c.companyName,
      hiringLevel: c.hiringLevel,
      requiredSkills: c.requiredSkills,
      minimumCgpa: c.educationCriteria?.minimumCgpa || 0,
    }));

    // 4. AI Prompt
    const prompt = `
You are an expert AI Career Coach, ATS System and Technical Recruiter
with 10+ years of experience at top tech companies.

=== CANDIDATE TARGET ROLE ===
Role: ${jobDetails.title}
Required Skills for this role: ${jobDetails.requiredSkills.join(", ")}

=== CANDIDATE RESUME ===
"""${resumeText}"""

=== COMPANIES IN OUR DATABASE FOR THIS ROLE ===
${JSON.stringify(companyList, null, 2)}

=== YOUR TASKS ===
1. Deep analysis of resume against role requirements
2. Calculate match score
3. Compare candidate profile with EACH company listed above
4. Suggest which companies candidate is eligible for
5. Personalized roadmap with real resources
6. Interview preparation tips
7. Resume improvement suggestions
8. Career path guidance
9. Motivational message

IMPORTANT RULES FOR COMPANY SUGGESTIONS:
- ONLY suggest companies from the list provided above
- Do NOT suggest companies that are not in the list
- If candidate is not eligible for any company, say so honestly
- Base eligibility on: skills match, CGPA, hiring level

RESPOND ONLY IN THIS EXACT JSON FORMAT:
{
  "matchScore": 75,
  "scoreBreakdown": {
    "skillScore": 80,
    "educationScore": 70,
    "projectScore": 65,
    "certificationScore": 50
  },
  "matchingSkills": ["React", "Node.js"],
  "missingSkills": ["AWS", "Docker"],
  "analysisSummary": "3-4 sentences about candidate profile...",
  "companyEligibility": [
    {
      "companyName": "TCS",
      "eligible": true,
      "matchPercentage": 85,
      "reason": "Skills match well, CGPA requirement met"
    },
    {
      "companyName": "Google",
      "eligible": false,
      "matchPercentage": 40,
      "reason": "Missing System Design and DSA skills"
    }
  ],
  "resumeImprovements": [
    "Add numbers to achievements",
    "Add GitHub links to projects"
  ],
  "interviewQuestions": [
    {
      "question": "Explain event loop in Node.js",
      "topic": "Technical",
      "difficulty": "Medium"
    }
  ],
  "roadmap": [
    "Week 1-2: Learn AWS basics - FreeCodeCamp YouTube",
    "Week 3-4: Docker - TechWorld with Nana YouTube",
    "Month 2: Build and deploy full project on AWS"
  ],
  "careerPath": {
    "currentLevel": "Junior developer with good frontend skills",
    "shortTermGoal": "Get hired in 3-4 months after learning AWS",
    "longTermGoal": "Senior developer in 2 years",
    "alternativeRoles": ["Frontend Developer", "React Developer"]
  },
  "motivationalMessage": "Encouraging personal message...",
  "timelineToReady": "3-4 months"
}
    `;

    // 5.Call the AI.............................
    const result = await generateWithRetry(prompt);

    const responseText = result.text;

    // 6. Parse the JSON
    let aiResult;
    try {
      aiResult = JSON.parse(responseText);
    } catch (e) {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ error: "AI response invalid!" });
      }
      aiResult = JSON.parse(jsonMatch[0]);
    }

    // 7. Data Saved in Mongo Atlas
    const savedAnalysis = await Analysis.create({
      userId: req.user?._id || null,
      roleId: jobDetails._id,
      roleName: jobDetails.title,
      missingSkills: aiResult.missingSkills,
      analysisSummary: aiResult.analysisSummary,
      companyEligibility: aiResult.companyEligibility,
      resumeImprovements: aiResult.resumeImprovements,
      matchScore: aiResult.matchScore,
      scoreBreakdown: aiResult.scoreBreakdown,
      matchingSkills: aiResult.matchingSkills,
      interviewQuestions: aiResult.interviewQuestions,
      roadmap: aiResult.roadmap,
      careerPath: aiResult.careerPath,
      motivationalMessage: aiResult.motivationalMessage,
      timelineToReady: aiResult.timelineToReady,
      resumeFileName: req.file.originalname,
    });

    // 8. send to the frontend...............
    res.json({
      analysisId: savedAnalysis._id,
      role: jobDetails.title,
      ...aiResult,
    });
  } catch (error) {
    console.error(error);
    if (error.status === 429) {
      return res.status(429).json({
        error: "AI quota khatam ho gayi! Thodi der baad try karo.",
      });
    }
    res.status(500).json({ error: "Analysis failed!" });
  }
};

//  Backend: controller where the history is fetched.....
export const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user._id })
      .populate("roleId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
