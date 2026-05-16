import express from "express";
import multer from "multer";
import { authUser } from "../middleware/auth.middleware.js";
import {
    uploadResume,
    getMyReports,
    getReportById,
    deleteReport
} from "../controller/interviewController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/analyze", authUser, upload.single("resume"), uploadResume);
router.get("/my-reports", authUser, getMyReports);
router.get("/:id", authUser, getReportById);
router.delete("/:id", authUser, deleteReport);

export default router;