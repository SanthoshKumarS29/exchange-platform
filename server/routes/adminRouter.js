import express from "express";
import { loginAdmin } from "../controller/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin)

export default router;