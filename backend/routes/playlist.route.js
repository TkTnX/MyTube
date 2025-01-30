import express from "express";
import { getPlaylist } from "../controllers/playlist.controlls.js";
const router = express.Router();

router.get("/:id", getPlaylist);

export default router;
