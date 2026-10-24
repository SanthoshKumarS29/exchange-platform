import express from "express";
import { approvedUser, getUsers, loginAdmin, rejectuser } from "../controller/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/users", adminAuth, getUsers);
router.put("/users/:id/approve", adminAuth, approvedUser);
router.put("/users/:id/reject", adminAuth, rejectuser)

export default router;