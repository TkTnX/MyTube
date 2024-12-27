import express from "express";
import { getVideos, createVideo } from "../controllers/videos.controller.js";
const router = express.Router();

router.get("/", getVideos);
router.post("/", createVideo)
export default router;
