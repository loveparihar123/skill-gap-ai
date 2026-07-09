import mongoose from "mongoose";

const jobRoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "💻",
    },

    requiredSkills: {
      type: [String],
      required: true,
      default: [],
    },

    niceToHaveSkills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      trim: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid", "Senior"],
      default: "Fresher",
    },
  },
  { timestamps: true },
);

export default mongoose.model("JobRole", jobRoleSchema);
