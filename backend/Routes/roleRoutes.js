import express from "express";
import { getRoles, seedRoles } from "../controllers/roleController.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/seed", seedRoles);

export default router;
