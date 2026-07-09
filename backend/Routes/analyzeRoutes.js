import express from "express";
import multer from "multer";
import { getHistory, analyzeResume } from "../controllers/analyzeController.js";
import { protect } from "../middleware/authMiddleware.js";
import Analysis from "../models/Analysis.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// If user wants delete any single history..
router.delete("/single-history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Analysis.findOneAndDelete(id);
    res.status(200).json({ success: true, message: "SuccessFully Deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Deletion History Failed! " });
  }
});

//if user want Entire history delete..........
router.delete("/clear-all", async (req, res) => {
  try {
    await Analysis.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "successfully All History deleted" });
  } catch (err) {
    res.status(500).json({ success: true, message: "Deletion failed:" });
  }
});
router.post("/", protect, upload.single("resume"), analyzeResume);
router.get("/history", protect, getHistory);

export default router;
