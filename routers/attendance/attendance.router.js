import express from "express";
import {
  takeAttendance,
  createSession,
  studentAttend,
  terminateSession,
} from "./attendance.controller";

const router = express.Router();
router.post("/", takeAttendance);
router.post("/createsession", createSession);
router.post("/terminatesession/:sessionId", terminateSession);
router.post("/attendstudent", studentAttend);
export default router;
