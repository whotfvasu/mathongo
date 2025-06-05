import express from "express";
import {
  uploadChapter,
  getChapters,
  getChapterById,
} from "../controllers/chapterController.js";
import { adminCheckMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",adminCheckMiddleware, uploadChapter);
router.get("/", getChapters);
router.get("/:id", getChapterById);

export default router;
