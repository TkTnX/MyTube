import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  likeComment,
  dislikeComment,
  answerComment,
} from "../controllers/comments.controller.js";
const router = express.Router();

router.get("/:videoId", getComments);
router.post("/:videoId", addComment);
router.delete("/:commentId", deleteComment);
router.patch("/like/:commentId", likeComment);
router.patch("/dislike/:commentId", dislikeComment);
router.post("/answer/:commentId", answerComment);

export default router;
