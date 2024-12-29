import express from "express";
import {
  getVideos,
  createVideo,
  getVideo,
} from "../controllers/videos.controller.js";
const router = express.Router();

router.get("/", getVideos);
router.get("/:id", getVideo);
router.post("/", createVideo);
export default router;
