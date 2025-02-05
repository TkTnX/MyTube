import express from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  getPlaylistsByTitle,
} from "../controllers/playlist.controlls.js";
const router = express.Router();

router.get("/:title", getPlaylistsByTitle);
router.get("/user/:username", getUserPlaylists);
router.get("/:username/:id", getPlaylistById);
router.post("/", createPlaylist);
router.delete("/:id", deletePlaylist);
router.patch("/:id", editPlaylist);
router.post("/:playlistId/:videoId", addVideoToPlaylist);
router.patch("/remove/:playlistId/:videoId", removeVideoFromPlaylist);
export default router;
