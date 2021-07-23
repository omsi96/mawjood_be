import express from "express";
import {
  takeAttendance,
  createSession,
  studentAttend,
} from "./attendance.controller";

const router = express.Router();
router.post("/", takeAttendance);
router.post("/createsession", createSession);
router.post("/attendstudent", studentAttend);
export default router;
