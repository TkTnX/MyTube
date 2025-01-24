import express from "express";
import { addComment, getComments } from "../controllers/comments.controller.js";
const router = express.Router();

router.get("/:videoId", getComments);
router.post("/:videoId", addComment)
export default router;
