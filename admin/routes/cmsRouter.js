import express from "express";
import { getHomePage, updateHomePage } from "../controllers/cmsController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/homepage", getHomePage);
router.put("/homepage", adminAuth, updateHomePage);

export default router;
