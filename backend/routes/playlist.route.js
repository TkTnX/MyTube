import express from "express";
import {
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controlls.js";
const router = express.Router();

router.get("/:username", getUserPlaylists);
router.get("/:username/:id", getPlaylistById);
export default router;
