import express from "express";
import { getChannel, subscribe } from "../controllers/channel.controller.js";
const router = express.Router();

router.get("/:username", getChannel)
router.post("/subscribe/:channelId", subscribe);

export default router;
