import express from "express";
import { subscribe } from "../controllers/channel.controller.js";
const router = express.Router();

router.post("/subscribe/:channelId", subscribe);

export default router;
