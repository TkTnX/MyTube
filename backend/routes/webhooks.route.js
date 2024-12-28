import express from "express";
import { clerkWebhook } from "../controllers/webhooks.controller.js";
import bodyParser from "body-parser";
const router = express.Router();

router.post("/clerk", bodyParser.json(), clerkWebhook);
export default router;
