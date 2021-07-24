import express from "express";
import {
  takeAttendance,
  createSession,
  studentAttend,
  terminateSession,
  studentUnattend,
} from "./attendance.controller";

const router = express.Router();
router.post("/", takeAttendance);
router.post("/createsession", createSession);
router.post("/attendstudent", studentAttend);
router.post("/terminatesession/:sessionId", terminateSession);
export default router;
