import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRole",
      required: true,
    },
    // Scores
    matchScore: Number,
    scoreBreakdown: {
      skillScore: Number,
      educationScore: Number,
      projectScore: Number,
      certificationScore: Number,
    },

    // Skills
    matchingSkills: [String],
    missingSkills: [String],

    // AI Generated Content
    analysisSummary: String,
    resumeImprovements: [String],
    interviewQuestions: [
      {
        question: String,
        topic: String,
        difficulty: String,
      },
    ],
    roadmap: [String],
    careerPath: {
      currentLevel: String,
      shortTermGoal: String,
      longTermGoal: String,
      alternativeRoles: [String],
    },

    motivationalMessage: String,
    timelineToReady: String,
    suggestedCompanies: [String],
    companyEligibility: [
      {
        companyName: String,
        eligible: Boolean,
        matchPercentage: Number,
        reason: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Analysis", analysisSchema);
