import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comments.controller.js";
const router = express.Router();

router.get("/:videoId", getComments);
router.post("/:videoId", addComment);
router.delete("/:commentId", deleteComment);
export default router;
