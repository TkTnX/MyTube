import express from "express";
import {
  getChannel,
  getChannels,
  subscribe,
} from "../controllers/channel.controller.js";
const router = express.Router();

router.get("/search/:username", getChannels);
router.get("/:username", getChannel);
router.post("/subscribe/:channelId", subscribe);

export default router;
