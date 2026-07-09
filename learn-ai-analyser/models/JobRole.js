// backend/models/JobRole.js
const mongoose = require("mongoose");

const JobRoleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companies: [String], // List of companies for this role
  requiredSkills: [String], // Skills fetched from genuine data
  description: String,
});

module.exports = mongoose.model("JobRole", JobRoleSchema);
