import {
  getTrackFromStudentEmail,
  getAvailableTracks,
} from "./discord.controller";

import express from "express";
const router = express.Router();
router.post("/role", getTrackFromStudentEmail);
router.get("/tracks", getAvailableTracks);
export default router;
