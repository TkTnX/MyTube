import express from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controlls.js";
const router = express.Router();

router.get("/:username", getUserPlaylists);
router.get("/:username/:id", getPlaylistById);
router.post("/", createPlaylist);
router.delete("/:id", deletePlaylist);
router.patch("/:id", editPlaylist)
router.post("/:playlistId/:videoId", addVideoToPlaylist)
export default router;
