import express from "express";
import { takeAttendance } from "./attendance.controller";

const router = express.Router();
router.post("/", takeAttendance);

export default router;
