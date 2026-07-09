import express from "express";
import {
  getCompanies,
  getCompanyByRole,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);
router.get("/role/:roleId", getCompanyByRole);

export default router;
