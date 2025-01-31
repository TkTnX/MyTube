import express from "express";
import {
    createPlaylist,
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controlls.js";
const router = express.Router();

router.get("/:username", getUserPlaylists);
router.get("/:username/:id", getPlaylistById);
router.post("/", createPlaylist)
export default router;
