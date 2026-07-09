import mongoose from "mongoose";
const companyProfileSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRole",
      required: true,
    },
    hiringLevel: {
      type: String,
      enum: ["internship", "Junior", "fresher", "experienced"],
      default: "fresher",
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    preferredSkills: {
      type: [String],
      default: [],
    },
    educationCriteria: {
      allowedDegrees: {
        type: [String],
        default: [],
      },
      minimumCgpa: {
        type: Number,
        default: 0,
      },
    },
    weightage: {
      skills: { type: Number, default: 70 },
      education: { type: Number, default: 15 },
      projects: { type: Number, default: 10 },
      certifications: { type: Number, default: 5 },
    },
  },
  { timestamps: true },
);

console.log(companyProfileSchema.path("hiringLevel").enumValues);

export default mongoose.model("CompanyProfile", companyProfileSchema);
