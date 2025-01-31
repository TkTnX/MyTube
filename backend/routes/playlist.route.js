import express from "express";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controlls.js";
const router = express.Router();

router.get("/:username", getUserPlaylists);
router.get("/:username/:id", getPlaylistById);
router.post("/", createPlaylist);
router.delete("/:id", deletePlaylist);
export default router;
