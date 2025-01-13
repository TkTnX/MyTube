import express from "express";
import {
  getVideos,
  createVideo,
  getVideo,
  updateVideo,
  getAuthorVideos,
  getRelatedVideos,
} from "../controllers/videos.controller.js";
const router = express.Router();

router.get("/", getVideos);
router.get("/:id", getVideo);
router.get("/author/:authorId", getAuthorVideos);
router.get("/category/:category", getRelatedVideos);
router.post("/", createVideo);
router.post("/:id", updateVideo);
export default router;
